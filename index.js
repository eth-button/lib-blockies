function newRand(seed) {
  const randseed = new Array(4);
  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }

  return randseed;
}

export const BLOCKIE_SIZE = 8;

class Blockies {
  constructor(seed) {
    this.randseed = newRand(seed);
    this.color = this.createColor();
    this.bgcolor = this.createColor();
    this.spotcolor = this.createColor();
    this.imageData = this.createImageData();
  }

  rand() {
    const randseed = this.randseed;
    const t = randseed[0] ^ (randseed[0] << 11);

    randseed[0] = randseed[1];
    randseed[1] = randseed[2];
    randseed[2] = randseed[3];
    randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

    return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
  }

  createColor() {
    const h = Math.floor(this.rand() * 360);
    const s = this.rand() * 60 + 40 + "%";
    const l =
      (this.rand() + this.rand() + this.rand() + this.rand()) * 25 + "%";

    const color = "hsl(" + h + "," + s + "," + l + ")";
    return color;
  }

  createImageData() {
    const width = BLOCKIE_SIZE;
    const height = BLOCKIE_SIZE;

    const dataWidth = Math.ceil(width / 2);
    const mirrorWidth = width - dataWidth;

    const data = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < dataWidth; x++) {
        row[x] = Math.floor(this.rand() * 2.3);
      }
      const r = row.slice(0, mirrorWidth);
      r.reverse();
      row = row.concat(r);

      for (let i = 0; i < row.length; i++) {
        data.push(row[i]);
      }
    }

    return data;
  }

  createCanvas(scale) {
    const color = this.color;
    const bgcolor = this.bgcolor;
    const spotcolor = this.spotcolor;
    const imageData = this.imageData;
    const c = document.createElement("canvas");
    const width = BLOCKIE_SIZE;
    c.width = c.height = width * scale;

    const cc = c.getContext("2d");
    cc.fillStyle = bgcolor;
    cc.fillRect(0, 0, c.width, c.height);
    cc.fillStyle = color;

    for (let i = 0; i < imageData.length; i++) {
      const row = Math.floor(i / width);
      const col = i % width;
      cc.fillStyle = imageData[i] === 1 ? color : spotcolor;

      if (imageData[i]) {
        cc.fillRect(col * scale, row * scale, scale, scale);
      }
    }

    return c;
  }

  getDataURL(scale) {
    return this.createCanvas(scale).toDataURL();
  }
}

export default Blockies;
