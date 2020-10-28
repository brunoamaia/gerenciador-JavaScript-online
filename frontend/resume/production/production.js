let machinePageView = window.document.querySelector('.machines-container')
let machineStatus = [0, 1, 2, 1, 0, 2, 1, 0, 1]

function insertMachine() {
  let currentState = 0;
  let imageName = ''
  let stateMachine = ''

  for (let i = 0; i < machineStatus.length; i++) {
    currentState = machineStatus[i]
    if (currentState === 0) {
      imageName = '../../src/img/machine0.png'
      stateMachine = '<span class="mainutence">MANUTENÇÃO</span>'
    } else if (currentState === 1) {
      imageName = '../../src/img/machine1.png'
      stateMachine = '<span class="on">OPERANDO</span>'
    } else {
      imageName = '../../src/img/machine2.png'
      stateMachine = '<span class="off">OCIOSA</span>'
    }
    machinePageView.innerHTML += `
      <div class="">
        <figure class="machine">
          <img src="${imageName}" alt="Minha Figura">	
          <figcaption>Máquina ${i < 8 ? '0'+(i+2) : i+2}: ${stateMachine} </figcaption>
          </figure>
      </div>
    `
  }
}


window.onload = insertMachine();