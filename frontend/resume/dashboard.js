// import data from "json"
var data = JSON.parse(dataProduction)

// break the variable
const month = data.months
const orderData = data.request
const produced = data.production
const inventory = data.inventory.production
const supply = data.inventory.supply

function resized() {
  dimensions.width = window.innerWidth * 0.9
  updateSizeGraph()
}

const dimensions = {
  height: 250,
  width: window.innerWidth * 0.9
}

const graphArea = {
  xini: dimensions.width * 0.001,
  xmin: dimensions.width * 0.1,
  xmax: dimensions.width * 0.95,
  yini: dimensions.height * 0.98,
  ymin: dimensions.height * 0.85,
  ymax: dimensions.height * 0.1
}

function xnormalized(array, position) {
  let value = graphArea.xmin + (position * (graphArea.xmax - graphArea.xmin)) / (array.length - 1)
  return value
}

function ynormalized(array, position) {
  // let value = graphArea.ymin - (array[position] * (graphArea.ymin - graphArea.ymax)) / Math.max(...array)
  let value = graphArea.ymin - (array[position] * (graphArea.ymin - graphArea.ymax)) / 35000
  return value
}

var graphicOrder = document.getElementById("graphic-order");
var context = graphicOrder.getContext("2d");

graphicOrder.addEventListener("mousemove", function (event) {
  disp(event)
}, false);

function formatNumber(value, decimals = false) {
  let decimal = '.00'
  if (String(value).split('.').length > 1) {
    decimal = '.' + String(value).split('.')[1]
  }

  let newValue = String(value).split('.')[0]
  newValue = newValue.split('')
  for (let i = 1; i < newValue.length; i++) {
    if (i % 3 === 0) {
      newValue[newValue.length - i] = '.' + newValue[newValue.length - i]
    }
  }

  let final = ''
  for (let i = 0; i < newValue.length; i++) {
    final += newValue[i]
  }

  if (decimals) {
    final += decimal
  }

  return final
}

var positionDescription = 0
function drawRoundedRectangle(xinit) {
  let yinit = 100
  let radius = 10
  let width = 160
  let height = 90

  let position = 0
  for (let i = 0; i < divisions.length; i++) {
    if (xinit > divisions[i]) {
      position = i + 1
    }
  }

  if (position !== positionDescription) {
    positionDescription = position
    drawGraphicOrder()
  }

  let newy = ynormalized(orderData, position)

  if (newy > dimensions.height / 2) {
    yinit = newy - height - 20
    xinit = pointsValueX[position]
  } else {
    yinit = newy + 20
    xinit = pointsValueX[position]
  }


  if (xinit < (graphArea.xmin + width / 2)) {
    xinit = graphArea.xmin - 20
  } else if (xinit > (graphArea.xmax - width / 2)) {
    xinit = graphArea.xmax - (width - 20)
  } else {
    xinit = xinit - width / 2
  }

  // Insert frame
  context.fillStyle = '#043946'
  context.strokeStyle = '#FFF'
  context.lineWidth = 3
  context.lineCap = 'round'

  context.fillRect(xinit + 2, yinit + 2, width - 4, height - 4)

  context.beginPath();
  context.moveTo(xinit, yinit + radius);
  context.lineTo(xinit, yinit + height - radius);
  context.quadraticCurveTo(xinit, yinit + height, xinit + radius, yinit + height);
  context.lineTo(xinit + width - radius, yinit + height);
  context.quadraticCurveTo(xinit + width, yinit + height, xinit + width, yinit + height - radius);
  context.lineTo(xinit + width, yinit + radius);
  context.quadraticCurveTo(xinit + width, yinit, xinit + width - radius, yinit);
  context.lineTo(xinit + radius, yinit);
  context.quadraticCurveTo(xinit, yinit, xinit, yinit + radius);
  context.stroke();


  // insert text
  context.fillStyle = '#FFF'
  context.textAlign = "start"

  context.font = '20px Nunito';
  context.fillText(month[position], xinit + 15, yinit + 25)

  context.font = '14px Nunito';
  let text = formatNumber(orderData[position], false)
  context.fillText(`Pedidos: ${text}`, xinit + 15, yinit + 50)

  text = formatNumber(produced[position], false)
  context.fillText(`Meta: ${text}`, xinit + 15, yinit + 70)
}


var yMinForExit = undefined
var yscroll = 0

function disp(event) {
  let scrollnow = window.scrollY
  if (scrollnow !== yscroll) {
    yMinForExit = undefined
    yscroll = scrollnow
  }

  let ynow = event.clientY
  if (yMinForExit == undefined) {
    yMinForExit = ynow
  } else if (ynow < yMinForExit) {
    yMinForExit = ynow
  }

  let exitGraph = false
  if ((event.clientX - graphicOrder.offsetLeft) < 50 ||
    (event.clientX - graphicOrder.offsetLeft) > (graphArea.xmax + 20) ||
    ynow < yMinForExit + 10 || ynow > yMinForExit + 240
  ) {
    exitGraph = true
  }

  if (exitGraph) {
    drawGraphicOrder()
  } else {
    drawRoundedRectangle(event.clientX - graphicOrder.offsetLeft)
  }
}

var pointsValueX = []
var pointsValueY = []
var divisions = []

