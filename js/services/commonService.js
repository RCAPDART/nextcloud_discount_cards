import { cloneDeep } from 'lodash';

export class CommonService {
  static CloneObject(obj) {
    return cloneDeep(obj);
  }

  static HexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  static GetTextColor(hex) {
    const rgbColor = CommonService.HexToRgb(hex);
    const colorMass = rgbColor.r + rgbColor.g + rgbColor.b;
    if (colorMass < 382) {
      return '#ffffff';
    }
    return '#000000';
  }

  static GetGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
