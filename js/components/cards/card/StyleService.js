export class StyleService {
  static GetChipStyles() {
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

  static GetTileStyle(textColor) {
    return {
      color: textColor,
      fontWeight: 'bold',
    };
  }

  static GetImageStyle(image) {
    return {
      background: 'url("' + image + '") scroll no-repeat center/cover',
    };
  }
}
