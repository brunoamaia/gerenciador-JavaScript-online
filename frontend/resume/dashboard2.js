/* var speed = 10 */
var label = ['10s', '09s', '08s', '07s', '06s', '05s', '04s', '03s', '02s', '01s']
let dinamicData = []
for(let i=0; i<label.length+2; i++) {
  dinamicData[i] = Number(Math.random().toFixed(2))
}

const screen = {
  height: 250,
  width: window.innerWidth * 0.9,
}


// Insert html on the page
var ajax = new XMLHttpRequest();
ajax.open("GET", "painel.html", false);
ajax.send();
document.querySelector('.animated-graphic').innerHTML = ajax.responseText

// Insert canvas (id of html element inserted)
document.querySelector('.graphic-frame').innerHTML = `
<canvas id="dinamic-graphic" height="${screen.height}" width="${screen.width}"></canvas>
`
var animatedGraph = document.getElementById("dinamic-graphic");
var ctx = animatedGraph.getContext("2d");


function updateData() {
  dinamicData.push(Number(Math.random().toFixed(2)))
  dinamicData.shift()
  document.querySelector('.view-data').innerHTML = dinamicData

  // setTimeout(updateData, 1000)
}
updateData()


const graphAnimatedArea = {
  xlab: dimensions.width  * 0.001,
  xmin: dimensions.width  * 0.05,
  xmax: dimensions.width  * 0.95,
  ylab: dimensions.height * 0.98,
  ymin: dimensions.height * 0.85,
  ymax: dimensions.height * 0.1
}

function xnormalized(array, position) {
  let value = graphAnimatedArea.xmin + (position * (graphAnimatedArea.xmax-graphAnimatedArea.xmin))/(array.length-1)
  return value
} 

function ynormalized(array, position) {
  let value = graphAnimatedArea.ymin - (array[position] * (graphAnimatedArea.ymin-graphAnimatedArea.ymax))/1
  return value 
}


function xLabelGaphAnimated(array) {
  // Axis
  ctx.strokeStyle = '#FFF'
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  
  ctx.beginPath();
  ctx.moveTo(graphAnimatedArea.xmin, graphAnimatedArea.ymin);
  ctx.lineTo(graphAnimatedArea.xmax+15, graphAnimatedArea.ymin);
  ctx.stroke();


  // Label
  ctx.fillStyle = '#FFF'
  ctx.textAlign = "start"
  ctx.font = '14px Nunito';

  for (let i = 0; i <= array.length; i++) {
    ctx.fillText(array[i], xnormalized(array, i), graphAnimatedArea.ylab);
  }
  ctx.setLineDash([]);

}

function yLabelGaphAnimated(array = [0, 1]) {
  // Axis
  /* ctx.strokeStyle = '#FAFAFA' */
  ctx.beginPath();
  ctx.moveTo(graphAnimatedArea.xmin, graphAnimatedArea.ymin);
  ctx.lineTo(graphAnimatedArea.xmin, graphAnimatedArea.ymax-14);
  ctx.stroke();

  // Label
  /* ctx.fillStyle = '#FAFAFA' */
  ctx.textAlign = "start"
  ctx.font = '14px Nunito';

  let xlabel = ['  0,0', '  0,25', '  0,50', '  0,75', '  1,00'];
  let yjump = (graphAnimatedArea.ymin - graphAnimatedArea.ymax)/(xlabel.length-1);

  for (let i = 0; i < xlabel.length; i++) {
    ctx.fillText(xlabel[i], graphAnimatedArea.xlab, ((graphAnimatedArea.ymin+5)-yjump*i));
  }

  ctx.setLineDash([]);
}

function resizeDinamicGraphic() {
  screen.width = window.innerWidth * 0.9
  ctx.height = screen.height
  ctx.width = screen.width
  
  drawGraphAnimated()
}

function updateGraph(xlabel, ydata) {
  ctx.strokeStyle = '#EFB92E'
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  for (let i = 0; i<label.length; i++) {
    // begin and finish of line
    ctx.beginPath();
    ctx.moveTo(xnormalized(xlabel, i), ynormalized(ydata, i));
    ctx.lineTo(xnormalized(xlabel, i+1), ynormalized(ydata, i+1));
    ctx.stroke();
  }
}

let position = 10;

function drawGraphAnimated() {
  updateGraph(label, dinamicData)
  xLabelGaphAnimated(label)
  yLabelGaphAnimated(dinamicData)
  
}

drawGraphAnimated()