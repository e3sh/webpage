//**************************************************************
// VirtualPadControl (iPhone対応用 2012/09/29
// タッチパットから方向とボタン入力コントロール
// PCではデバッグしにくい
// マルチポイントのタッチコントロール有効制御
//**************************************************************

function inputControl(canvas_id) {

    //vControllerの入力位置設定

    var vCntlPos = {};

    vCntlPos.X = 0;
    vCntlPos.Y = 0;

    var Pad_Loc = {};

    Pad_Loc.X = 160
    Pad_Loc.Y = 160
    Pad_Loc.R = 150

    var Button_Loc = [];

    for (var i = 0; i <= 1; i++) {

        Button_Loc[i] = {};

        Button_Loc[i].X = 240 + 160 * (i + 1);
        Button_Loc[i].Y = 160;
        Button_Loc[i].R = 60;
        Button_Loc[i].ON = false;
    }


    for (var i = 0; i <= 1; i++) {

        Button_Loc[i + 2] = {};

        Button_Loc[i + 2].X = 480;
        Button_Loc[i + 2].Y = 60 + 200 * i;
        Button_Loc[i + 2].R = 60;
        Button_Loc[i + 2].ON = false;
    }


    var pos = [];

    var pos_x = [];
    var pos_y = [];

    var now_button;
    var button = -1;

    var now_vdeg = 0;
    var now_vbutton = {};
    var now_vdistance = -1;

    var cvs = document.getElementById(canvas_id);
    //	var cvs = document;

    this.o_Left = cvs.offsetLeft;
    this.o_Top = cvs.offsetTop;

    //mouseevent

    cvs.onmousemove = function move(event) {
        // 移動した座標を取得
        x = event.clientX;
        y = event.clientY;

        if (now_button != -1) {
            pos[0] = {};

            pos[0].x = x;
            pos[0].y = y;
        }
    }

    cvs.onmousedown = function (event) {

        now_button = event.button;

        x = event.clientX;
        y = event.clientY;

        pos = [];

        if (now_button != -1) {
            pos[0] = {};

            pos[0].x = x;
            pos[0].y = y;
        }
    }

    cvs.onmouseup = function (event) {

        pos = [];

        now_button = -1
    }

    cvs.onmousewheel = function (event) {

        now_wheel = event.wheelDelta;

    }

    //firefox用ホイールコントロール
    cvs.addEventListener("DOMMouseScroll", wheelfx, false);
    function wheelfx(event) {

        now_wheel = event.detail;

    }

    //iPodTouch用(マルチポイントタッチ)
    cvs.ontouchmove = function (event) {
        event.preventDefault();

        /*
        if (event.touches.length > 0) {
        for (var i = 0; i < event.touches.length; i++) {
        var t = event.touches[i];

        pos[i] = {};
        // 移動した座標を取得
        pos[i].x = t.pageX;
        pos[i].y = t.pageY;
        }
        }
        */
        touchposget(event);
    }

    cvs.ontouchstart = function (event) {
        event.preventDefault();


        /*
        pos = [];

        if (event.touches.length > 0) {
        for (var i = 0; i < event.touches.length; i++) {
        var t = event.touches[i];

        pos[i] = {};

        pos[i].x = t.pageX;
        pos[i].y = t.pageY;
        }
        }
        */
        touchposget(event);

        now_button = 0;
    }

    cvs.ontouchend = function (event) {
        event.preventDefault();

        //if (event.touches.length == 0) {
        //    pos = [];
        //}

        touchposget(event);

        now_button = -1
    }

    function touchposget(event) {

        pos = [];

        if (event.touches.length > 0) {
            for (var i = 0; i < event.touches.length; i++) {
                var t = event.touches[i];

                pos[i] = {};

                pos[i].x = t.pageX;
                pos[i].y = t.pageY;
            }
        }
    }

    this.check = function () {

        //return deg = 0 -359 ,button[0-n] = false or true;
        //       distance 

        now_vdeg = 0;
        now_vbutton = {};

        for (var j = 0; j <= bn; j++) {
            now_vbutton[j] = false;
        }

        now_vdistance = -1;

        var bn = Button_Loc.length - 1;

        var tr = 0; // deg;
        var dst = -1;

        if (pos.length > 0) {
            for (var i = 0; i < pos.length; i++) {
                var wdst = dist(pos[i].x, pos[i].y, Pad_Loc.X, Pad_Loc.Y);

                if (Pad_Loc.R > wdst) {
                    //パッドに複数点入力の場合は最後のものを優先
                    tr = Math.floor(target_r(Pad_Loc.X, Pad_Loc.Y, pos[i].x, pos[i].y));
                    dst = wdst;
                }

                for (var j = 0; j <= bn; j++) {
                    if (Button_Loc[j].R > dist(Button_Loc[j].X, Button_Loc[j].Y, pos[i].x, pos[i].y)) {
                        now_vbutton[j] = true;
                    } else {
                        // now_vbutton[j] = false;
                    }
                }
            }
        }

        now_vdeg = tr;
        now_vdistance = dst;

        var state = {};

        state.button = now_vbutton;
        state.deg = tr; // deg;
        state.distance = dst //dstns;

        return state;
    }

    this.check_last = function () {

        var state = {};

        state.button = now_vbutton;
        state.deg = now_vdeg; // deg;
        state.distance = now_vdistance; //dstns;

        return state;
    }

    this.draw = function (context) {

        var st = this.check_last();

        var bn = Button_Loc.length - 1;

        var cx = 320;
        var cy = 320;

        context.fillStyle = "black";
        context.fillRect(0, 0, cx, cy);
        context.fillStyle = "white";
        context.fillRect(5, 5, cx - 10, cy - 10);

        context.fillStyle = "green";
        //		context.fillText( new_x + " " + new_y + " " + cx +" "+cy+" "+tr , 32, 32 );

        context.beginPath();
        context.arc(Pad_Loc.X, Pad_Loc.Y, Pad_Loc.R, 0, 2 * Math.PI, true);
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.arc(Pad_Loc.X, Pad_Loc.Y, Pad_Loc.R - 5, 0, 2 * Math.PI, true);
        context.fillStyle = "white";
        context.fill();

        for (var i = 0; i <= bn; i++) {

            context.beginPath();
            context.arc(Button_Loc[i].X, Button_Loc[i].Y, Button_Loc[i].R, 0, 2 * Math.PI, true);
            context.fillStyle = "black";
            context.fill();
            context.beginPath();
            context.arc(Button_Loc[i].X, Button_Loc[i].Y, Button_Loc[i].R - 5, 0, 2 * Math.PI, true);
            context.fillStyle = "white";
            context.fill();
        }

        var s = "p " + pos.length + "/";

        if (st.distance > 0) {

            s = s + "d " + st.deg + " ";

            context.beginPath();
            context.moveTo(Pad_Loc.X, Pad_Loc.Y);
            context.lineTo(Pad_Loc.X + Math.cos(ToRadian(st.deg - 90)) * st.distance
                        , Pad_Loc.Y + Math.sin(ToRadian(st.deg - 90)) * st.distance);
            context.strokeStyle = "black";
            context.lineWidth = 5;
            context.stroke();

            //context.beginPath();
            //context.arc(pos[i].x, pos[i].y, 35, 0, 2 * Math.PI, true);
            //context.fillStyle = "orange";
            //context.fill();
        }

        for (var j = 0; j <= bn; j++) {
            if (st.button[j]) {
                s = s + "b" + j + " ";

                context.beginPath();
                context.arc(Button_Loc[j].X, Button_Loc[j].Y, Button_Loc[j].R - 5, 0, 2 * Math.PI, true);
                context.fillStyle = "orange";
                context.fill();
            }
        }

        context.fillStyle = "green";
        context.fillText(s, 12, 16);
        // 移動した座標を取得

        //context.beginPath();
        //context.arc(pos[i].x, pos[i].y, 10, 0, 2 * Math.PI, true);
        //context.fillStyle = "blue";
        //context.fill();
    }

    //以下は共通の関数で別のクラスの中に入れていてもいい。
    //

    //自分( x,y )から目標( tx, ty )の
    //	方向角度を調べる(上が角度0の0-359)
    function target_r(x, y, tx, ty) {
        var r;

        var wx = tx - x;
        var wy = ty - y;

        if (wx == 0) {
            if (wy >= 0) r = 180; else r = 0;
        } else {
            r = ToDegree(Math.atan(wy / wx));

            if ((wx >= 0) && (wy >= 0)) r = 90 + r;
            if ((wx >= 0) && (wy < 0)) r = 90 + r;
            if ((wx < 0) && (wy < 0)) r = 270 + r;
            if ((wx < 0) && (wy >= 0)) r = 270 + r;
        }

        return r;
    }

    //角度からラジアンに変換
    //
    function ToRadian(d) {
        return (d * (Math.PI / 180.0));
    }

    //ラジアンから角度に変換
    //
    function ToDegree(r) {
        return (r * (180.0 / Math.PI));
    }

    //2点間の距離
    function dist(x, y, tx, ty) {

        return Math.floor(Math.sqrt(Math.pow(Math.abs(x - tx), 2) + Math.pow(Math.abs(y - ty), 2)));
    }
}
