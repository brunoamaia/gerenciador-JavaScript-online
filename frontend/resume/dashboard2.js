let dinamicData = Array.from(Array(10).fill(Number(Math.random().toFixed(2))))

function createData() {
  dinamicData.push(Number(Math.random().toFixed(2)))
  dinamicData.shift()
  document.querySelector('.view-data').innerHTML = dinamicData

  setTimeout(createData, 200)
}


var ajax = new XMLHttpRequest();
ajax.open("GET", "painel.html", false);
ajax.send();
document.querySelector('.animated-graphic').innerHTML = ajax.responseText


function resizeDinamicGraphic() {
  console.log(window.innerWidth * 0.9)
}



createData()