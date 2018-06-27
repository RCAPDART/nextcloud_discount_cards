'use strict';

export class DimensionHelper {
    uHdWidth = 4300;
    quadHdWidth = 2500;
    fullHdWidth = 1900;
    mediumWidth = 1500;
    laptopWidth = 1100;
    smallWidth = 800;
    extraSmallWidth = 500;

    GetColumns(width){
        if(width>this.uHdWidth) return 7;
        if(width>this.quadHdWidth) return 6;
        if(width>this.fullHdWidth) return 5;
        if(width>this.mediumWidth) return 4;
        if(width>this.laptopWidth) return 3;
        if(width>this.smallWidth) return 3;
        if(width>this.extraSmallWidth) return 2;
        return 1;
    }

    GetMaxDialogWidth(width){
        if(width>this.uHdWidth) return 30;
        if(width>this.quadHdWidth) return 40;
        if(width>this.fullHdWidth) return 50;
        if(width>this.mediumWidth) return 60;
        if(width>this.laptopWidth) return 70;
        if(width>this.smallWidth) return 80;
        if(width>this.extraSmallWidth) return 100;
        return 100;
    }

    GetMaxDialogHeight(width){
        if(width>this.uHdWidth) return 75;
        if(width>this.quadHdWidth) return 80;
        if(width>this.fullHdWidth) return 85;
        if(width>this.mediumWidth) return 85;
        if(width>this.laptopWidth) return 91;
        if(width>this.smallWidth) return 100;
        if(width>this.extraSmallWidth) return 100;
        return 100;
    }

    GetCardImageHeight(width){
        if(width>this.uHdWidth) return 40;
        if(width>this.quadHdWidth) return 35;
        if(width>this.fullHdWidth) return 35;
        if(width>this.mediumWidth) return 35;
        if(width>this.laptopWidth) return 35;
        if(width>this.smallWidth) return 35;
        if(width>this.extraSmallWidth) return 30;
        return 30;
    }
}