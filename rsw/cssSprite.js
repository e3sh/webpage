function cssSprite_set(el, num) {

    el.style.backgroundImage = "url(char.png)";
    el.style.backgroundRepeat = "no-repeat";

	cssSprite_change(el, num);

    //el.style.backgroundPositionX = -20 * (num % 8);// + "px" ;//Ç±ÇÃãLèqÇ≈ÇÕieÇ∆Chrome,SafariÇ≈ÇÕOKÇæÇ™
    //el.style.backgroundPositionY = -20 * Math.floor(num / 8);// + "px";//Firefox,OperaÇ≈ÇÕNGÇ≈ÇµÇΩÅB
}

function cssSprite_change(el, num) {

    var posX = -24 * (num % 8) + "px";
    var posY = -24 * Math.floor(num / 8) + "px"; 

    el.style.backgroundPosition = posX + " " + posY;
}

function cssSprite_reset(el) {

    el.style.backgroundImage = "none";

}    
