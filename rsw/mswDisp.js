//===================================================================================================
// Main
//
//
//===================================================================================================
function createDisplay(){
//実行順番が後ほど表示プライオリティが高いが、後でもプロパティで変えられる模様。

	//var objBody = document.getElementsByTagName("body").item(0);
	//objBody.style.fontSize = "80%";

    effectwindowcreate();

    panelcreate();

    statedispcreate();
    itemstatedispcreate()
    //statedispcreate();
    //countdispcreate();
	//itemstatedispcreate()
    timedispcreate();
    consolecreate();
}
//===================================================================================================
// Display Init Routine
//
//
//===================================================================================================
function panelcreate() {

    for (var i = 0; i <= map_size_y - 1; i++) {
        for (var j = 0; j <= map_size_x - 1; j++) {

            var element = divsetsub((i * map_size_x) + j
                , 1, 1
                , j + 1, i + 0
                , PANELCOLOR, "transparent", "DimGray");

            element.onmouseover = function () {
                cid = this.id;
		//this.style.border = "3px solid";// transparent";

            }
            element.onmouseout = function () {
                cid = -1;
                //this.style.border = "1px solid transparent";

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

    divset("time_1", 5, 1, map_size_x-3, map_size_y + 0, FOREGROUNDCOLOR, "transparent", "black");

    el = document.getElementById("time_1");
    el.style.textAlign = "left";
}

//===================================================================================================
// Class
//
//
//===================================================================================================

function statedispcreate() {
    //states

    divset("status_1", map_size_x + 2, 2, 0, map_size_y + 0, FOREGROUNDCOLOR, "transparent", "black");
	divset("status_2", 11, 1, 11, map_size_y + 0, FOREGROUNDCOLOR, "transparent", "black");

    divset("bartitle1", 1.5, 2, 1, map_size_y + 0, FOREGROUNDCOLOR, "transparent", "transparent");
    var el = document.getElementById("bartitle1");
    el.innerHTML = "HP";

    divset("bartitle2", 1.5, 2, 1, map_size_y + 1, FOREGROUNDCOLOR, "transparent", "transparent");
    var el = document.getElementById("bartitle2");
    el.innerHTML = "EXP";

    divset("exp_bar", 3, 0.5, 2.5, map_size_y + 1, FOREGROUNDCOLOR, "blue", "cyan");
    divset("exp_flm", 5, 0.5, 2.5, map_size_y + 1, FOREGROUNDCOLOR, "transparent", "white");

    for (var i = 1; i <= 16; i++) {
        divset("status_hp" + i, 0.5, 1, 2 + i * 0.5, map_size_y + 0, FOREGROUNDCOLOR, "limegreen", "white");
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
    //    divset("count_title" + (i + 1), 3, 1, 3 * i + 1, map_size_y + 2, FOREGROUNDCOLOR, "transparent", "transparent");
        divset("count_graph" + (i + 1), 1, 1, 4 * i + 1, map_size_y + 3, FOREGROUNDCOLOR, "transparent", "transparent");
        divset("count_num" + (i + 1), 3, 1, 4 * i + 2, map_size_y + 3, FOREGROUNDCOLOR, "transparent", "white");

    //    el = document.getElementById("count_title" + (i + 1));
    //    el.innerHTML = "Lv." + (i + 1);

        el = document.getElementById("count_graph" + (i + 1));
        //el.style.color = monstor[i + 1][MONSTOR_COLOR];
        //el.innerHTML = monstor[i + 1][MONSTOR_TYPE];
		cssSprite_set(el, monstor[i+1][MONSTOR_GRAPH]);
    }        

}

//===================================================================================================
// Class
//
//
//===================================================================================================

function itemstatedispcreate() {
    //count

    var el;
/*
    for (var i = 0; i < 6; i++) {
    //    divset("item_title" + (i + 1), 3, 1, 3 * i + 1, map_size_y + 1, FOREGROUNDCOLOR, "transparent", "transparent");
        divset("item_graph" + (i + 1), 1, 1, 4 * i + 1, map_size_y + 2, FOREGROUNDCOLOR, "transparent", "transparent");
        divset("item_num" + (i + 1), 3, 1, 4 * i + 2, map_size_y + 2, FOREGROUNDCOLOR, "transparent", "white");

    //    el = document.getElementById("count_title" + (i + 1));
    //    el.innerHTML = "Lv." + (i + 1);

        el = document.getElementById("item_graph" + (i + 1));
        //el.style.color = items[i + 1][ITEM_COLOR];
        //el.innerHTML = items[i + 1][ITEM_GRAPH];
		cssSprite_set(el, items[i + 1][ITEM_GRAPH]);
    }

    el = document.getElementById("item_graph6");
	cssSprite_set(el, items[8][ITEM_GRAPH]);
    */
/*
    for (var i = 1; i <= 10; i++) {
        divset("bar_x" + i, 0.25, 1, 14 + i * 0.25, map_size_y + 1, FOREGROUNDCOLOR, "limegreen", "white");
    }        
*/

	divset("itemtitle", 2, 1, 8, map_size_y + 1, FOREGROUNDCOLOR, "transparent", "transparent");
    var el = document.getElementById("itemtitle");
    el.innerHTML = "ITEM";

    for (var i = 0; i < 16; i++) {
        divset("item" + i, 1, 1, 10 + i, map_size_y + 1, FOREGROUNDCOLOR, "transparent", "transparent");
    }

}

//===================================================================================================
// Class
//
//
//===================================================================================================

function effectwindowcreate() {

    divset("effect_1", map_size_x + 2, map_size_y + 2, 0, 0, FOREGROUNDCOLOR, BACKGROUNDCOLOR, "black");
}

//===================================================================================================
// Class
//
//
//===================================================================================================

function consolecreate() {

//    divset("console_1", map_size_x, 2, 1, map_size_y - 2, FOREGROUNDCOLOR, "transparent", "white");
//    divset("console_1", 8, map_size_y - 1, map_size_x, 1, FOREGROUNDCOLOR, "transparent", "white");
    divset("console_1", 12, map_size_y - 2, map_size_x - 1, 1, FOREGROUNDCOLOR, BACKGROUNDCOLOR, "darkgray");

    el = document.getElementById("console_1");
    el.style.textAlign = "left";
	el.style.fontWeight = "normal";
   
}

function console_write(s){

    var el = document.getElementById("console_1");
   
    el.innerHTML = s;
    el.style.visibility = "visible";
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

    var element = document.createElement('a');
    element.id = id;
    element.style.color = fg;
    element.style.backgroundColor = bg;
    element.style.position = "absolute";
    element.style.border = "1px solid " + fl;
    element.style.textAlign = "center";
    element.style.fontWeight = "bolder";
    element.style.width = 24 * w -1 + "px";
    element.style.height = 24 * h -1 + "px";
    element.style.top = y * 24 + 1 + "px";
    element.style.left = x * 24 + 1 + "px";

    //element.title = id; //"test\ntitle";
    element.title = "";

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

            if ((map[i].drawcount != 0) && !map[i].block) {

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

                if (!map[i].block) {
                    el.style.visibility = "visible"; //ie6対策
                    el.style.backgroundColor = "transparent";
                    el.style.border = "1px solid DimGray";
                    cssSprite_reset(el);
                    el.title = "";
                } else {
                    el.style.visibility = "hidden"; //ie6対策
                    el.style.backgroundColor = "transparent";
                    //el.style.backgroundColor = "darkblue";
                    el.style.border = "1px solid transparent";
                    cssSprite_reset(el);
                    el.title = "";
                }

            }

            if (map[i].open) {
                //OpenPanel
                if (map[i].bomb) {
                    //Bomb
                    el.style.color = monstor[map[i].level][MONSTOR_COLOR];
                    if (map[i].check) {
                        if (map[i].item > 0) {
                            el.style.color = items[map[i].item][ITEM_COLOR];
                            //el.innerHTML = items[map[i].item][ITEM_TEXT];
                            cssSprite_set(el, items[map[i].item][ITEM_GRAPH]);
                            el.title = items[map[i].item][ITEM_NAME];
                        } else {
                            el.innerHTML = map[i].data;
                            el.title = "";
                            //cssSprite_set(el, 1);
                        }
                    } else {
                        //el.innerHTML = monstor[map[i].level][MONSTOR_TYPE];
                        cssSprite_set(el, monstor[map[i].level][MONSTOR_GRAPH]);
                        el.title = "Lv." + map[i].level + "\n" + monstor[map[i].level][MONSTOR_TYPE];
                    }
                } else {
                    //Etc
                    el.style.color = FOREGROUNDCOLOR;
                    if (map[i].stair) {
                        //el.style.backgroundColor = "brown";
                        //el.style.border = "1px solid white";
                        cssSprite_set(el, 14); //door display
                        el.title = "Door";
                    }

                    if ((map[i].data != 0) && !map[i].block) {
                        el.innerHTML = map[i].data;
                        //cssSprite_set(el, 1);
                    } else {
                        if (map[i].stair) {
                            //  el.style.backgroundColor = "brown";
                            //    el.innerHTML = "%";
                            el.innerHTML = "";
                        } else {
                            el.innerHTML = "";
                            el.title = "";
                        }
                    }
                }

            } else {
                //ClosePanel
                el.style.backgroundColor = PANELCOLOR;
                //el.style.border = "2px solid white";
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
        for (var i = 1; i <= 16; i++) {
            el = document.getElementById("status_hp" + i);
            if (player.hp >= i) {
                el.style.backgroundColor = "limegreen";
            } else {
                el.style.backgroundColor = "transparent";
            }
        }

		var wexp1 = player.exp - player.nextExp[player.level - 1];
		var wexp2 = player.nextExp[player.level] - player.nextExp[player.level - 1];

//		var p = (player.exp - player.nextExp[player.level - 1]) / (player.nextExp[player.level] - player.nextExp[player.level - 1])
		var p = wexp1 / wexp2;

		//alert(p);
        el = document.getElementById("exp_flm");
		el.innerHTML = wexp1 + " / " + wexp2;

        el = document.getElementById("exp_bar");
        el.style.width =  Math.floor(120 * p) + "px";
		//el.innerHTML = p + "(" + player.level + ":" + player.exp + ":" + player.nextExp[player.level-1] +")";		

        var st = "";
        //st += " HP : " + player.hp; //  + "<br>";
        st += "　LV: " + player.level; //  + "<br>";
        //st += " EXP : " + player.exp; //  + "<br>";
        //st += " NEXT: " + (player.nextExp[player.level] - player.exp) + "<br>";

        st += "　Floor: " + player.floor;
        st += "　Gold: " + player.gold;

		//st += " 攻:" + player.level +"(" + player.str + ")";
		//st += " 防:0(" + player.def + ")";

        el = document.getElementById("status_2");
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
        if (player.levelupFlag) {
            //el.style.backgroundColor = "rgb(" + (255 - n * 48) + ",255," + (255 - n * 48) + ")"; //g
            el1.style.backgroundColor = "rgb(0," + (n * 64) + ",0)"; //g
        }
        if (player.change) {
            //el.style.backgroundColor = "rgb(" + (255 - n * 48) + ",255," + (255 - n * 48) + ")"; //g
            el2.style.backgroundColor = "rgb(" + (n * 32) + "," + (n * 32) + ","+ (n * 32) + ")"; //gray
        }


    } else {
        el1.style.backgroundColor = "transparent";
        el2.style.backgroundColor = BACKGROUNDCOLOR;
		player.change = false;
//		player.levelupFlag = false;
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

	var w = Math.floor(ms/250);
	for (var i=1; i<=w; i++){
		st += ".";
	}
    //if (Boolean(q)) st += ms;
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


function itemsDisplay(player) {

/*
    var el;
    el = document.getElementById("item_num1");
    el.innerHTML = player.gold;

    el = document.getElementById("item_num2");
    el.innerHTML = player.str;

    el = document.getElementById("item_num3");
    el.innerHTML = player.def;

    el = document.getElementById("item_num4");
    el.innerHTML = player.qui;

    el = document.getElementById("item_num5");
    el.innerHTML = player.key;

    el = document.getElementById("item_num6");
    el.innerHTML = player.flag;
*/
	var cnt = 0;

	if (player.flag){
		itemdisp_sub(cnt, 8);
		cnt++;
	}

	if (player.key){
		itemdisp_sub(cnt, 5);
		cnt++;
	}

	for (var i=1 ; i<=player.str ; i++){
		itemdisp_sub(cnt, 2);		
		cnt++
	}

	for (var i=1 ; i<=player.def ; i++){
		itemdisp_sub(cnt, 3);		
		cnt++
	}

	if (player.qui){
		itemdisp_sub(cnt, 4);
		cnt++;
	}

	for (var i = cnt; i <16 ; i++){
		itemdisp_sub(i, 0);
	}

	function itemdisp_sub(cnt, itemno){

	    el = document.getElementById("item" + cnt);
	    //el.title = "test";
//		el.innerHTML = itemno;
		if (itemno != 0){
		    cssSprite_set(el, items[itemno][ITEM_GRAPH]);
		    //el.title = itemno;
		    el.title = items[itemno][ITEM_NAME];
		}else{
		    cssSprite_reset(el);
		    el.title = "none";
		}
	}
}
