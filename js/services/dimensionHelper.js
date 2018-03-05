'use strict';

export class DimensionHelper {
    uHdWidth = 4300;
    quadHdWidth = 2500;
    fullHdWidth = 1900;
    mediumWidth = 1500;
    laptopWidth = 1100;
    smallWidth = 900;
    extraSmallWidth = 600;

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
}