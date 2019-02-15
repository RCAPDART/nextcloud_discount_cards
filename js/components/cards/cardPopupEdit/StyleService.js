export class StyleService {
  static GetTitleStyles (color, textColor) {
    return {
      backgroundColor: color,
      color: textColor
    };
  }

  static GetTitleH3Styles (color, textColor) {
    return {
      backgroundColor: color,
      color: textColor,
      width: 'calc(100% - 144px)',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      height: '54px'
    };
  }

  static GetWindowStyles (modalWidth, modalHeight) {
    let width = 80;
    let marginLeft = 10;
    if (modalWidth) {
      width = modalWidth;
      marginLeft = (100 - width) / 2;
    }

    if (modalHeight !== 100) {
      const height = modalHeight;
      return {
        width: width + '%',
        marginLeft: marginLeft + '%',
        height: height.height + '%',
        top: height.top + '%'
      };
    }

    return {
      width: width + '%',
      marginLeft: marginLeft + '%'
    };
  }

  static GetImageStyle (img) {
    return {
      backgroundSize: 'cover',
      background: 'url("' + img + '") scroll no-repeat center/cover'
    }
  }

  static GetImageDataStyle (color, height) {
    return {
      background: color,
      height: height + 'vh'
    };
  }

  static GetChipStyles () {
    return {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    };
  }
}
