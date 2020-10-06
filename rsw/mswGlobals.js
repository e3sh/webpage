//===================================================================================================
// Main
//
//
//===================================================================================================

//data
    //monstor status

    var monstor = {
        1: ["Slime", 1, 1, 10, "deepskyblue",1],
        2: ["Goblin", 2, 2, 8, "red",2],
        3: ["LizardMan", 3, 4, 6, "magenta",3],
        4: ["Knight", 4, 8, 4, "gold",4],
        5: ["Demon", 5, 16, 2, "green",5],
        6: ["Wizard", 25, 32, 1, "pink",6]
    }

//const                
var MONSTOR_TYPE = 0;
var MONSTOR_HP = 1;
var MONSTOR_EXP = 2;
var MONSTOR_NUMBER = 3;
var MONSTOR_COLOR = 4;
var MONSTOR_GRAPH = 5;

//const                
var ITEM_TYPE_NONE = 0;
var ITEM_TYPE_MONEY = 1;
var ITEM_TYPE_WEAPON = 2;
var ITEM_TYPE_ARMOR = 3;
var ITEM_TYPE_SHIELD = 4;
var ITEM_TYPE_KEY = 5;
var ITEM_TYPE_RING = 6;
var ITEM_TYPE_SCROLL = 7;
var ITEM_TYPE_POTION = 8;
var ITEM_TYPE_ETC = 9;

var items = {
    0: [ITEM_TYPE_NONE  , "none"  , " ", 0, "black" , 0],
    1: [ITEM_TYPE_MONEY , "Money" , "G", 8, "yellow", 16],
    2: [ITEM_TYPE_WEAPON, "Weapon", "W", 9, "silver", 5],
    3: [ITEM_TYPE_ARMOR , "Armor" , "D", 10, "Red"  , 4],
    4: [ITEM_TYPE_SHIELD, "Shield", "Q", 11, "cyan" , 1],
    5: [ITEM_TYPE_KEY   , "Key"   , "K", 12, "yellow", 1],
    6: [ITEM_TYPE_POTION, "Potion", "P", 13, "green", 3],
    7: [ITEM_TYPE_SCROLL, "Scroll", "#", 0, "glay"  , 0],
    8: [ITEM_TYPE_ETC   , "Amulet", "+", 7, "white" , 0]
}
var ITEM_TYPE = 0;
var ITEM_NAME = 1
var ITEM_TEXT = 2
var ITEM_GRAPH = 3;
var ITEM_COLOR = 4;
var ITEM_NUMBER = 5;

var PANELCOLOR = "silver";//  "Brown";
var FOREGROUNDCOLOR = "white"; // "black"
var BACKGROUNDCOLOR = "black"; // "white"
//var FOREGROUNDCOLOR = "black";
//var BACKGROUNDCOLOR = "white";

var map_size_x = 25;
var map_size_y = 25;
var mapsize = map_size_x * map_size_y - 1

var cid = -1;

var dng = new Dangeon();
