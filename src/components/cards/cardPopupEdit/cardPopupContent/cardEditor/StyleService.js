export class StyleService {
  static GetContainerStyle(backColor, textColor) {
    return {
      background: backColor,
      color: textColor,
    };
  }

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

  static GetImagePreview(acceptedUploads, card) {
    if (acceptedUploads.length > 0) {
      return {
        backgroundSize: 'cover',
        background:
          'url("' +
          acceptedUploads[0].preview +
          '") scroll no-repeat center/cover',
      };
    }
    return {
      backgroundSize: 'cover',
      background: 'url("' + card.image + '") scroll no-repeat center/cover',
    };
  }
}
