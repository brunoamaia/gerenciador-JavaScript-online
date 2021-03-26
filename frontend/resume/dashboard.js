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
  xini: dimensions.width  * 0.03,
  xmin: dimensions.width  * 0.1,
  xmax: dimensions.width  * 0.95,
  yini: dimensions.height * 0.98,
  ymin: dimensions.height * 0.85,
  ymax: dimensions.height * 0.1
}

function xnormalized(position) {
  let value = graphArea.xmin + (position * (graphArea.xmax-graphArea.xmin))/(orderData.length-1)
  return value
} 

function ynormalized(position) {
  let value = graphArea.ymin - (orderData[position] * (graphArea.ymin-graphArea.ymax))/Math.max(...orderData)
  return value 
}

var graphicOrder = document.getElementById("graphic-order");
var context = graphicOrder.getContext("2d");

function updateSizeGraph() {
  graphArea.xini = dimensions.width  * 0.03,
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

function yAxis() {
  context.strokeStyle = '#000'
  context.beginPath();
  context.moveTo(graphArea.xmin, graphArea.ymin);
  context.lineTo(graphArea.xmin, graphArea.ymax);
  context.stroke();
}

function drawLine() {
  context.strokeStyle = '#EFB92E'

  for (let i = 0; i<month.length-1; i++) {
    context.beginPath();
    context.moveTo(xnormalized(i), ynormalized(i));
    context.lineTo(xnormalized(i+1), ynormalized(i+1));
    context.stroke();
  }
}

function drawGraphicOrder() {
  resizeGraphic()

  xAxis()
  yAxis()
  drawLine()

  setTimeout(drawGraphicOrder, 300)
}

drawGraphicOrder()
