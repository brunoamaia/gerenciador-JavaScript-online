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
  xini: dimensions.width  * 0.001,
  xmin: dimensions.width  * 0.1,
  xmax: dimensions.width  * 0.95,
  yini: dimensions.height * 0.98,
  ymin: dimensions.height * 0.85,
  ymax: dimensions.height * 0.1
}

function xnormalized(array, position) {
  let value = graphArea.xmin + (position * (graphArea.xmax-graphArea.xmin))/(array.length-1)
  return value
} 

function ynormalized(array, position) {
  let value = graphArea.ymin - (array[position] * (graphArea.ymin-graphArea.ymax))/Math.max(...array)
  return value 
}

var graphicOrder = document.getElementById("graphic-order");
var context = graphicOrder.getContext("2d");

function updateSizeGraph() {
  graphArea.xini = dimensions.width  * 0.001,
  graphArea.xmin = dimensions.width * 0.1
  graphArea.xmax = dimensions.width * 0.95
  graphArea.yini = dimensions.height * 0.98
  graphArea.ymin = dimensions.height * 0.85
  graphArea.ymax = dimensions.height * 0.1

  drawGraphicOrder()
}


function resizeGraphic() {
  graphicOrder.height = dimensions.height
  graphicOrder.width = dimensions.width
}

function xAxis() {
  context.strokeStyle = '#FAFAFA'
  context.beginPath();
  context.moveTo(graphArea.xmin, graphArea.ymin);
  context.lineTo(graphArea.xmax, graphArea.ymin);
  context.stroke();
}

function xlabel(array, lines) {
  context.fillStyle = '#FAFAFA'
  context.textAlign = "start"
  context.font = '14px Nunito';

  let max = Math.max(...array)
  let residue = max%5;
  if (residue !== 0) {
    max += residue
  }

  let jump = max/lines
  let label = []
  let isfloat = false
  for (let i = 0; i <= lines; i++) {
    label[i] = jump*i
    if (label[i] % 1 !== 0) {
      isfloat = true
    }
  }

  let maxWidth = (graphArea.xmin - graphArea.xini)*0.92
  let yjump = (graphArea.ymin - graphArea.ymax)/lines

  for (let i = 0; i <= lines; i++) {
    let value = (isfloat) ? label[i-1].toFixed(2) : label[i]
    context.fillText(`$ ${value}`, graphArea.xini, (graphArea.ymin-yjump*i)+7, maxWidth);
  }

}


function yAxis() {
  context.strokeStyle = '#000'
  context.beginPath();
  context.moveTo(graphArea.xmin, graphArea.ymin);
  context.lineTo(graphArea.xmin, graphArea.ymax-14);
  context.stroke();
}

function drawLine(array) {
  context.strokeStyle = '#EFB92E'

  for (let i = 0; i<month.length-1; i++) {
    context.beginPath();
    context.moveTo(xnormalized(array, i), ynormalized(array, i));
    context.lineTo(xnormalized(array, i+1), ynormalized(array, i+1));
    context.stroke();
  }
}

function drawGraphicOrder() {
  resizeGraphic()

  xAxis()
  xlabel(orderData, 5)
  yAxis()
  drawLine(orderData)

  setTimeout(drawGraphicOrder, 3000)
}

drawGraphicOrder()
