document.addEventListener('DOMContentLoaded', () => {
    const listProductHTML = document.querySelector('.listProduct');
    const listCartHTML = document.querySelector('.listCart');
    const iconCart = document.querySelector('.icon-cart');
    const iconCartSpan = document.querySelector('.icon-cart span');
    const body = document.querySelector('body');
    const closeCart = document.querySelector('.close');
    let products = [];
    let cart = [];

    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });
    closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    const addDataToHTML = () => {
        listProductHTML.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    };

    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('addCart')) {
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    });

    const addToCart = (product_id) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        if (positionThisProductInCart < 0) {
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        } else {
            cart[positionThisProductInCart].quantity += 1;
        }
        addCartToMemory();
        addCartToHTML();
    };

    const addCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addCartToHTML = () => {
        listCartHTML.innerHTML = ''; // Clear existing cart
        let totalQuantity = 0;
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            newItem.innerHTML = `
            <div class="image">
                <img src="${info.image}">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">$${info.price * item.quantity}</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${item.quantity}</span>
                <span class="plus">+</span>
            </div>`;
            listCartHTML.appendChild(newItem);
        });
        iconCartSpan.innerText = totalQuantity;
    };

    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
            changeQuantityCart(product_id, type);
        }
    });

    const changeQuantityCart = (product_id, type) => {
        let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
        if (positionItemInCart >= 0) {
            switch (type) {
                case 'plus':
                    cart[positionItemInCart].quantity += 1;
                    break;
                case 'minus':
                    if (cart[positionItemInCart].quantity > 1) {
                        cart[positionItemInCart].quantity -= 1;
                    } else {
                        cart.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToMemory();
        addCartToHTML();
    };

    const initApp = () => {
        fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            products = data;
            addDataToHTML();
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    };

    initApp();
});
