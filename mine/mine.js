function minesw() {

    var isMSIE = /*@cc_on!@*/false;

    var boms = 25;
    var map_size_x = 16;
    var map_size_y = 16;
    var mapsize = map_size_x * map_size_y - 1

    var map = [];
    var opennum = [];
    var workmap = [];

    var colname = ["black", "blue", "red", "magenta", "green", "deepskyblue", "gold", "white"];

    var openpanels_map = [];

    var checkmap = [];

    var b_mode = 0;
    var bombcnt = 0;

    var cid = -1;
    var gameoverflag = false;
    var gstartflag = false;

    var start_time;
    var pnlcol = [];

    var timerid;

//    var trigon;

    for (var i = 0; i <= 15; i++) {
        for (var j = 0; j <= 15; j++) {

            var element = document.createElement('div');
            element.id = (i * map_size_x) + j;
            var col = "rgb(128," + (i * 8 + 128) + "," + (j * 8 + 128) + ")";
            pnlcol[element.id] = col;
            element.style.backgroundColor = col;
            element.style.position = "absolute";
            element.style.border = "1px solid DimGray";
            element.style.textAlign = "center";
            element.style.fontWeight = "bolder"
            element.style.width = 24;
            element.style.height = 24;
            element.style.top = i * 24;
            element.style.left = j * 24;
            element.onmouseover = function () {
                cid = this.id;

  //              if (trigon) openpanel(cid);
            }
            element.onmouseout = function () {
                cid = -1;
            }
            var objBody = document.getElementsByTagName("body").item(0);
            objBody.appendChild(element);
        }
    }

    var element = document.createElement('div');
    element.id = "time_1";
    element.style.backgroundColor = "white";
    element.style.position = "absolute";
    element.style.border = "1px solid black";
    element.style.textAlign = "center";
    element.style.width = 24 * 5;
    element.style.height = 23;
    element.style.top = 16 * 24;
    element.style.left = 0 * 24;

    var objBody = document.getElementsByTagName("body").item(0);
    objBody.appendChild(element);

    initialize();

    //=======↑↑↑↑↑ここまでが開始時に処理される部分↑↑↑↑↑======================================
    function initialize() {

        b_mode = 0;
        cid = -1;
        gameoverflag = false;

        openpanels_map = [];
        var el = document.getElementById("time_1");
        el.innerHTML = "Wait a minute."

        for (var i = 0; i <= mapsize; i++) {
            map[i] = "none";
            checkmap[i] = 0; // 0:none, 1:check, 2:question
            var el = document.getElementById(i);
            var col = pnlcol[i];
            el.innerHTML = "";
            el.style.backgroundColor = col;
            el.style.color = "black";
        };

        map_create();

        for (var i = 0; i <= mapsize; i++) {

            var element = document.getElementById(i);
            element.innnerHTML = "";
        }

        for (var i = 0; i <= mapsize; i++) {

            var element = document.getElementById(i);
            element.style.visibility = "visible";
        }

        var el = document.getElementById("time_1");
        el.innerHTML = "Click Start."

        gstartflag = false;
    }

    function game_start() {

        start_time = new Date().getTime();

        timerid = setInterval(count_sub, 1000);

        count_sub();

    }
    //=======ここから、サブルーチン群======================================
    function openpanel(num) {
        if (checkmap[num] != 0) return;

        if (map[num] == "bomb") {

            if (!gstartflag) {
                var el = document.getElementById("time_1");
                el.innerHTML = "Start Bombs!!"

                map_create();
                openpanel(num);
                return;
            }

            clearInterval(timerid);
            count_sub(true);

            var scr = 0;
            for (var i in openpanels_map) {
                scr++;
            };
            for (var i = 0; i <= mapsize; i++) {
                if (map[i] == "bomb") {
                    var el = document.getElementById(i);
                    el.style.backgroundColor = "pink";
                    el.style.color = "red";
                    el.innerHTML = "*";
                };
            };
            gameoverflag = true;

 //           trigon = false;

            alert("Bomb!\nGameOver!\n\n" +
			"Openpanel:" + scr + "/Bomb:" + bombcnt + "\nLast:" + (mapsize + 1 - scr - bombcnt));

            return;

        }

        if (map[num] != "bomb") {

            opennum = [];
            workmap = [];

            op_re_sub(num);

            var st = "";
            for (var i in opennum) {
                if (map[opennum[i]] == "none") {
                    map[opennum[i]] = "open";
                    colnum = 0;
                } else {
                    colnum = Number(map[opennum[i]]);
                }

                st += opennum[i] + ":";
                var el = document.getElementById(opennum[i]);
                el.innnerHTML = "?";
                el.style.backgroundColor = "white";
                el.style.color = colname[colnum];

                if (map[opennum[i]] != "open") {
                    el.innerHTML = map[opennum[i]];
                } else {
                    el.innerHTML = "";
                }
                openpanels_map[opennum[i]] = "open";
            }
        }

        openpanels_map[num] = "open";

        var scr = 0;
        for (var i in openpanels_map) {
            scr++;
        }
        if (mapsize + 1 - scr - bombcnt == 0) {
            clearInterval(timerid);
            count_sub(true);
            alert("Congraturations!!");
            gameoverflag = true;
        }
        if (!gstartflag) {
            gstartflag = true;
            game_start();
        }
    };

    function op_re_sub(num) {

        if (workmap[num] == "*") return;
        workmap[num] = "*";
        opennum.push(num);

        if (map[num] != "none") return;

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
    };

    function checkpanel(num) {
        if (openpanels_map[num] == "open") return;

        var el = document.getElementById(num);

        switch (checkmap[num]) {
            case 0:
                el.style.color = "darkblue";
                el.innerHTML = "@";
                checkmap[num] = 1;
                break;
            case 1:
                el.innerHTML = "?";
                el.style.color = "darkblue";
                checkmap[num] = 2;
                break;
            case 2:
                el.innerHTML = "";
                checkmap[num] = 0;
                break;
            default:
                break;
        }
    }

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

        //       count_sub(true);

        if (event.button == 1 - (!isMSIE) ? 1 : 0) {
            //左クリックの場合
            if (cid != -1) openpanel(cid);
 //           trigon = true;
        } else {
            //左クリックではない場合
            if (cid != -1) checkpanel(cid);
        }
    }

    document.onmouseup = function (event) {
        trigon = false;
    }

    function count_sub(q) {
        var stop_time = new Date().getTime();
        var gametime = stop_time - start_time;
        var mi = Math.floor(gametime / (60 * 1000));
        gametime = gametime - (mi * 60 * 1000);
        var se = Math.floor(gametime / 1000);
        var ms = gametime % 1000;
        var st = mi; //ho; 
        st += "分";
        st += se;
        st += "秒";
        if (Boolean(q)) st += ms;
        var el = document.getElementById("time_1");
        el.innerHTML = st;
    }

    function map_create() {

        for (var i = 0; i <= mapsize; i++) {
            map[i] = "none";

            var el = document.getElementById(i);
            el.innerHTML = "";
        };

        for (var i = 1; i <= boms; i++) {
            var num = Math.round(Math.random() * mapsize);
            map[num] = "bomb";

            var el = document.getElementById(num);
//            el.innerHTML = "b";
        };

        bombcnt = 0;
        for (var i = 0; i <= mapsize; i++) {
            if (map[i] == "bomb") bombcnt++;
        };

        for (var i = 0; i <= mapsize; i++) {
            var cnt = 0;
            for (var wx = -1; wx <= 1; wx++) {
                for (var wy = -1; wy <= 1; wy++) {

                    var adnum = i + (wy * map_size_x) + wx;

                    if ((adnum < 0) || (adnum > mapsize)) continue;
                    if ((i % map_size_x + wx < 0) || (i % map_size_x + wx >= map_size_x)) continue;
                    if ((wx == 0) && (wy == 0)) continue;

                    if (map[adnum] == "bomb") cnt++;
                }
            }
            if ((cnt != 0) && (map[i] == "none")) map[i] = cnt;
        }

    }

}
