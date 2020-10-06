// main  ==================================================================
//

function main() {

    var sysParam = [
        { canvasId: "layer0", resolution: { w: 256, h: 240 } }
        ]

	var game = new GameCore( sysParam );

    //Game Asset Setup

	game.asset.imageLoad( "FontGraph","pict/font.png" );
	game.asset.imageLoad( "SPGraph","pict/Char.png" );

	game.asset.soundLoad("jump", "sound/jump");
    //Game Device Setup
	var sp8 = [];

	for (i = 0; i < 7; i++) {
	    for (j = 0; j < 16; j++) {
	        ptn = {
	            x: 8 * j, 
	            y: 8 * i,
	            w: 8,
	            h: 8
	        };
	        sp8.push(ptn);
	    }
	}

	game.setSpFont( { name: "8x8white", id: "FontGraph", pattern: sp8 } );
   
    //Game Task Setup
	game.task.add(new GameTask_Test3("mario"));
	game.task.add(new GameTask_Test("test"));
	game.task.add(new GameTask_Test2("fps"));
    //

	game.run();

}

// task ==================================================================

function GameTask_Test(id) {
    this.id = id;

    this.enable = true;
    this.visible = true;

    this.preFlag = false;

    var i = 0;
    var fpstask;

    this.init = function (g) { }
    this.pre = function (g) {
        fpstask = g.task.read("fps");
    }

    this.step = function (g) {
        i++;

        var w = g.keyboard.check();
    }

    this.draw = function (g) {

        var st = "run " + i;// + "("
          //  + g.task.count() + " " + g.task.namelist() + ") " + g.dsp.count();

        g.screen[0].reset();
        g.screen[0].clear("black");

        var keyst = "up:" + ((g.keyboard.upkey) ? "o" : "_")
            + " dw:" + ((g.keyboard.downkey) ? "o" : "_")
            + " <-:" + ((g.keyboard.leftkey) ? "o" : "_")
            + " ->:" + ((g.keyboard.rightkey) ? "o" : "_");

        g.font["8x8white"].putchr(keyst, 0, 208);

        var keyst = "W :" + ((g.keyboard.wkey) ? "o" : "_")
            + " S :" + ((g.keyboard.skey) ? "o" : "_")
            + " A :" + ((g.keyboard.akey) ? "o" : "_")
            + " D :" + ((g.keyboard.dkey) ? "o" : "_");

        g.font["8x8white"].putchr(keyst, 0, 216);

        g.font["8x8white"].putchr("FPS:" + fpstask.fps, 0, 232);
        g.font["8x8white"].putchr(st, 0, 200);

        g.sprite.allDrawSprite();

        g.screen[0].draw();
    }

    this.post = function (g) { }
}

// task ==================================================================

function GameTask_Test2(id) {

    this.id = id; //taskid

    this.enable = true; // true : run step  false: pasue step
    this.visible = true; // true: run draw  false: pasue draw

    this.preFlag = false;

    var oldtime;
    var newtime = Date.now();
    var cnt = 0;

    var fps_log = [];
    var log_cnt = 0;
    var log_max = 0;

    var interval;

    var fps = 0;
    this.fps = 0;

    this.init = function (g) { }
    this.pre = function (g) { }

    this.step = function (g) {

        oldtime = newtime;
        newtime = Date.now();

        interval = newtime - oldtime;

        if (log_cnt > log_max) log_max = log_cnt;
        fps_log[log_cnt] = interval;

        log_cnt++;
        if (log_cnt > 59) log_cnt = 0;

        var w = 0;
        for (var i = 0; i <= log_max; i++) {
            w += fps_log[i];
        }

        cnt++;

        fps = parseInt(1000 / (w / (log_max + 1)));

        this.fps = fps;
    }

    this.draw = function (g) {
        //document.getElementById("console").innerHTML += "<br>fps:" + fps;
    }

    this.post = function (g) { }
}

// task ==================================================================

