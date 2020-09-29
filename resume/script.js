let production = 80
let textuse = window.document.querySelector(".useproductiontext")
let progressbar = document.querySelector("#useproduction")
function decrementproduction() {
  let temp = production - 5
  if (temp > 0){
    production -=5;
    textuse.innerHTML = `${production.toFixed(2)}%`
    progressbar.value = production
  } else {
    production = 1
    textuse.innerHTML = `${production.toFixed(2)}%`
    progressbar.value = production
  }
}
function incrementproduction() {
  let temp = production + 5
  if (temp <= 100){
    production +=5;
    textuse.innerHTML = `${production.toFixed(2)}%`
    progressbar.value = production
  } else {
    production = 100
    textuse.innerHTML = `${production.toFixed(2)}%`
    progressbar.value = production
  }
}




let textorder = window.document.querySelector(".doingorder")
let progressorder = document.querySelector("#useorder")
let order = 20
let ordertotal = 50
let jumpOrder = 5
function decrementorder() {
  let temp = order - jumpOrder
  if (temp > 0){
    order -=jumpOrder;
    textorder.innerHTML = `${order} => ${(order*100/ordertotal).toFixed(2)}%`
    progressorder.value = order*100/ordertotal
  } else {
    order = 1
    textorder.innerHTML = `${order} => ${(order*100/ordertotal).toFixed(2)}%`
    progressorder.value = order*100/ordertotal
  }
}
function incrementorder() {
  let temp = order + jumpOrder
  if (temp <= ordertotal){
    order +=jumpOrder;
    textorder.innerHTML = `${order} => ${(order*100/ordertotal).toFixed(2)}%`
    progressorder.value = order*100/ordertotal
  } else {
    order = ordertotal
    textorder.innerHTML = `${order} => ${(order*100/ordertotal).toFixed(2)}%`
    progressorder.value = order*100/ordertotal
  }
}


let product = 20
let textProduct = window.document.querySelector(".textStokProduct")
let progressProduct = document.querySelector("#stokProduct")
function decrementStokProduct() {
  let temp = product - 5
  if (temp > 0){
    product -=5;
    textProduct.innerHTML = `${product.toFixed(2)}%`
    progressProduct.value = product
  } else {
    product = 1
    textProduct.innerHTML = `${product.toFixed(2)}%`
    progressProduct.value = product
  }
}
function incrementStokProduct() {
  let temp = product + 5
  if (temp <= 100){
    product +=5;
    textProduct.innerHTML = `${product.toFixed(2)}%`
    progressProduct.value = product
  } else {
    product = 100
    textProduct.innerHTML = `${product.toFixed(2)}%`
    progressProduct.value = product
  }
}


let hwe = 60
let text = window.document.querySelector(".textInputProduct")
let progress = document.querySelector("#inputProduct")
function decrementInputProduct() {
  let temp = hwe - 5
  if (temp > 0){
    hwe -=5;
    text.innerHTML = `${hwe.toFixed(2)}%`
    progress.value = hwe
  } else {
    hwe = 1
    text.innerHTML = `${hwe.toFixed(2)}%`
    progress.value = hwe
  }
}
function incrementInputProduct() {
  let temp = hwe + 5
  if (temp <= 100){
    hwe +=5;
    text.innerHTML = `${hwe.toFixed(2)}%`
    progress.value = hwe
  } else {
    hwe = 100
    text.innerHTML = `${hwe.toFixed(2)}%`
    progress.value = hwe
  }
}