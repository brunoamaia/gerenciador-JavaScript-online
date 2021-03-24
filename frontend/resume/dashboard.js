function resized() {
  // console.log(window.innerWidth)
  insertOrderGraphic()
}

function insertOrderGraphic() {
  document.querySelector(".graphic-order-history").innerHTML = `
    <canvas id="graphic-order" width="${window.innerWidth*0.9}" height="200"></canvas>
  `
}

insertOrderGraphic()