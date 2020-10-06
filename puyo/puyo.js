// puyo - javascript

//grobal 
//public const

	cols = 3;
	cols_max = 5;
	mapsize = 72;
	map_size_x = 6;
	map_size_y = 13;
	colname = [ "black", "red",  "limegreen",  "deepskyblue", "gold", "magenta", "blue", "white"];
	waku_colname = ["black", "orange", "lightgreen", "skyblue", "yellow", "pink", "deepskyblue",  "silver"];

	intervalwait = 50;

//public 
	map = [[]];
	bkupmap = [[]];
	chkmap = [[]];
	eraselist = [];

	el = [];
	wstr = "";
	inkey = 0;
	
	count = 0;
	d_count = 0;

	block_next = [];
	block_now = [];

	waitcontrolflag = 0;

	function puyo() {
	    /*
	    block_next = [];
	    block_now = [];

	    for (var i = 0; i <= map_size_y; i++) {
	    map[i] = [];
	    for (var j = 0; j <= map_size_x - 1; j++) {
	    map[i][j] = 0;
	    }
	    }
	    var wstr
	    */
	    // 枠の設定
	    var element = document.createElement('div');
	    var num = "waku";
	    element.id = num;
	    element.style.position = "absolute";
	    element.style.color = "white";
	    element.style.backgroundColor = "DimGray";
	    element.style.border = "1px solid Black";
	    element.style.textAlign = "center";
	    element.style.fontWeight = "bolder";
	    element.style.top = 24; //map_size_y * 0;
	    element.style.left = map_size_x * 0;
	    element.style.width = map_size_x * 24;
	    element.style.height = map_size_y * 24 - 24;

	    var objBody = document.getElementsByTagName("body").item(0);
	    objBody.appendChild(element);

	    // メイン画面の設定
	    var element = document.createElement('div');
	    var num = "cnsl";
	    element.id = num;
	    element.style.position = "absolute";
	    //	element.style.color = "white";
	    element.style.backgroundColor = "Silver";
	    element.style.border = "1px solid Black";
	    element.style.textAlign = "center";
	    element.style.fontWeight = "bolder";
	    element.style.top = 5 * 24;
	    element.style.left = map_size_x * 24;
	    element.style.width = map_size_x * 24;
	    element.style.height = 8 * 24;

	    var objBody = document.getElementsByTagName("body").item(0);
	    objBody.appendChild(element);

	    // スコア枠の設定
	    var element = document.createElement('div');
	    var num = "scr";
	    element.id = num;
	    element.style.position = "absolute";
	    //	element.style.color = "white";
	    element.style.backgroundColor = "white";
	    element.style.border = "1px solid DimGray";
	    element.style.textAlign = "center";
	    element.style.fontWeight = "bolder";
	    element.style.top = 2 * 24;
	    element.style.left = map_size_x * 24;
	    element.style.width = map_size_x * 24;
	    element.style.height = 2 * 24;

	    var objBody = document.getElementsByTagName("body").item(0);
	    objBody.appendChild(element);

	    // メイン画面の設定2
	    for (var i = 0; i <= map_size_y - 1; i++) {
	        for (var j = 0; j <= map_size_x - 1; j++) {
	            var element = document.createElement('div');
	            var num = "c" + j + ":" + i;
	            element.id = num;
	            element.style.visibility = "hidden";
	            element.style.position = "absolute";
	            //		element.style.color = "white";
	            element.style.backgroundColor = "black";
	            //		element.style.border = "1px solid DimGray"; 
	            element.style.textAlign = "center";
	            //		element.style.fontWeight = "bolder"; 
	            element.style.top = i * 24;
	            element.style.left = j * 24;
	            element.style.width = 24;
	            element.style.height = 24;

	            var objBody = document.getElementsByTagName("body").item(0);
	            objBody.appendChild(element);
	        }
	    }

	    // メッセージ枠の設定(chain表示)
	    var element = document.createElement('div');
	    var num = "msg";
	    element.id = num;
	    element.style.position = "absolute";
	    //	element.style.color = "white";
	    element.style.backgroundColor = "white";
	    element.style.border = "1px solid DimGray";
	    element.style.textAlign = "center";
	    element.style.fontWeight = "bolder";
	    element.style.top = 0 * 24;
	    element.style.left = 0; //map_size_x * 24;
	    element.style.width = map_size_x * 24;
	    element.style.height = 1 * 24;

	    var objBody = document.getElementsByTagName("body").item(0);
	    objBody.appendChild(element);

	    // 脇画面の設定2
	    for (i = 0; i <= 1; i++) {
	        var element = document.createElement('div');
	        var num = "s" + i;
	        element.id = num;
	        element.style.position = "absolute";
	        element.style.backgroundColor = "black";
	        element.style.border = "1px solid DimGray";
	        element.style.textAlign = "center";
	        //	element.style.fontWeight = "bolder"; 
	        element.style.top = i * 24;
	        element.style.left = map_size_x * 24;
	        element.style.width = 24;
	        element.style.height = 24;

	        var objBody = document.getElementsByTagName("body").item(0);
	        objBody.appendChild(element);
	    }

	    document.onkeydown = function (event) {
	        inkey = window.event.keyCode;

	        if (gameover_flag) {
	            if (inkey == 32) {
	                initialize();
	                timerID = setInterval(main_r, intervalwait);
	            }
	        }

	    }
	    document.onkeyup = function (event) {
	        inkey = 0;
	    }

	    function initialize() {
	        map = [[]];
	        bkupmap = [[]];
	        chkmap = [[]];
	        eraselist = [];

	        wstr = "";
	        inkey = 0;

	        for (var i = 0; i <= map_size_y; i++) {
	            map[i] = [];
	            for (var j = 0; j <= map_size_x - 1; j++) {
	                map[i][j] = 0;
	            }
	        }

	        count = 0;
	        d_count = 0;

	        block_next[0] = new blockbase();
	        block_next[1] = new blockbase();
	        block_now[0] = new blockbase();
	        block_now[1] = new blockbase();

	        block = block_now[0];

	        block_next[0].reset();
	        block_next[1].reset();

	        vx = 0;
	        vy = 0;

	        check_mode = false;
	        ck_cnt = 0;
	        chain = 0;
	        wscore = 0;

	        score = 0;
	        turn = 0;
	        level = 0;
	        speed = 1;

	        cols = 3;

	        speeddownf = false;

	        firstsort = false;

	        gameover_flag = false;

	        moves = [];

	        var el = document.getElementById("cnsl");

	        el.innerHTML = "Start."

	        waitcontrolflag = 0;
	    }


	    var el = document.getElementById("cnsl");

	    el.innerHTML += "<br>";
	    el.innerHTML += "Push Space to Start.<br>";

	    gameover_flag = true;

	    //	    initialize();

	    //	    timerID = setInterval(main_r, intervalwait);


	    function main_r() {
	        waitcontrolflag = 1 - waitcontrolflag;

	        var sc = document.getElementById("scr");
	        sc.innerHTML = "Score:" + score + "<br>";
	        sc.innerHTML += "trun:" + turn + " level:" + level + " cols:" + cols + " speed:" + speed;

	        //	disp_map();

	        var el = document.getElementById("cnsl");

	        var st = "";

	        vx = 0;
	        vy = 0;
	        speeddownf = false;

	        switch (inkey) {
	            case 32:
	                if (block.e) floor_on();
	                break;
	            case 37: //<=
	                vx = -1;
	                break;
	            case 38: //up
	                //	                d_count -= 0.25;
	                speeddownf = true;
	                block.r = (block.r + 1) % 2;

	                    if (collisioncheck()) {
	                        block.x -= 1;
	                        if (collisioncheck()) {
	                            block.r = (block.r + 1) % 2;
	                            block.x += 1;
	                        }

	                    }
	                    if (block.r % 2 == 0) {
	                        var w = block_now[0].c
	                        block_now[0].c = block_now[1].c
	                        block_now[1].c = w;
	                    }

	                    block_now[1].x = block_now[0].x + block_now[0].vx();
	                    block_now[1].y = block_now[0].y + block_now[0].vy();
	                inkey = 0;

	                break;
	            case 39: //=>
	                vx = 1;
	                break;
	            case 40: //down
	                vy = 1;
	                if (waitcontrolflag == 1) d_count = 5 - speed * 0.5; 
	                break;
	            default:
	                vx = 0;
	                vy = 0;
	                break;
	        }


	        if (!block.e) {

	            if (check_mode) {
	                checkmode_sub();
	            } else {
	                changeturn_sub();
	            }

	        } else {
                
	            if (waitcontrolflag == 1) step_down(); else disp_map(true);
	        }
	        //	        inkey = 0;
	    }


	    function floor_on() {

	        block.e = false;
	        check_mode = true;
	        el.innerHTML = "";
	        wscore = 0;
	        firstsort = false;

	        map[block.y][block.x] = block_now[0].c;
	        map[block.y + block.vy()][block.x + block.vx()] = block_now[1].c;
	    }

	    function blockbase() {

	        this.x;
	        this.y;
	        this.c;
	        this.r;
	        this.e = false;

	        this.sx;
	        this.sy;

	        var wvx = [0, 1, 0, -1];
	        var wvy = [-1, 0, -1, 0];

	        this.reset = function () {

	            this.x = 2;
	            this.y = 1;
	            this.c = Math.floor(Math.random() * cols) + 1;
	            this.e = true;
	            this.r = 0;

	            this.sx = 0;
	            this.sy = 0;
	        }

	        this.vx = function () {
	            return wvx[this.r];
	        }

	        this.vy = function () {
	            return wvy[this.r];
	        }
	    }

	    function erase_check() {
	        var count = 0;

	        chkmap = [[]];

	        for (var i = 0; i <= map_size_y; i++) {
	            chkmap[i] = [];
	            for (var j = 0; j <= map_size_x - 1; j++) {
	                chkmap[i][j] = false;
	            }
	        }

	        var st = "";
	        //		backupmap();
	        for (var i = 0; i <= map_size_y - 1; i++) {
	            for (var j = 0; j <= map_size_x - 1; j++) {

	                if (chkmap[i][j]) continue;
	                if (map[i][j] == 0) continue;

	                eraselist = [];

	                var num = erase_check_sub(j, i);

	                if (num >= 4) {

	                    count += num;

	                    for (var k in eraselist) {
	                        var loc = eraselist[k];

	                        map[loc[1]][loc[0]] = 0;
	                    }
	                    map[i][j] = 0;

	                    moves = sortmap();
	                }
	            }
	        }
	        return count;
	    }

	    function erase_check_sub(x, y) {
	        var w_count = 1;

	        var vx = [0, 1, 0, -1];
	        var vy = [-1, 0, 1, 0];

	        if (chkmap[y][x]) return 0;
	        if (map[y][x] == 0) return 0;

	        chkmap[y][x] = true;

	        var c_num = map[y][x];

	        for (var i = 0; i <= 3; i++) {
	            if ((y + vy[i] < 0) || (y + vy[i] > map_size_y - 1)) continue;
	            if ((x + vx[i] < 0) || (x + vx[i] > map_size_x - 1)) continue;

	            if (c_num == map[y + vy[i]][x + vx[i]]) {

	                eraselist.push([x + vx[i], y + vy[i]]);

	                w_count += erase_check_sub(x + vx[i], y + vy[i])
	            }
	        }

	        return w_count;
	    }

	    function sortmap() {

	        var mov = [];

	        for (var i = 0; i <= map_size_x - 1; i++) {
	            for (var j = map_size_y - 1; j > 0; j--) {
	                if (map[j][i] != 0) continue;

	                for (var k = j - 1; k >= 0; k--) {
	                    if (map[k][i] == 0) continue;

	                    var w = map[j][i];
	                    map[j][i] = map[k][i];
	                    map[k][i] = w;

	                    var w = {}
	                    w.x = i;
	                    w.y = j;
	                    w.oy = k;

	                    mov.push(w);
	                    break;
	                }
	            }
	        }
	        return mov;
	    }

	    function disp_map(flag) {
	        disp_map2(flag);
	    }

	    function disp_map2(flag) {

	        for (var i = 0; i <= map_size_y - 1; i++) {
	            for (var j = 0; j <= map_size_x - 1; j++) {

	                var num = "c" + j + ":" + i;
	                var el = document.getElementById(num);
	                el.style.top = i * 24;

	                if ((i == block.y + block.vy()) && (j == block.x + block.vx()) && flag) {
	                    el.style.visibility = "visible";
	                    el.style.backgroundColor = colname[block_now[1].c];
	                    el.style.border = "1px solid " + waku_colname[block_now[1].c];
	                    el.style.top = (i - 1) * 24 + d_count * 3.6;
	                } else
	                    if ((i == block.y) && (j == block.x) && flag) {
	                        el.style.visibility = "visible";
	                        el.style.backgroundColor = colname[block.c];
	                        el.style.border = "1px solid " + waku_colname[block.c];
	                        el.style.top = (i - 1) * 24 + d_count * 3.6;

	                    } else {
	                        for (var k in moves) {
	                            if ((moves[k].x == j) && (moves[k].y == i)) {
	                                el.style.top = (i - (moves[k].y - moves[k].oy)) * 24 + ck_cnt * ((24 * (moves[k].y - moves[k].oy)) / 5); //+ ck_cnt * 3.6;
	                            }
	                        }
	                        if (map[i][j] == 0) {
	                            el.style.visibility = "hidden";
	                        } else {
	                            el.style.visibility = "visible";
	                        }
	                        el.style.backgroundColor = colname[map[i][j]];
	                        el.style.border = "1px solid " + waku_colname[map[i][j]];
	                    }
	            }
	        }

	        var el = document.getElementById("s0");
	        el.style.backgroundColor = colname[block_next[1].c];
	        el.style.border = "1px solid " + waku_colname[block_next[1].c];
	        var el = document.getElementById("s1");
	        el.style.backgroundColor = colname[block_next[0].c];
	        el.style.border = "1px solid " + waku_colname[block_next[0].c];
	    }

	    function allclearcheck() {

	        var num = 0;

	        for (var i = 0; i <= map_size_y - 1; i++) {
	            for (var j = 0; j <= map_size_x - 1; j++) {
	                num += map[i][j];
	            }
	        }

	        return num;
	    }

	    function score_display(st) {
	        document.getElementById("score").innerHTML = st;
	    }


	    function collisioncheck() {

	        if (collcheck_x() || collcheck_y()) return true;

	        return false;
	    }

	    function collcheck_x() {
	        var flg = false;

	        if ((block.x + vx < 0) || (block.x + vx > map_size_x - 1)) flg = true;

	        if ((block.x + vx + block.vx() < 0) || (block.x + vx + block.vx() > map_size_x - 1)) flg = true;

	        if (map[block.y][block.x + vx] != 0) flg = true;
	        if (map[block.y + vy][block.x + vx] != 0) flg = true;

	        if (map[block.y + block.vy()][block.x + vx + block.vx()] != 0) flg = true;
	        if (map[block.y + vy + block.vy()][block.x + vx + block.vx()] != 0) flg = true;

	        return flg;

	    }

	    function collcheck_y() {
	        var flg = false;

	        if ((block.y + vy < 0) || (block.y + vy > map_size_y - 1)) flg = true;
	        if ((block.y + vy + block.vy() < 0) || (block.y + vy + block.vy() > map_size_y - 1)) flg = true;

	        if (map[block.y + vy][block.x] != 0) flg = true;

	        if (map[block.y + vy + block.vy()][block.x + block.vx()] != 0) flg = true;

	        return flg;

	    }

	    function checkmode_sub() {

	        var num;

	        disp_map(false);

	        if (!firstsort) {
	            moves = sortmap();
	            firstsort = true;
	        }
	        //yaku check;
	        ck_cnt++;
	        if (ck_cnt > 5) {
	            ck_cnt = 0;
	            num = erase_check();
	            chain++;
	            if (num == 0) {
	                check_mode = false;
	                chain = 0;
	            }

	            if (chain != 0) {
	                if (chain >= 2) {
	                    document.getElementById("msg").innerHTML = "Chain:" + chain;
	                } else {
	                    document.getElementById("msg").innerHTML = "-----";
	                }
	                el.innerHTML += num * 10 + "pts x " + chain + "<br>";
	                wscore += num * 10 * chain;
	            } else {
	                if (wscore == 0) {
	                    document.getElementById("msg").innerHTML = " ---";
	                } else {
	                    el.innerHTML += "---------------<br>";
	                    el.innerHTML += wscore + "pts.<br>";

	                    if (allclearcheck() == 0) {
	                        el.innerHTML += "<br>";
	                        el.innerHTML += "AllClearBonus.<br>";
	                        el.innerHTML += "100pts<br>";
	                        wscore += 100;
	                    }

	                }
	                score += wscore;
	            }
	        }


	    }

	    function changeturn_sub() {
	        turn++;

	        if (turn % 12 == 0) {
	            level++;
	        }

	        if (turn % (2 + level) == 0) {
	            speed++;
	        }

	        if (speed > 10) {
	            cols++;
	            if (cols > cols_max) {
	                cols = cols_max;
	            } else {
	                speed = 1;
	            }
	        }

	        moves = [];

	        block_now[0] = block_next[0]
	        block_now[1] = block_next[1];

	        block_next[0] = new blockbase();
	        block_next[1] = new blockbase();
	        block_next[0].reset();
	        block_next[1].reset();

	        block = block_now[0];

	        if (map[block.y][block.x] != 0) {
	            el.innerHTML += "Game_over.<br>";
	            el.innerHTML += "<br>";
	            el.innerHTML += "Push Space to Start.<br>";

	            gameover_flag = true;
	            clearInterval(timerID);
	        }


	    }

	    function step_down() {
            var dcount_vec = ((block.y < 3) && (speed > 5)) ? speed * 0.25: speed * 0.5;

            if (speeddownf) dcount_vec /= 5;

	        d_count += dcount_vec;

	        if (d_count > 5) {
	            vy = 1;
	            //block.y++;
	            d_count = 0;
	        }
	        if (collcheck_x()) vx = 0;
	        if (collcheck_y()) vy = 0;

	        block.x += vx;
	        block.y += vy;

	        disp_map(true);

	        if (d_count + (speed * 0.5) >= 5) {

	            if ((block.y + 1 >= map_size_y) || (block.y + 1 + block.vy() >= map_size_y)) floor_on();

	            if ((map[block.y + 1][block.x] != 0) || (map[block.y + 1 + block.vy()][block.x + block.vx()] != 0)) floor_on();
	        }
	    }


	}