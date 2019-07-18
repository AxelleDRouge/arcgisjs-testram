export class LabelAttributes {
  textAttribute;
  coordXLineStart;
  coordYLineStart;
  coordXLineFinish;
  coordYLineFinish;
  haloColor = 0;
  fontSize;
  textColor = 0;
  police = "";

  constructor (
    textAttribute,
    coordXLineStart,
    coordYLineStart,
    coordXLineFinish,
    coordYLineFinish,
    haloColor,
    fontSize,
    textColor,
    police
  ) {
    Object.assign(this, {
      textAttribute,
      coordXLineStart,
      coordYLineStart,
      coordXLineFinish,
      coordYLineFinish,
      haloColor,
      fontSize,
      textColor,
      police
    });
  }

  getTextAttribute() {
    return this.textAttribute;
  }

  getCoordStart() {
    return [this.coordXLineStart, this.coordYLineStart];
  }

  getCoordFinish() {
    return [this.coordXLineFinish, this.coordYLineFinish];
  }

  getHaloColor() {
    return this.haloColor;
  }

  getFontSize() {
    return this.fontSize;
  }

  getTextColor() {
    return this.textColor;
  }

  getPolice() {
    return this.police;
  }
}
