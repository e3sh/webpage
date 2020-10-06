//===================================================================================================
// Main
//
//
//===================================================================================================
function mon_sw() {

    var isMSIE = /*@cc_on!@*/false;

    var map = [];
    var opennum = [];
    var workmap = [];

    //Player Status
    var player;

    var gameoverflag = false;
    var gstartflag = false;

    var start_time;
    var timerid;

	createDisplay();

    initialize();

    //=======↑↑↑↑↑ここまでが開始時に処理される部分↑↑↑↑↑======================================
    function initialize() {

        cid = -1;
        gameoverflag = false;

        var el = document.getElementById("time_1");
        el.innerHTML = "Wait a minute.";

        console_write("Wait a minute.");

        player = new statusClass();

        for (var i = 0; i <= mapsize; i++) {
            map[i] = new panelClass();
        }

        map_create();

		player.init();

        document.getElementById("status_1").innerHTML = "";

        var el = document.getElementById("time_1");
        el.innerHTML = "Click Start."
        console_write("Click Start.");

        gstartflag = false;
    }

    function game_start() {

        start_time = new Date().getTime();

        timerid = setInterval(count_sub, 150);

        count_sub();

    }
    //=======ここから、サブルーチン群======================================
    function openpanel(num) {
        //console_write(".");

        if (map[num].open) {//蓋開いてる
            if (map[num].bomb) {//敵である（==倒されている）
                if (!map[num].check) {//チェックしていない(

                    map[num].check = true;
                    console_write("_check...find:" + items[map[num].item][ITEM_NAME]);

                } else {
                    map[num].check = false;
                    map[num].bomb = false;
                    player.getitem(map[num].item);
                    map[num].level = 0;
                    map_checknum();
                    map[num].open = false;
                    openpanel(num);
                    //map[num].check = true;
				}
            }

            if (map[num].stair) {//扉選択

                if (player.key) {

					if (player.flag){//amuletを取ってフロア脱出した場合、クリア
			            gameoverflag = true;
			            //alert("Congraturations!!");
						var st = "";

			            st += "Congraturations!!<br>GameClear!<hr>";
			            //st += "おめでとうございます。<br><br>";

						var stop_time = new Date().getTime();
						var gametime = Math.floor( (stop_time - start_time) / 1000);

			            st += "Time:" + gametime + " * -1<br>";
			            st += "Floor:" + player.floor + " * 100<br>";
			            st += "Gold:" + player.gold + " * 1<br>";
			            st += "HP:" + player.hp + " * 10<br>";

						st += "<br><hr>";

						var resultscore = (-1 * gametime) + (player.floor * 100) + player.gold + (player.hp * 10);

			            st += "SCORE:" + resultscore + "<br>";

			            console_write(st);

						return;
					}

                    map_create();
                    player.bgcnt = 5;
                    player.change = true;
                    player.floor++;
                    player.key = false;
                    console_write("_NextFloor.<br>_EnagyDrain lv.->hp(+" + player.level + ")");

                    player.hp += player.level;
                    player.level = 1;
                    player.exp = 0;
                } else {
                    console_write("_not Key.");
                }
            }
            map[num].update = true;
            return;
        }

        if (map[num].check) return;

        if (map[num].bomb) {

			var mons = new enemyStateClass();

			mons.hp = monstor[map[num].level][MONSTOR_HP];
			mons.str = map[num].level;
			mons.def = 0;
			mons.name = monstor[map[num].level][MONSTOR_TYPE];
			mons.exp = monstor[map[num].level][MONSTOR_EXP];

            if (battleRoutine(player, mons)) {

                map[num].drawcount = 5;
                map[num].drawSw = (player.level < map[num].level) ? true : false;

                count_sub();

                player.bgcnt = 5;
                player.damage = (map[num].drawSw) ? true : false;

                map[num].update = true;

            } else {
                player.hp = 0;

                count_sub(true);

                for (var i = 0; i <= mapsize; i++) {
                    if (map[i].bomb) {
                        var el = document.getElementById(i);
						cssSprite_set(el, monstor[map[i].level][MONSTOR_GRAPH]);
                    };
                };
                gameoverflag = true;

                player.bgcnt = 5;
                player.damage = true;

                return;
            }

        }

        if (!map[num].bomb) {

            opennum = [];
            workmap = [];

            op_re_sub(num);

            for (var i in opennum) {
                map[opennum[i]].open = true;
                map[opennum[i]].drawcount = 5;

                map[opennum[i]].update = true;
            }
        }

        map[num].open = true;
        if (!gstartflag) {
            gstartflag = true;
            game_start();
        }
    }

    function op_re_sub(num) {

        if (workmap[num] == "*") return;
        workmap[num] = "*";
        opennum.push(num);

        if (map[num].data != 0) return;
        if (map[num].block) return;

        for (var wx = -1; wx <= 1; wx++) {
            for (var wy = -1; wy <= 1; wy++) {

                if ((wx == 0) && (wy == 0)) continue;

                var adnum = Number(num) + (wy * map_size_x) + wx - 0;

                if ((adnum < 0) || (adnum > mapsize)) continue;

                if ((num % map_size_x + wx < 0) || (num % map_size_x + wx >= map_size_x)) continue;

                if (workmap[adnum] == "*") continue;

                op_re_sub(adnum)
            }
        }
    }

    function checkpanel(num) {

        if (!map[num].check) {
            map[num].check = true;
        } else {
            map[num].check = false;
        }
        map[num].update = true;

    }
    // ==============event process ========================
    document.oncontextmenu = function () {
        //右ボタン押下によるコンテキストメニュー表示の抑止
        return false;
    }

    document.onmousedown = function (event) {

        if (isMSIE) {
            event = window.event;
        }

        if (gameoverflag) {
            if ((event.button == 1 - (!isMSIE) ? 1 : 0) && (cid != -1)) {
                initialize();
            }
            return;
        }

        if (event.button == 1 - (!isMSIE) ? 1 : 0) {
			var el = document.getElementById("console_1");
			el.style.visibility = "hidden";
            //左クリックの場合
            if (cid != -1) {
            //    var el = document.getElementById("console_1");
            //    el.style.visibility = "hidden";

                openpanel(cid);
                status_disp();
            }

        } else {
            //左クリックではない場合
            if (cid != -1) {
                checkpanel(cid);
            }
        }
    }

    document.onmouseup = function (event) {
        trigon = false;
    }
    // ==============display subroutine ========================
    function count_sub(q) {

        var stop_time = new Date().getTime();
        var gametime = stop_time - start_time;

        if (!gameoverflag || gstartflag) timeDisplay(gametime, q);

        var effectf = false;
        for (var i in map) {
            if (map[i].drawcount != 0) {

                effectf = true;

                map[i].drawcount--;
                map[i].update = true;
            }
        }

        mapDisplay(map);

        statusDisplay(player);

        //statuswindow color animation
        if (player.bgcnt != 0) {

            effectf = true;
            player.bgcnt--;

            statusDisplay(player);
        }

        if (gameoverflag) {
            if (!effectf) clearInterval(timerid);
        }

    }

    function status_disp() {

        statusDisplay(player, true);
        //countDisplay(map);
        itemsDisplay(player);

        return;
    }

    // ==============mapcreate ========================
    function map_create() {

        var st = dng.create();
        var mp = dng.mapdata;

        for (var i = 0; i <= mapsize; i++) {
			map[i].reset();

            if (!mp[(i % (map_size_x)) ][Math.floor(i / (map_size_x))]) {
                map[i].block = true;
                map[i].open = true;
            } else {
            　//  map[i].open = false;
            }

        }
        var wst = "";
        //=== map setup ===
        //block pass
        var emap = [];

        var c = 0;
        for (var i = 0; i <= mapsize; i++) {
            if (!map[i].block) {
                emap[c] = i;
                c++;
            }
        }
        var emapmax = c;

        //setup
        var cnt = 1;

        var itemlist = [];

        for (var i = 0; i <= 7; i++) {
            for (var j = 1; j <= items[i][ITEM_NUMBER]; j++) {
                itemlist[cnt] = i;
                cnt++; 
            }
        }
        //itemlist shufful
        for (var i = 1; i < cnt; i++) {
            var num = Math.floor(Math.random() * (cnt-1)) + 1;
            var w = itemlist[num];
            itemlist[num] = itemlist[i];
            itemlist[i] = w;
        }

        //alert("i" + cnt);

        cnt = 0;
        map[emap[cnt]].stair = true;
        cnt++;

		if (true){
                    map[emap[cnt]].bomb = true;
                    map[emap[cnt]].level = 6; //wizard
                    map[emap[cnt]].item = 8;//amulet
				cnt++;
		}

        for (var i = 1; i <= 5; i++) {
            for (var j = 1; j <= monstor[i][MONSTOR_NUMBER]; j++) {

                if (cnt < emapmax) {
                    map[emap[cnt]].bomb = true;
                    map[emap[cnt]].level = i;
                    map[emap[cnt]].item = itemlist[cnt-1];//<=itemlistbufferoverflow対応2011/09/22

                    //if (!Boolean(itemlist[cnt-1])) alert(cnt + "w");

                    cnt++;
                }
            }
        } 

        //shufful
        for (var i = 0; i < emapmax; i++) {
            var num = Math.floor(Math.random() * (emapmax - 1));
            var w = map[emap[num]];
            map[emap[num]] = map[emap[i]];
            map[emap[i]] = w;
        }

        map_checknum();

        mapDisplay(map);
    }


    function map_checknum() {

        //mapcheck
        for (var i = 0; i <= mapsize; i++) {
            var cnt = 0;
            //map[i].data = 0;
            for (var wx = -1; wx <= 1; wx++) {
                for (var wy = -1; wy <= 1; wy++) {

                    var adnum = i + (wy * map_size_x) + wx;

                    if ((adnum < 0) || (adnum > mapsize)) continue;
                    if ((i % map_size_x + wx < 0) || (i % map_size_x + wx >= map_size_x)) continue;
                    if ((wx == 0) && (wy == 0)) continue;

                    if (map[adnum].bomb) cnt += map[adnum].level; // cnt++;
                }
            }

            if (map[i].data != cnt) {
                map[i].data = cnt;
                map[i].update = true;
            }

            if (cnt != 0) {
                map[i].data = cnt;
            }
            //map[i].update = true;
        }
    }
}
