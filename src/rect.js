
export default class Rect {

  static width = 10;

  constructor(ctx, x, y, img) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    img instanceof Image
      ? this.img = img || null
      : this.color = img || '#666';
  }

  draw() {
    const { ctx, color, x, y, img } = this;

    ctx.beginPath();

    if (!(img instanceof Image)) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, Rect.width, Rect.width);
    } else {
      const { width, height } = this.img;
      ctx.drawImage(img, 0, 0, width, height, x, y, Rect.width, Rect.width);
    }

    ctx.closePath();
  }

  clear() {
    const { ctx, x, y } = this;
    ctx.clearRect(x, y, Rect.width, Rect.width);
  }
}

