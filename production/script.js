let use = 80
let textuse = window.document.querySelector(".useproductiontext")
let progressbar = document.querySelector("#useprogress")

function increment() {
  let temp = use + 5
  if (temp <= 100){
    use +=5;
    textuse.innerHTML = `${use}%`
    progressbar.value = use
  } else {
    use = 100
    textuse.innerHTML = `${use}%`
    progressbar.value = use
  }
}

function decrement() {
  let temp = use - 5
  if (temp > 0){
    use -=5;
    textuse.innerHTML = `${use}%`
    progressbar.value = use
  } else {
    use = 1
    textuse.innerHTML = `${use}%`
    progressbar.value = use
  }
}