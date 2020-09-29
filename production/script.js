let use = 80
let textuse = window.document.querySelector(".useproductiontext")
let progressbar = document.querySelector("#useprogress")

function increment() {
  if (use < 100) {
    use +=5;
    if (use <= 100) {
      textuse.innerHTML = `${use}`
      progressbar.value = use
    } else {
      textuse.innerHTML = `100`
      progressbar.value = use
    }
  }
}

function decrement() {
  if (use > 0){
    use -=5;
    if (use >= 0) {
      textuse.innerHTML = `${use}`
      progressbar.value = use
    } else {
      textuse.innerHTML = `0`
      progressbar.value = use
    }
  }
}