function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.getElementById('totalItemsInCart').textContent = productNumbers;
    }
}
onLoadCartNumbers();

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById('products');
    if (cartItems && productContainer) {
        let output = '';
        let total = 0;
        cartItems.forEach(function (camera) {
            output += `
            <tr>
            <td>
            <button onclick="deleteProduct('${camera.id}')"><i class="fa fa-window-close" aria-hidden="true" id='delelte'></i></button>
            <img src="${camera.image}" width='50px' height='50px'>
            <span>${camera.name}</span>
            </td>
            <td>$${camera.price / 100}.00</td>
            <td>
            <i onclick="decreaseQuantity('${camera.id}')" class="fa fa-minus-square" aria-hidden="true"></i>
            &nbsp;
            <span>${camera.qty}</span>
            &nbsp;
            <i onclick="increaseQuantity('${camera.id}')" class="fa fa-plus-square" aria-hidden="true"></i>
            </td>
            <td>$${camera.qty * (camera.price / 100)}.00</td>
            </tr>
            `;
            total += camera.qty * (camera.price / 100);

        });
        productContainer.innerHTML = output;

        let displayTotal = document.getElementById('total');
        displayTotal.innerHTML = `$${total}.00`;
    }
    
}
displayCart();

function deleteProduct(id){
    
    let list = JSON.parse(localStorage.getItem('productsInCart'));
    //step 2 check if the camera is already in the list
        //step 2a if the camera is already in the list, then update the quantity +1
        let index = list.findIndex(o => o.id == id);
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        localStorage.setItem('cartNumbers', productNumbers - list[index].qty);
        if (index != -1) {
            console.log('deleting');
            list.splice(index, 1);
            console.log(list);
        } 
        localStorage.setItem("productsInCart", JSON.stringify(list))

        displayCart();
        onLoadCartNumbers();

}

function increaseQuantity(id){
    let list = JSON.parse(localStorage.getItem('productsInCart'));
    let index = list.findIndex(o => o.id ==id);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(index != -1){
        list[index].qty += 1;
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        localStorage.setItem('cartNumbers', productNumbers + 1 );
    }
    localStorage.setItem('productsInCart', JSON.stringify(list));
    displayCart();
    onLoadCartNumbers();

}

function decreaseQuantity(id){
    let list = JSON.parse(localStorage.getItem('productsInCart'));
    let index = list.findIndex(o => o.id ==id);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(index != -1){
        if (list[index].qty == 1) {
            console.log(list[index].qty);
            localStorage.setItem('cartNumbers', productNumbers - 1 );
            list.splice(index, 1);

        } else {
            list[index].qty -= 1;
            let productNumbers = localStorage.getItem('cartNumbers');
            productNumbers = parseInt(productNumbers);
            localStorage.setItem('cartNumbers', productNumbers - 1 );
        }    
    }
    localStorage.setItem('productsInCart', JSON.stringify(list));
    displayCart();
    onLoadCartNumbers();
}




function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

let checkOut = document.getElementById('checkoutButton');
checkOut.addEventListener('click', (e) => {
    console.log('submitting');
    e.preventDefault();
    let productID = [];
    let contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('state').value
    }

    if(contact.firstName != '' && contact.lastName != '' 
    &&  ValidateEmail(contact.email) != false && address != '' && city != ''){
    let productsInCart = localStorage.getItem('productsInCart');
    productsInCart = JSON.parse(productsInCart);

    productsInCart.forEach((product) => {
        productID.push(product.id)
    });
    console.log(productID);


    const xhr = new XMLHttpRequest();

// listen for `load` event
    xhr.onload = () => {

    // print JSON response
    if (xhr.status >= 200 && xhr.status < 300) {
        // parse JSON
        const response = xhr.responseText;
        console.log(response);
        window.location.href = 'confirmation.html?total=' + document.getElementById('total').innerHTML + '&response=' + response;
        
        
    }
};



// open request
xhr.open('POST', 'http://localhost:3000/api/cameras/order');

// set `Content-Type` header
xhr.setRequestHeader('Content-Type', 'application/json');


// send rquest with JSON payload
xhr.send(JSON.stringify({ contact: contact, products: productID }));
    } else {
        alert('Ensure all the fields are valid!');
    }
})