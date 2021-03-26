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
  graphicOrder.width = dimensions.width-10
}

function xAxis() {
  context.strokeStyle = '#FFF'
  context.lineWidth = 2;
  context.lineCap = 'round';
  
  context.beginPath();
  context.moveTo(graphArea.xmin, graphArea.ymin);
  context.lineTo(graphArea.xmax+15, graphArea.ymin);
  context.stroke();
}

function xlabel(array, lines, grid = true) {
  context.fillStyle = '#FFF'
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
    context.fillText(`$ ${value}`, graphArea.xini, (graphArea.ymin-yjump*i)+5, maxWidth);
    
    if (grid && i>0) {
      context.beginPath();
      context.setLineDash([5, 15]);
      context.moveTo(graphArea.xmin, graphArea.ymin-yjump*i);
      context.lineTo(graphArea.xmax, graphArea.ymin-yjump*i);
      context.stroke();
    }
  }
  context.setLineDash([]);


}

function yAxis() {
  // context.strokeStyle = '#FAFAFA'
  context.beginPath();
  context.moveTo(graphArea.xmin, graphArea.ymin);
  context.lineTo(graphArea.xmin, graphArea.ymax-14);
  context.stroke();
}

function ylabel(array, grid = true) {
  // context.fillStyle = '#FAFAFA'
  context.textAlign = "center"
  context.font = '14px Nunito';

  let jump = (graphArea.xmax - graphArea.xini - (array.length*5))/array.length

  for (let i = 0; i < array.length; i++) {
    context.fillText(array[i].slice(0, 3), xnormalized(array, i), graphArea.yini);

    if (grid && i>0) {
      context.beginPath();
      context.setLineDash([5, 15]);
      context.moveTo(xnormalized(array, i), graphArea.ymin);
      context.lineTo(xnormalized(array, i), graphArea.ymax);
      context.stroke();
    }
  }
  context.setLineDash([]);
}

function drawLine(array) {
  context.strokeStyle = '#EFB92E'
  context.lineWidth = 5;
  context.lineCap = 'round';

  for (let i = 0; i<month.length-1; i++) {
    context.beginPath();
    context.moveTo(xnormalized(array, i), ynormalized(array, i));
    context.lineTo(xnormalized(array, i+1), ynormalized(array, i+1));
    context.stroke();
  }
}

var gridx= true
var gridy = false

function drawGraphicOrder() {
  resizeGraphic()

  xAxis()
  xlabel(orderData, 5, gridx)
  yAxis()
  ylabel(month, gridy)
  drawLine(orderData)
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
  gridx = !gridx
  drawGraphicOrder()
  if (gridx) {
    window.document.querySelector('.markA').classList.add('on')
  } else {
    window.document.querySelector('.markA').classList.remove('on')
  }
}

function handleChangeGridV() {
  gridy = !gridy
  drawGraphicOrder()
  if (gridy) {
    window.document.querySelector('.markB').classList.add('on')
  } else {
    window.document.querySelector('.markB').classList.remove('on')
  }
}

