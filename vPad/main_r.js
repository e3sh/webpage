// main
function main_r() {

    var fps = 60; //fps

    var fnum = 0;
    var oldtime = Date.now();

    // 各ブラウザ対応

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback, element) {

		    fnum++;
		    if (fnum > fps) {
		        fnum = 1;
		        oldtime = Date.now();
		    }

		    var targettime = oldtime + Math.round(fnum * (1000.0 / fps));
		    var newtime = Date.now();
		    var waittime = targettime - newtime;

		    if (waittime <= 0) waittime = 1;

		    setTimeout(callback, waittime);


		};
    })();


    var inp = new inputControl("Layer0");

    var canvas = document.getElementById("Layer0");

    canvas.width = 640;
    canvas.height = 480;

    var device = canvas.getContext("2d");

    main_routine();

    function main_routine() {

        var ms = inp.check();

        inp.draw(device);

        requestAnimationFrame(arguments.callee);
    }
}