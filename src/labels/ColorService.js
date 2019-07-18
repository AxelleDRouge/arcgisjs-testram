import { Color } from './Color';

class ColorService {
  colorList;

  constructor () {
    this.colorList = new Map();
    this.colorList.set(0, new Color('NOIR', '#000000'));
    this.colorList.set(1, new Color('BLANC', '#FFFFFF'));
    this.colorList.set(2, new Color('ROUGE', '#FF0000'));
    this.colorList.set(3, new Color('ORANGE', '#FF8000'));
    this.colorList.set(4, new Color('OLIVE', '#808000'));
    this.colorList.set(5, new Color('CHARTREUSE', '#80FF00'));
    this.colorList.set(6, new Color('VERT', '#00FF00'));
    this.colorList.set(7, new Color('PRINTEMPS', '#00FF80'));
    this.colorList.set(8, new Color('SARCELLE', '#008080'));
    this.colorList.set(9, new Color('AZURE', '#0080FF'));
    this.colorList.set(10, new Color('BLEU', '#0000FF'));
    this.colorList.set(11, new Color('INDIGO', '#8000FF'));
    this.colorList.set(12, new Color('VIOLET', '#800080'));
    this.colorList.set(13, new Color('ROSE', '#FF0080'));
  }

  getColorByID(halocolor) {
    return this.colorList.get(halocolor);
  }

  getHexaColorOf(halocolor) {
    const color = this.getColorByID(halocolor);
    return color ? color.getHexaColor() : undefined;
  }
}

export const colorservice = new ColorService();
