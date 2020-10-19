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
            productPrice.textContent = `$${camera.price / 100}.00`;
            camera.inCart = 0;

            function addItems(){
                let customisation = Object.values(camera.lenses);
                for(let i = 0; i < customisation.length; i++){
                    let element = document.createElement('option');
                    element.innerText = '' + customisation[i];
                    dropDownMenu.appendChild(element);
                }
            }
            addItems();
        } else if (this.status === 404){
            document.getElementById('camera').innerHTML = '404: Document not found!';
        }
    }
    xhr.send();
}
getProductInfo();

let addToCart = document.getElementById('addToCart');

addToCart.addEventListener('click', () => {
    cartNumbers(camera);
})

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.getElementById('totalItemsInCart').textContent = productNumbers;
    }
}

function cartNumbers(camera){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('totalItemsInCart').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.getElementById('totalItemsInCart').textContent = 1;
    }   
    addItemToCart(camera);
}

onLoadCartNumbers();

function addItemToCart(camera){
console.log('addItemToCart');
    camera = {
        id : camera._id,
        qty: 1,
        price: camera.price,
        name: camera.name,
        image: camera.imageUrl
    }
    //step 1 retrieve the productlist in localStorage 
    let list = JSON.parse(localStorage.getItem('productsInCart'));
    console.log(list);
    //step 2 check if the camera is already in the list
    if(list.length == 0){
        list.push(camera);
    } else {
        //step 2a if the camera is already in the list, then update the quantity +1
        let index = list.findIndex(o => o.id == camera.id);
        console.log(index);
        if (index != -1) {
            list[index].qty += 1;
        } else {
                //step 2b otherwise add the camera as a new entry
            list.push(camera);
        }
    } 
    console.log(list);
localStorage.setItem('productsInCart', JSON.stringify(list));
}