function GameTask_Test3(id) {
    this.id = id;

    this.enable = true;
    this.visible = true;

    this.preFlag = false;

    var x = 128;
    var y = 0;
    var vx = 0;
    var vy = 0;

    var jflag = false;
    var ukeyf = false;
    var jcount = 0;

    var c = 0;
    
    var m = 0;
    var k = 0;
    var old_k = 0;

    this.init = function (g) { }
    this.pre = function (g) {
        g.sprite.setPattern("sRight", {
            image: "SPGraph", wait: 0, pattern: [
                { x: 0, y: 0, w: 16, h: 16, r: 0, fv: false, fh: false }
            ]
        })

        g.sprite.setPattern("sLeft", {
            image: "SPGraph", wait: 0, pattern: [
                { x: 0, y: 0, w: 16, h: 16, r: 0, fv: false, fh: true }
            ]
        })

        g.sprite.setPattern("mRight", {
            image: "SPGraph", wait: 10, pattern: [
                { x: 16, y: 0, w: 16, h: 16, r: 0, fv: false, fh: false },
                { x: 32, y: 0, w: 16, h: 16, r: 0, fv: false, fh: false },
                { x: 48, y: 0, w: 16, h: 16, r: 0, fv: false, fh: false }
            ]
        })

        g.sprite.setPattern("mLeft", {
            image: "SPGraph", wait: 10, pattern: [
                { x: 16, y: 0, w: 16, h: 16, r: 0, fv: false, fh: true },
                { x: 32, y: 0, w: 16, h: 16, r: 0, fv: false, fh: true },
                { x: 48, y: 0, w: 16, h: 16, r: 0, fv: false, fh: true }
            ]
        })

        g.sprite.setPattern("jRight", {
            image: "SPGraph", wait: 0, pattern: [
                { x: 80, y: 0, w: 16, h: 16, r: 0, fv: false, fh: false }
            ]
        })

        g.sprite.setPattern("jLeft", {
            image: "SPGraph", wait: 0, pattern: [
                { x: 80, y: 0, w: 16, h: 16, r: 0, fv: false, fh: true }
            ]
        })

        g.sprite.setPattern("tRight", {
            image: "SPGraph", wait: 0, pattern: [
                { x: 64, y: 0, w: 16, h: 16, r: 0, fv: false, fh: false }
            ]
        })

        g.sprite.setPattern("tLeft", {
            image: "SPGraph", wait: 0, pattern: [
                { x: 64, y: 0, w: 16, h: 16, r: 0, fv: false, fh: true }
            ]
        })

        g.sprite.setPattern("sDead", {
            image: "SPGraph", wait: 0, pattern: [
                { x: 96, y: 0, w: 16, h: 16, r: 0, fv: false, fh: false }
            ]
        })

        g.sprite.set(0, "sRight");

        /*
        g.sprite.set(1, "sLeft");
        g.sprite.set(2, "mRight");
        g.sprite.set(3, "mLeft");
        g.sprite.set(4, "jRight");
        g.sprite.set(5, "jLeft");
        g.sprite.set(6, "tRight");
        g.sprite.set(7, "tLeft");
        g.sprite.set(8, "sDead");
        */
    }

    this.step = function (g) {

        var cw = g.screen[0].cw;
        var ch = g.screen[0].ch;

        c++;

        var w = g.keyboard.check();

        if (!jflag) {
            old_k = k;
            k = 0;

            //x = cw - (c % cw);
            if (g.keyboard.leftkey || g.keyboard.akey) { k = 1; }
            if (g.keyboard.rightkey || g.keyboard.dkey) { k = 2; }
            if (g.keyboard.upkey || g.keyboard.wkey) {
                if (!uketf) {
                    k = 3; uketf = true;
                }
            }
            if (!g.keyboard.upkey && !g.keyboard.wkey) { uketf = false; }


            if (k != old_k) {
                switch (k) {
                    case 1:
                        g.sprite.set(0, "mLeft");
                        vx = -1;
                        m = 1;
                        break;
                    case 2:
                        g.sprite.set(0, "mRight");
                        vx = 1;
                        m = 0;
                        break;
                    case 3:
                        if (m == 1) {
                            g.sprite.set(0, "jLeft");
                        } else {
                            g.sprite.set(0, "jRight");
                        }
                        jflag = true;
                        jcount = 40;
                        vy = -8;
                        g.sound.effect("jump");
                        break;
                    default:
                        if (m == 1) {
                            g.sprite.set(0, "sLeft");
                        } else {
                            g.sprite.set(0, "sRight");
                        }
                        vx = 0;
                        break;
                }
            }
            y = 186;
        } else {
            y += vy;

            vy += 0.4;

            jcount--;
            if (jcount <= 0) {
                jflag = false;
                old_k = -1;
            }
        }

        x += vx;
        if (x > cw) { x = 0; }
        if (x < 0) { x = cw; }
        //y = 186;
    }

    this.draw = function (g) {

        g.sprite.pos(0, x, y);
    }

    this.post = function (g) { }
}
