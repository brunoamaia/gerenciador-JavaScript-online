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
  drawGraphicOrder()
  console.log('lol')
}

const dimensions = {
  height: 250,
  width: window.innerWidth * 0.9
}
const xmin = dimensions.width * 0.1
const xmax = dimensions.width * 0.95
const ymin = dimensions.height * 0.85
const ymax = dimensions.height * 0.1

function xnormalized(position) {
  let value = xmin + (position * (xmax-xmin))/orderData.length
  return value
} 

function ynormalized(position) {
  let value = ymin - (orderData[position] * (ymin-ymax))/Math.max(...orderData)
  return value 
}

var graphicOrder = document.getElementById("graphic-order");
var context = graphicOrder.getContext("2d");

function resizeGraphic() {
  graphicOrder.height = dimensions.height
  graphicOrder.width = dimensions.width
}

function xAxis() {
  context.strokeStyle = '#FAFAFA'
  context.beginPath();
  context.moveTo(xmin, ymin);
  context.lineTo(xmax, ymin);
  context.stroke();
}

function yAxis() {
  context.strokeStyle = '#000'
  context.beginPath();
  context.moveTo(xmin, ymin);
  context.lineTo(xmin, ymax);
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

  setTimeout(drawGraphicOrder, 100)
}

drawGraphicOrder()
