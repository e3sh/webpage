//===================================================================================================
// Main
//
//
//===================================================================================================

//data
    //monstor status
    var monstor = {
        1: ["B1", 1, 1, 10, "deepskyblue"],
        2: ["B2", 2, 2, 8, "red"],
        3: ["B3", 3, 4, 6, "magenta"],
        4: ["B4", 4, 8, 4, "gold"],
        5: ["B5", 5, 16, 2, "green"]
    }

//const                
var MONSTOR_TYPE = 0;
var MONSTOR_HP = 1;
var MONSTOR_EXP = 2;
var MONSTOR_NUMBER = 3;
var MONSTOR_COLOR = 4;

var PANELCOLOR = "Brown";
var FOREGROUNDCOLOR = "white"; // "black"
var BACKGROUNDCOLOR = "black";

var map_size_x = 16;
var map_size_y = 16;
var mapsize = map_size_x * map_size_y - 1

var cid = -1;

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

    effectwindowcreate();
    statedispcreate();
    countdispcreate();
    timedispcreate();

    panelcreate();

    initialize();

    //panel
    //playerstate
    //battlesub

    //=======↑↑↑↑↑ここまでが開始時に処理される部分↑↑↑↑↑======================================
    function initialize() {

        cid = -1;
        gameoverflag = false;

        var el = document.getElementById("time_1");
        el.innerHTML = "Wait a minute."

        player = new statusClass();

        for (var i = 0; i <= mapsize; i++) {

            map[i] = new panelClass();

            map[i].bomb = false;
            map[i].check = false;
            map[i].level = 0;
            map[i].data = 0;
        }

        map_create();

        player.hp = 10;
        player.exp = 0;
        player.level = 1;
        player.levelup = false;
        player.damage = false;
        player.bgcnt = 1;

        document.getElementById("status_1").innerHTML = "";

        var el = document.getElementById("time_1");
        el.innerHTML = "Click Start."

        gstartflag = false;
    }

    function game_start() {

        start_time = new Date().getTime();

        timerid = setInterval(count_sub, 150);

        count_sub();

    }
    //=======ここから、サブルーチン群======================================
    function openpanel(num) {
        if (map[num].open) {
            if (map[num].bomb) {
                if (!map[num].check) {
                    map[num].check = true;
                } else {
                    map[num].check = false;
                }
            }
            map[num].update = true;
            return;
        }
        if (map[num].check) return;

        if (map[num].bomb) {

            if (!gstartflag) {
                var el = document.getElementById("time_1");
                el.innerHTML = "Start Bombs!!"

                map_create();
                openpanel(num);
                return;
            }

            //battle?
            var battleWin = true;

            var mhp = player.hp;
            var ehp = monstor[map[num].level][MONSTOR_HP];

            do {
                ehp -= player.level; //プレイヤー側の攻撃

                if (ehp > 0) { //敵が生きていたら、敵の反撃
                    mhp -= map[num].level;
                }
            } while ((mhp > 0) && (ehp > 0))

            if (mhp <= 0) battleWin = false;

            if (battleWin) {
                player.hp = mhp;
                player.exp += monstor[map[num].level][MONSTOR_EXP];

                map[num].drawcount = 5;
                map[num].drawSw = (player.level < map[num].level) ? true : false;

                player.levelup = false;
                if (player.exp >= player.nextExp[player.level]) {
                    player.level++;
                    player.levelup = true;
                }
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
                        el.style.color = monstor[map[i].level][MONSTOR_COLOR];
                        el.innerHTML = monstor[map[i].level][MONSTOR_TYPE];
                    };
                };
                gameoverflag = true;

                //****game over****//

                player.bgcnt = 5;
                player.damage = true;
                player.levelup = false;

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

        var ttl = 0;
        for (var i in map) {
            if (!map[i].open) ttl += map[i].level;
        }

        if (ttl == 0){
            for (var i in map) {
                map[i].drawcount = 1;
            }
            bgcnt = 1;

            count_sub(true);
            gameoverflag = true;

            alert("Congraturations!!");
        }
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
        
        //       count_sub(true);

        if (event.button == 1 - (!isMSIE) ? 1 : 0) {
            //左クリックの場合
            if (cid != -1) {
                openpanel(cid);
                status_disp();
            }

        } else {
            //左クリックではない場合
            if (cid != -1) {
                checkpanel(cid);
            }
        }
        //mapDisplay(map);

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
        countDisplay(map);

        return;
    }

    // ==============mapcreate ========================
    function map_create() {

        for (var i = 0; i <= mapsize; i++) {
            //map[i].data = "none";
            map[i].data = 0;
            map[i].level = 0;

            //var el = document.getElementById(i);
            //el.innerHTML = "";

            map[i].bomb = false;
            map[i].open = false;
            map[i].check = false;

            map[i].update = true;
        };

        //setup
        var cnt = 0;
        for (var i = 1; i <= 5; i++) {
            for (var j = 1; j <= monstor[i][MONSTOR_NUMBER]; j++) {
                map[cnt].bomb = true;
                map[cnt].level = i;

                cnt++;
            }
        }

        //shufful
        for (var i = 0; i <= mapsize; i++) {
            var num = Math.round(Math.random() * mapsize);
            var w = map[num];
            map[num] = map[i];
            map[i] = w;
        }

        for (var i = 0; i <= mapsize; i++) {
            var cnt = 0;
            for (var wx = -1; wx <= 1; wx++) {
                for (var wy = -1; wy <= 1; wy++) {

                    var adnum = i + (wy * map_size_x) + wx;

                    if ((adnum < 0) || (adnum > mapsize)) continue;
                    if ((i % map_size_x + wx < 0) || (i % map_size_x + wx >= map_size_x)) continue;
                    if ((wx == 0) && (wy == 0)) continue;

                    if (map[adnum].bomb) cnt += map[adnum].level    ; // cnt++;
                }
            }
            if (cnt != 0) map[i].data = cnt;
        }

        mapDisplay(map);
    }
}

