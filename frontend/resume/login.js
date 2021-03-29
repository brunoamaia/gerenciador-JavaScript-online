var showLogin = false
function handleShowLogin() {
  showLogin = !showLogin
  if (showLogin) {
    window.document.querySelector('.login-modal').classList.add('enable')
  } else {
    window.document.querySelector('.login-modal').classList.remove('enable')
  }
}



function notification() {
  alert('Função indisponível no momento!!!')
}
