const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1920 ],
};

const sketch = ({ context, width, height }) => {
  //variables to create a rectangle
  let x, y, w, h, fill, stroke;

  const num = 30; //number of rect
  const degrees = -30;

  const rects = [];
  //loop to create random rectangles
  for (let i = 0; i < num; i++) {
    //random position in the canvas
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(200, 600);
    h = random.range(40, 200);

    fill = `rgba(${random.range(0,255)},${random.range(0,255)},${random.range(0,255)},1)`;
    stroke = 'black';

    rects. push({ x, y, w, h, fill, stroke });
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

  rects.forEach(rect =>{
    const { x, y, w, h, fill, stroke} = rect;
  context.save();
  context.translate(x,y);
  //color
  context.strokeStyle = stroke;
  context.fillStyle = fill;

  //calling function and drawing the rect
  drawSkewedRect({ context, w, h, degrees });
  context.stroke();
  context.fill();

  context.restore();
  });


  };
};

//this function create the rect
const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -45}) => {
    //skewed
    const angle = math.degToRad(degrees);
    const rx = Math.cos(angle) * w;
    const ry = Math.sin(angle) *w;
  

    context.save();
    context.translate(rx * -0.5, (ry + h) * -0.5);
    
    
    //creating the rectangle point by point
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(rx,ry);
    context.lineTo(rx,ry + h);
    context.lineTo(0,h);
    context.closePath();
    context.stroke();

    context.restore();
}

canvasSketch(sketch, settings);