//===================================================================================================
// Class
//
//
//===================================================================================================

function statusClass() {

    this.hp;
    this.exp;
    this.level;
    this.nextExp = [0, 7, 20, 50, 82, 999];
    this.levelup;
    this.damage;
    this.bgcnt;
}

//===================================================================================================
// Class
//
//
//===================================================================================================

function panelClass() {
    this.check; //boolean

    this.data;  //area
    this.level; //number
    this.open; //true:open, false:close
    this.bomb; //true:bomb, false:none

    this.drawcount = 0;
    this.drawSw = false;

    this.update; //boolean
}

//===================================================================================================
// Display Init Routine
//
//
//===================================================================================================
function panelcreate() {

    for (var i = 0; i <= 15; i++) {
        for (var j = 0; j <= 15; j++) {

            var element = divsetsub((i * map_size_x) + j
                , 1, 1
                , j + 1, i + 2
                , PANELCOLOR, "transparent", "DimGray");

            element.onmouseover = function () {
                cid = this.id;
            }
            element.onmouseout = function () {
                cid = -1;
            }
            var objBody = document.getElementsByTagName("body").item(0);
            objBody.appendChild(element);
        }
    }

}

//===================================================================================================
// Class
//
//
//===================================================================================================

function timedispcreate() {
    //time

    divset("time_1", 5, 1, 13, 19, FOREGROUNDCOLOR, "transparent", "black");
}

//===================================================================================================
// Class
//
//
//===================================================================================================

function statedispcreate() {
    //states

    divset("status_1", 18, 2, 0, 18, FOREGROUNDCOLOR, "transparent", "black");

    divset("bartitle", 1.5, 2, 1, 18, FOREGROUNDCOLOR, "transparent", "transparent");
    var el = document.getElementById("bartitle");
    el.innerHTML = "HP<BR>EXP";

    divset("exp_bar", 3, 0.5, 2.5, 19, FOREGROUNDCOLOR, "blue", "cyan");
    divset("exp_flm", 5, 0.5, 2.5, 19, FOREGROUNDCOLOR, "transparent", "white");

    for (var i = 1; i <= 10; i++) {
        divset("status_hp" + i, 0.5,1, 2 + i * 0.5, 18, FOREGROUNDCOLOR, "limegreen", "white");
    }
}

//===================================================================================================
// Class
//
//
//===================================================================================================

function countdispcreate() {
    //count

    var el;
    for (var i = 0; i < 5; i++) {
        divset("count_title" + (i + 1), 3, 1, 3 * i + 1, 0, FOREGROUNDCOLOR, "transparent", "transparent");
        divset("count_graph" + (i + 1), 1, 1, 3 * i + 1, 1, FOREGROUNDCOLOR, "transparent", "transparent");
        divset("count_num" + (i + 1), 2, 1, 3 * i + 2, 1, FOREGROUNDCOLOR, "transparent", "white");

        el = document.getElementById("count_title" + (i + 1));
        el.innerHTML = "Lv." + (i + 1);

        el = document.getElementById("count_graph" + (i + 1));
        el.style.color = monstor[i + 1][MONSTOR_COLOR];
        el.innerHTML = monstor[i + 1][MONSTOR_TYPE];
    }        

}

//===================================================================================================
// Class
//
//
//===================================================================================================

function effectwindowcreate() {

    divset("effect_1", 18, 20, 0, 0, FOREGROUNDCOLOR, BACKGROUNDCOLOR, "black");
}
//===================================================================================================

function divset(id, w, h, x, y, fg, bg, fl) {

    var element = divsetsub(
        id
        , w, h
        , x, y
        , fg, bg, fl);

    var objBody = document.getElementsByTagName("body").item(0);
    objBody.appendChild(element);
}

