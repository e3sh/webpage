//===================================================================================================
// Main
//
//
//===================================================================================================
function battleRoutine( player, mons ){

    //battle?
	var battleWin = true;

	var mhp = player.hp;
	var ehp = mons.hp;

	var btlcnt = 0;
	var msg = mons.name + "が現れた。<br>";

	msg += "HP:" + mons.hp + "攻撃力:" + mons.str + "<br><hr>"; 

	do {
		btlcnt++;
		//msg += "_turn" + btlcnt + ".";

		ehp -= player.level; //プレイヤー側の攻撃(通常攻撃)
		//msg += "atk."
		msg += "Playerの攻撃、" + mons.name + "に" + player.level + "のダメージ<br>";
		if ((ehp > 0)&&(player.str > 0)) {//通常攻撃で倒せなかった場合
			msg += "武器の使用:" + player.str + "の追加ダメージ<br>";
			ehp -= player.str; //貯めた武器を使用
			player.str = 0;
		}

		if (ehp > 0) { //敵が生きていたら、敵の反撃
			msg += mons.name + "の攻撃、";
			if (player.qui) {//盾持ってたら回避
				msg += "Playerは盾で回避した<br>";
				player.qui = false;
			} else {
				if (player.def > 0) {//貯めた防具がある場合
                	var w = player.def - mons.str;
					if (w < 0) {//防ぎきれなかった場合
						msg += "<br>Playerは、鎧で" + player.def + "ダメージ防御<br>";
						msg += "Playerに" + (-w) +"のダメージ<br>";
                   		player.def = 0;
                   		mhp += w;
                	} else {//防ぎきれた場合
                		player.def = w;
                		msg += "Playerは鎧で完全に防御した<br>"
                	}
            	} else {
            	    mhp -= mons.str;
            	    msg += "Playerに" + mons.str + "のダメージ<br>";
            	}
        	}
    	}
		msg += "<hr>";
    } while ((mhp > 0) && (ehp > 0))

	if (mhp <= 0) battleWin = false;

	if (battleWin) {
		msg += mons.name + "を倒した。<br>";

		//var dmg = player.hp - mhp;

		player.hp = mhp;
		player.exp += mons.exp;
		
		msg += mons.exp + "の経験値を得た<br>";
		if (player.levelup()) {
			msg += "Playerはレベルアップした<br>";
		}
		console_write(msg );              

	} else {
        msg += "Playerは倒された...<br>GAME OVER.<br>"

        player.hp = 0;

        console_write(msg );
	}

	return battleWin; //win:true lose:false
}