function updateSizeGraph() {
  graphArea.xini = dimensions.width * 0.001
  graphArea.xmin = dimensions.width * 0.1
  graphArea.xmax = dimensions.width * 0.95
  graphArea.yini = dimensions.height * 0.98
  graphArea.ymin = dimensions.height * 0.85
  graphArea.ymax = dimensions.height * 0.1

  drawGraphicOrder()
}


function resizeGraphic() {
  graphicOrder.height = dimensions.height
  graphicOrder.width = dimensions.width - 10
}

function yAxis() {
  context.strokeStyle = '#FFF'
  context.lineWidth = 3;
  context.lineCap = 'round';

  context.beginPath();
  context.moveTo(graphArea.xmin, graphArea.ymin);
  context.lineTo(graphArea.xmax + 15, graphArea.ymin);
  context.stroke();
}

function yLabel(array, lines, grid = true) {
  context.fillStyle = '#FFF'
  context.textAlign = "start"
  context.font = '14px Nunito';

  let max = Math.max(...array)
  let residue = max % 5;
  if (residue !== 0) {
    max += residue
  }

  let jump = max / lines
  let label = []
  let isfloat = false
  for (let i = 0; i <= lines; i++) {
    label[i] = jump * i
    if (label[i] % 1 !== 0) {
      isfloat = true
    }
  }

  let maxWidth = (graphArea.xmin - graphArea.xini) * 0.92
  let yjump = (graphArea.ymin - graphArea.ymax) / lines

  for (let i = 0; i <= lines; i++) {
    let value = (isfloat) ? label[i - 1].toFixed(2) : label[i]
    
    value = formatNumber(value, false)
    context.fillText(` ${value}`, graphArea.xini, (graphArea.ymin - yjump * i) + 5, maxWidth);

    if (grid && i > 0) {
      context.beginPath();
      context.setLineDash([5, 15]);
      context.moveTo(graphArea.xmin, graphArea.ymin - yjump * i);
      context.lineTo(graphArea.xmax, graphArea.ymin - yjump * i);
      context.stroke();
    }
  }
  context.setLineDash([]);
}

function xAxis() {
  context.strokeStyle = '#FAFAFA'
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(graphArea.xmin, graphArea.ymin);
  context.lineTo(graphArea.xmin, graphArea.ymax - 14);
  context.stroke();
}

function xLabel(array, grid = true) {
  context.fillStyle = '#FAFAFA'
  context.textAlign = "center"
  context.font = '14px Nunito';

  for (let i = 0; i < array.length; i++) {
    context.fillText(array[i].slice(0, 3), xnormalized(array, i), graphArea.yini);

    if (grid && i > 0) {
      context.beginPath();
      context.setLineDash([5, 15]);
      context.moveTo(xnormalized(array, i), graphArea.ymin);
      context.lineTo(xnormalized(array, i), graphArea.ymax);
      context.stroke();
    }
  }
  context.setLineDash([]);
}

function drawLine(array, color) {
  context.strokeStyle = color
  context.lineWidth = 5;
  context.lineCap = 'round';

  for (let i = 0; i < month.length - 1; i++) {
    // begin and finish of line
    context.beginPath();
    context.moveTo(xnormalized(array, i), ynormalized(array, i));
    context.lineTo(xnormalized(array, i + 1), ynormalized(array, i + 1));
    context.stroke();

    // draw dot
    //context.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    if (i === 0) {
      context.beginPath();
      context.arc(xnormalized(array, i), ynormalized(array, i), 5, 0, 0.001, true);
      context.stroke();

      pointsValueX[i] = xnormalized(array, i).toFixed(2)
      pointsValueY[i] = ynormalized(array, i).toFixed(2)
    }

    context.beginPath();
    context.arc(xnormalized(array, i + 1), ynormalized(array, i + 1), 5, 0, 0.001, true);
    context.stroke();

    pointsValueX[i + 1] = xnormalized(array, i + 1).toFixed(2)
    pointsValueY[i + 1] = ynormalized(array, i + 1).toFixed(2)

  }
}

var gridH = true
var gridV = false

function drawGraphicOrder() {
  resizeGraphic()

  xAxis()
  xLabel(month, gridV)
  yAxis()
  yLabel(orderData, 5, gridH)
  drawLine(produced, '#7CB441')
  drawLine(orderData, '#4449F4')

  for (let i = 0; i < pointsValueX.length - 1; i++) {
    divisions[i] = (Number(pointsValueX[i]) + Number(pointsValueX[i + 1])) / 2
  }
}

drawGraphicOrder()


var showControlElements = false
function handleEnableElements() {
  showControlElements = !showControlElements
  if (showControlElements) {
    window.document.querySelector('.enable').classList.add('show')
    window.document.querySelector('.control-menu').classList.add('show')
  } else {
    window.document.querySelector('.enable').classList.remove('show')
    window.document.querySelector('.control-menu').classList.remove('show')
  }
}

function handleChangeGridH() {
  gridH = !gridH
  drawGraphicOrder()
  if (gridH) {
    window.document.querySelector('.markA').classList.add('on')
  } else {
    window.document.querySelector('.markA').classList.remove('on')
  }
}

function handleChangeGridV() {
  gridV = !gridV
  drawGraphicOrder()
  if (gridV) {
    window.document.querySelector('.markB').classList.add('on')
  } else {
    window.document.querySelector('.markB').classList.remove('on')
  }
}

