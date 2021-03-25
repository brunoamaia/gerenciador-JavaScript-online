function resized() {
  drawGraphicOrder()
  dimensions.width = window.innerWidth * 0.9
}



const dimensions = {
  height: 250,
  width: window.innerWidth * 0.9
}

var graphicOrder = document.getElementById("graphic-order");
var context = graphicOrder.getContext("2d");

function resizeScreen() {
  graphicOrder.height = dimensions.height
  graphicOrder.width = dimensions.width
}

function xAxis() {
  context.strokeStyle = '#FAFAFA'
  context.beginPath();
  context.moveTo(15, dimensions.height * 0.85);
  context.lineTo(dimensions.width * 0.95, dimensions.height * 0.85);
  context.stroke();
}

function yAxis() {
  context.strokeStyle = '#000'
  context.beginPath();
  context.moveTo(30, 15);
  context.lineTo(30, dimensions.height * 0.9);
  context.stroke();
}


function drawGraphicOrder() {
  resizeScreen()

  xAxis()
  yAxis()


  setTimeout(drawGraphicOrder, 10)
}

drawGraphicOrder()

// const data = require('../data.json')