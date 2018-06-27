export class StyleService {
    GetTitleStyles(color, textColor){
        return {
            backgroundColor: color,
            color: textColor
        };
    }

    GetWindowStyles(modalWidth, modalHeight){
        let width = 80;
        let marginLeft = 10;
        if(modalWidth){
            width = modalWidth;
            marginLeft = (100 - width) / 2;
        }

        if(modalHeight !== 100){
            const height = modalHeight;
            return {
                width: width + '%',
                marginLeft: marginLeft + '%',
                height: height.height+'%',
                top: height.top+'%'
            };
        }

        return {
            width: width + '%',
            marginLeft: marginLeft + '%'
        };
    }

    GetImageStyle(img) {
        return {
            backgroundSize: 'cover',
            background: 'url("' + img + '") scroll no-repeat center/cover'
        }
    }

    GetImageDataStyle(color, height) {
        return {
            background: color,
            height: height + 'vh'
        };
    }

    GetChipStyles() {
        return {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }
}