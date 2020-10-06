//===================================================================================================
// Main
//
//
//===================================================================================================
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

    this.gold ;
    this.str;
    this.def;
    this.qui;
    this.floor;
    this.key;
	this.flag;

    this.levelup = levelupCheck;
	this.levelupFlag;
    this.damage;
    this.change;
    this.bgcnt;

	//initialize();//constractor

	this.init = initialize;

	function initialize(){

        this.hp = 10;
        this.exp = 0;
        this.level = 1;
//        this.levelup = false;
		this.levelupFlag = false;
        this.damage = false;
        this.bgcnt = 1;

        this.gold = 0;
        this.floor = 1;
        this.str = 0;
        this.def = 0;
        this.qui = false;
        this.key = false;
        this.potion = false;
		this.flag = false;		
	}

	function levelupCheck(){
		if (this.exp >= this.nextExp[this.level]) {
			this.level++;
			this.levelupFlag = true;
			return true;
		}else{
			this.levelupFlag = false;
			return false;
		}
	}

    this.getitem = function (num) {
        //alert(num)
        //var s = "get:(" + num + ":" + items[num][ITEM_NAME] + ")";
        var s = "get:(" + items[num][ITEM_NAME] + ")";

        if (Boolean(getsw[items[num][ITEM_TYPE]])) {
            s += "<br>" + getsw[items[num][ITEM_TYPE]](this);
        } else {
            s += "<br>non function";
        }

        console_write(s)

    }

    var getsw = [];

    getsw[ITEM_TYPE_MONEY] = function (p) {
        var g = p.floor + 1;

        p.gold += g;

        return g + "Gold手に入れた";
    }
    getsw[ITEM_TYPE_WEAPON] = function (p) {

        p.str++;

        return "武器を手に入れた";
    }
    getsw[ITEM_TYPE_ARMOR] = function (p) {

        p.def++;

        return "鎧を手に入れた";
    }

    getsw[ITEM_TYPE_SHIELD] = function (p) {
    
        p.qui = true;

        return "盾を手に入れた";
    }

    getsw[ITEM_TYPE_KEY] = function (p) {

        p.key = true;

        return "鍵を手に入れた";
    }
    getsw[ITEM_TYPE_POTION] = function (p) {

        p.hp++;
        if (p.hp > 16) p.hp = 16;

        return "HPが1回復した。";
    }

    getsw[ITEM_TYPE_ETC] = function (p) {

		p.flag = true;

        return "護符を手に入れた";
    }
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
    this.block; //true:on false:off
    this.item;
    this.stair;

    this.drawcount = 0;
    this.drawSw = false;

    this.update; //boolean

	//resetPanel(); //constractor

	this.reset = resetPanel;	

	function resetPanel(){

		this.data = 0;
		this.level = 0;

        this.bomb = false;
        this.open = false;
        this.check = false;

        this.update = true;

        this.block = false;
        this.item = 0; // true;//false;
        this.stair = false;
	}

}

//===================================================================================================
// Class
//
//
//===================================================================================================

function enemyStateClass(){

	this.name;
	this.hp;
	this.str;
	this.def;

	this.exp;
	this.graph;	
}
