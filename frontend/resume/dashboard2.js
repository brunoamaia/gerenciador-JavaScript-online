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

  let text = ''
  for(let i = 0; i < dinamicData.length; i++) {
      text += `<span> ${dinamicData[i]} </span>`
  }
  document.querySelector('.view-data').innerHTML = text
}
updateData()

// control of timer
var timer;

function startTimer() {
  timer = setTimeout(drawGraphAnimated, 100);
}

function stopTimer() {
  clearTimeout(timer);
}


const graphAnimatedArea = {
  xlab: screen.width  * 0.001,
  xmin: 45,
  xmax: screen.width  * 0.91,
  ylab: screen.height * 0.98,
  ymin: screen.height * 0.85,
  ymax: screen.height * 0.1
}
var xposition = 0
var screenArea = (graphAnimatedArea.xmax - graphAnimatedArea.xmin)/label.length

function xregulated(array, position) {
  let value = graphAnimatedArea.xmin + (position * (graphAnimatedArea.xmax-graphAnimatedArea.xmin))/(array.length-1)
  return value
} 

function yregulated(array, position) {
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
    ctx.fillText(array[i], xregulated(array, i), graphAnimatedArea.ylab);
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

  let xlabel = [' 0,0', ' 0,25', ' 0,50', ' 0,75', ' 1,00'];
  let yjump = (graphAnimatedArea.ymin - graphAnimatedArea.ymax)/(xlabel.length-1);

  for (let i = 0; i < xlabel.length; i++) {
    ctx.fillText(xlabel[i], graphAnimatedArea.xlab, ((graphAnimatedArea.ymin+5)-yjump*i));
  }

  ctx.setLineDash([]);
}

function resizeDinamicGraphic() {
  stopTimer()
  stopTimer()

  screen.height = 250
  screen.width = window.innerWidth * 0.9

  graphAnimatedArea.xlab = screen.width  * 0.001
  graphAnimatedArea.xmin = 45
  graphAnimatedArea.xmax = screen.width  * 0.91
  graphAnimatedArea.ylab = screen.height * 0.98
  graphAnimatedArea.ymin = screen.height * 0.85
  graphAnimatedArea.ymax = screen.height * 0.1

  document.querySelector('.graphic-frame').innerHTML = `
    <canvas id="dinamic-graphic" height="${screen.height}" width="${screen.width}"></canvas>
  `
  animatedGraph = document.getElementById("dinamic-graphic");
  ctx = animatedGraph.getContext("2d");
  
  startTimer()
}

function frameBorder() {
  ctx.fillStyle = '#043946'
  ctx.fillRect(0, 0, graphAnimatedArea.xmin, graphAnimatedArea.ymin+5);
  ctx.fillRect(graphAnimatedArea.xmax+15, 0, screen.width, graphAnimatedArea.ymin+5);

}

function updateGraph(xlabel, ydata) {
  ctx.strokeStyle = '#EFB92E'
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  for (let i = 0; i<ydata.length; i++) {
    // begin and finish of line
    ctx.beginPath();
    ctx.moveTo(xregulated(xlabel, i)+xposition, yregulated(ydata, i));
    ctx.lineTo(xregulated(xlabel, i+1)+xposition, yregulated(ydata, i+1));
    ctx.stroke();
  }
}

function drawGraphAnimated() {
  ctx.clearRect(0, 0, screen.width, screen.height);
  updateGraph(label, dinamicData)
  frameBorder()
  xLabelGaphAnimated(label)
  yLabelGaphAnimated(dinamicData)

  xposition -= screenArea/20
  if ( Math.abs(xposition ) > screenArea) {
    updateData()
    xposition = 0
  }
  startTimer()
}

startTimer()