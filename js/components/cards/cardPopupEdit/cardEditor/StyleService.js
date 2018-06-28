export class StyleService {
  static GetContainerStyle (backColor, textColor) {
    return {
      background: backColor,
      color: textColor
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
