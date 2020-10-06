// main
function main_r() {
    //
    // requestAnimationFrame version.

    var fps = 60; //fps

    // 各ブラウザ対応
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback, element) {
		    window.setTimeout(callback, 1000 / 60);
		};
    })();

    var oldtime = Date.now(); //wDate.getTime();
    var newtime = 1;
    var waittime = 0;
    var targettime = 0;

    var framenum = 0;

    var cnt = 0;

    main_routine();

    function main_routine() {

        //メインループの内容

        cnt++;
        //document.getElementById("area").innerHTML = "_"+framenum + "/ ";
        document.getElementById("area").innerHTML = "requestAnimationFrame test<br>"
+ "now : " + newtime + "<br> "
+ "old : " + oldtime + "<br> "
        // + targettime + "<br>/ "
        // + waittime + "<br>/ "
+ "fps : " + fps + "<br> "
+ "use : " + window.requestAnimationFrame + "<br>"
+ "cnt : " + cnt + "<br> ";

        //wDate = new Date();

        newtime = Date.now(); //wDate.getTime();

        if (newtime >= oldtime + 1000) {
            oldtime = newtime;
            fps = framenum;
            framenum = 0;
        }

        framenum++;

        targettime = Math.round(oldtime + framenum * (1000.0 / fps))

        waittime = targettime - newtime;

        if (waittime <= 0) waittime = 1;

        requestAnimationFrame(main_routine);

    }
}