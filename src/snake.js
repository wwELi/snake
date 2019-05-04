import Rect from './rect';

import headerUrl from './images/header.png';
import bodyUrl from './images/body.png';

const headerImg = new Image();
headerImg.src = headerUrl;

const bodyImg = new Image();
bodyImg.src = bodyUrl;

export default class Snake {

  static defaultLen = 10;
  static up = 'up';
  static down = 'down';
  static left = 'left';
  static right = 'right';

  body = [];

  constructor(ctx, direction = Snake.down) {

    this.ctx = ctx;
    this.direction = direction;
    const header = new Rect(ctx, Rect.width, Rect.width, headerImg);
    this.body.push(header);

    for (let i = 1; i < Snake.defaultLen; i++) {
      this.push();
    }
  }

  push() {
    const { body, ctx } = this;
    const lastRect = body[body.length - 1];
    const { x, y } = lastRect;

    switch (this.direction) {
      case Snake.up:
        body.push(new Rect(ctx, x, y + Rect.width, bodyImg));
        break;
      case Snake.right:
        body.push(new Rect(ctx, x - Rect.width, y, bodyImg));
        break;
      case Snake.down:
        body.push(new Rect(ctx, x, y - Rect.width, bodyImg));
        break;
      case Snake.left:
        body.push(new Rect(ctx, x + Rect.width, y, bodyImg));
        break;
    }
  }

  changeDirection(direction) {
    const directions = [direction, this.direction].sort().join(',');
    if (directions === [Snake.left, Snake.right].sort().join(',')) {
      return;
    }

    if (directions === [Snake.up, Snake.down].sort().join(',')) {
      return;
    }

    this.direction = direction;
  }

  draw() {
    this.body.forEach(rect => rect.draw());
  }

  clear() {
    this.body.forEach(rect => rect.clear());
  }

  move(cb = () => {}) {

    const [header, ...other] = this.body;
    this.clear();

    other.reduce((prev, head) => {

      const headX = head.x;
      const headY = head.y;

      const { x, y } = prev;

      head.x = x;
      head.y = y;

      return new Rect(this.ctx, headX, headY);

    }, header);

    this.moveHeader();
    this.draw();
    cb(header);
  }

  getScore() {
    return this.body.length - Snake.defaultLen;
  }

  moveHeader() {

    const width = Rect.width;
    const { direction, body } = this;
    const [header] = body;

    switch (direction) {
      case Snake.up:
        header.y = header.y - width;
        break;
      case Snake.right:
        header.x = header.x + width;
        break;
      case Snake.down:
        header.y = header.y + width;
        break;
      case Snake.left:
        header.x = header.x - width;
        break;
    }
  }

}
