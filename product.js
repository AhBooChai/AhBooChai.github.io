let productImage = document.getElementById('productImage');
let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productDescription = document.getElementById('productDescription');
let dropDownMenu = document.getElementById('customisation');
let camera;

getProductID = function(){
    let url = window.location.href;
    let newURL = new URL(url);
    let id = newURL.searchParams.get('productId');
    return id;
}

getProductInfo = function(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3000/api/cameras/' + getProductID();

    xhr.open('GET', url);

    xhr.onload = function(){
        if(this.status === 200){
            camera = JSON.parse(this.response);

            productImage.src = `${camera.imageUrl}`;
            productName.textContent = `${camera.name}`;
            productDescription.textContent = `${camera.description}`;
            productPrice.textContent = `$${camera.price/100}.00`;
            
            function addItems(){
                let customisation = Object.values(camera.lenses);
                for(let i = 0; i < customisation.length; i++){
                    let element = document.createElement('option');
                    element.innerText = '' + customisation[i];
                    dropDownMenu.appendChild(element);
                }
            }
            addItems();
        }
        else if (this.status === 404){
            document.getElementById('cameraDisplay').innerHTML = '404 : Document not found!';
        }
    }
    xhr.send();
}
getProductInfo();

//------------------------------------------Add to Cart ----------------------------------------------------
let addToCart = document.getElementById('addToCart');
let totalItemsInCart = document.getElementById('totalItemsInCart');

addToCart.addEventListener('click', () => {
    cartNumbers(camera);
});

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        totalItemsInCart.textContent =  productNumbers;
    }
}

function cartNumbers(camera){
    console.log('The product clicked is', camera);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1); 
        totalItemsInCart.textContent = productNumbers + 1;
         
    } else {
        localStorage.setItem('cartNumbers', 1);
        totalItemsInCart.textContent =  1;
    }

    setItems(camera);
}

function setItems(camera){
    let cartItem = localStorage.getItem('productsInCart');
    cartItem = JSON.parse(cartItem);
    console.log('My cart items are', cartItem);
    cartItem = {
        [camera.name]: camera
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItem));
}
onLoadCartNumbers();





 