function divsetsub(id, w, h, x, y, fg, bg, fl) {

    var element = document.createElement('div');
    element.id = id;
    element.style.color = fg;
    element.style.backgroundColor = bg;
    element.style.position = "absolute";
    element.style.border = "1px solid " + fl;
    element.style.textAlign = "center";
    element.style.fontWeight = "bolder";
    element.style.width = 24 * w -1;
    element.style.height = 24 * h -1;
    element.style.top = y * 24 + 1;
    element.style.left = x * 24 + 1;

    return element;
}

//===================================================================================================
// Display Routine
//
//
//===================================================================================================

function mapDisplay(map) {

    for (var i = 0; i <= mapsize; i++) {

        if (map[i].update) {
            var el = document.getElementById(i);

            if (map[i].drawcount != 0) {

                var n = map[i].drawcount;
                if (map[i].bomb) {
                    if (map[i].drawSw) {
                        el.style.backgroundColor = "rgb(" + (n * 64) + ",0 ,0)"; //r
                    } else {
                        el.style.backgroundColor = "rgb(0," + (n * 64) + ",0)"; //g
                    }
                } else {
                    el.style.backgroundColor = "rgb(0," + (n * 64) + "," + (n * 64) + ")"; //cyan

                }
            } else {
                el.style.backgroundColor = "transparent";
            }

            if (map[i].open) {
                //OpenPanel
                if (map[i].bomb) {
                    //Bomb
                    el.style.color = monstor[map[i].level][MONSTOR_COLOR];
                    if (map[i].check) {
                        el.innerHTML = map[i].data;
                    } else {
                        el.innerHTML = monstor[map[i].level][MONSTOR_TYPE];
                    }
                } else {
                    //Etc
                    el.style.color = FOREGROUNDCOLOR;

                    if (map[i].data != 0) {
                        el.innerHTML = map[i].data;
                    } else {
                        el.innerHTML = "";
                    }
                }
            } else {
                //ClosePanel
                el.style.backgroundColor = PANELCOLOR;
                if (map[i].check) {
                    el.style.color = "darkblue";
                    el.innerHTML = "@";
                } else {
                    el.innerHTML = "";
                }

            }
            map[i].update = false;
        }
    }
}

function statusDisplay(player, q) {

    if (Boolean(q)) {
        var el;
        for (var i = 1; i <= 10; i++) {
            el = document.getElementById("status_hp" + i);
            if (player.hp >= i) {
                el.style.backgroundColor = "limegreen";
            } else {
                el.style.backgroundColor = "transparent";
            }
        }

        var p = (player.exp - player.nextExp[player.level - 1]) / (player.nextExp[player.level] - player.nextExp[player.level - 1])

        el = document.getElementById("exp_bar");
        el.style.width =  Math.floor(120 * p);

        var st = "";
        //st += " HP : " + player.hp; //  + "<br>";
        st += " LV : " + player.level; //  + "<br>";
        //st += " EXP : " + player.exp; //  + "<br>";
        //st += " NEXT: " + (player.nextExp[player.level] - player.exp) + "<br>";

        el = document.getElementById("status_1");
        el.innerHTML = st;
    }

    //statuswindow color animation

    var el1 = document.getElementById("status_1");
    var el2 = document.getElementById("effect_1");

    if (player.bgcnt != 0) {

        var n = player.bgcnt;
        if (player.damage) {
            //el.style.backgroundColor = "rgb(255," + (255 - n * 48) + "," + (255 - n * 48) + ")"; //r
            el2.style.backgroundColor = "rgb(" + (n * 64) + ",0 ,0)"; //r
        }
        if (player.levelup) {
            //el.style.backgroundColor = "rgb(" + (255 - n * 48) + ",255," + (255 - n * 48) + ")"; //g
            el1.style.backgroundColor = "rgb(0," + (n * 64) + ",0)"; //g
        }

    } else {
        el1.style.backgroundColor = "transparent";
        el2.style.backgroundColor = BACKGROUNDCOLOR;
    }

}

function timeDisplay(gametime, q) {

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

function countDisplay(map) {

    var cnt = [];
    for (var i = 0; i <= 5; i++) {
        cnt[i] = 0;
    }

    for (var i in map) {

        if (!map[i].open & map[i].bomb) cnt[map[i].level]++;
    }
/*
    var st = "";
    for (var i = 1; i <= 5; i++) {
        st += " Lv" + i + ": " + cnt[i] + " /"; //  + "<br>"; //  + "/" + map_size_x * map_size_y + "<br>";
    }
    var el = document.getElementById("count_1");
    el.innerHTML = st;
*/
    var el;
    for (var i = 0; i < 5; i++) {
        el = document.getElementById("count_num" + (i + 1));
        el.innerHTML = "" + cnt[i + 1];
    }        



}