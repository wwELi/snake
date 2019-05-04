
import React, { useRef, useEffect, useState } from 'react';
import Rect from './rect';
import Snake from './snake';

const width = 500;
const height = 300;

export default function App() {

  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const snake = new Snake(ctx);
    const food = new Rect(ctx, getRandom(width), getRandom(height), '#db0011');

    document.addEventListener('keydown', evt => {

      const keyCode = evt.keyCode;
      const type = {
        37: Snake.left,
        38: Snake.up,
        39: Snake.right,
        40: Snake.down
      };

      type[keyCode] ? snake.changeDirection(type[keyCode]) : null;
    });

    snake.draw();
    requestAnimationFrame(time => move(time, snake, food, setScore));

  }, []);

  return (
    <>
      <h1 className="score">你的分数：{score * 10}</h1>
      <div className="boundary"><canvas ref={canvasRef}/></div>
    </>
  )
}

function getRandom(len) {
  const max = Math.floor(len / Rect.width);
  const random = Math.round(Math.random() * max) * Rect.width;

  if (random < width) {
    return random;
  }

  getRandom(len);
}

let prevTime = null;
let end = false;

function move(time, snake, food, setScore) {

  if (end) return;
  if (prevTime === null) {
    prevTime = time;
  }
  const t =  time - prevTime;

  if (t > 50) {
    prevTime = time;
    food.draw();

    snake.move(header => {

      const { x, y } = header;
      const [h, ...other] = snake.body;
      const includes = !!other.find(item => item.x === x && item.y === y);

      if (x < 0 || y < 0 || x > width || y > height || includes) {
        end = true;
        alert('结束啦...');
      }

      if (x === food.x && y === food.y) {

        snake.push();
        food.x = getRandom(width);
        food.y = getRandom(height);
        setScore(snake.getScore());
      }
    });
  }

  requestAnimationFrame((time) => move(time, snake, food, setScore));
}
