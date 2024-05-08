let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let ListProductHTML = document.querySelector('.ListProduct');

let ListProducts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showChart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        ListProducts = data;
        console.log(ListProducts);
    })
}
initApp