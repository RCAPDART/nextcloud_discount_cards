export class DimensionHelper {
  static uHdWidth = 4300;

  static quadHdWidth = 2500;

  static fullHdWidth = 1900;

  static mediumWidth = 1500;

  static laptopWidth = 1100;

  static smallWidth = 800;

  static extraSmallWidth = 500;

  static GetColumns(width) {
    if (width > DimensionHelper.uHdWidth) return 7;
    if (width > DimensionHelper.quadHdWidth) return 6;
    if (width > DimensionHelper.fullHdWidth) return 5;
    if (width > DimensionHelper.mediumWidth) return 4;
    if (width > DimensionHelper.laptopWidth) return 3;
    if (width > DimensionHelper.smallWidth) return 3;
    if (width > DimensionHelper.extraSmallWidth) return 2;
    return 1;
  }

  static GetMaxDialogWidth(width) {
    if (width > DimensionHelper.uHdWidth) return 30;
    if (width > DimensionHelper.quadHdWidth) return 40;
    if (width > DimensionHelper.fullHdWidth) return 50;
    if (width > DimensionHelper.mediumWidth) return 60;
    if (width > DimensionHelper.laptopWidth) return 70;
    if (width > DimensionHelper.smallWidth) return 80;
    if (width > DimensionHelper.extraSmallWidth) return 100;
    return 100;
  }

  static GetMaxDialogHeight(width) {
    if (width > DimensionHelper.uHdWidth) return 75;
    if (width > DimensionHelper.quadHdWidth) return 80;
    if (width > DimensionHelper.fullHdWidth) return 85;
    if (width > DimensionHelper.mediumWidth) return 85;
    if (width > DimensionHelper.laptopWidth) return 91;
    if (width > DimensionHelper.smallWidth) return 100;
    if (width > DimensionHelper.extraSmallWidth) return 100;
    return 100;
  }

  static GetCardImageHeight(width) {
    if (width > DimensionHelper.uHdWidth) return 40;
    if (width > DimensionHelper.quadHdWidth) return 35;
    if (width > DimensionHelper.fullHdWidth) return 35;
    if (width > DimensionHelper.mediumWidth) return 35;
    if (width > DimensionHelper.laptopWidth) return 35;
    if (width > DimensionHelper.smallWidth) return 35;
    if (width > DimensionHelper.extraSmallWidth) return 30;
    return 30;
  }
}
