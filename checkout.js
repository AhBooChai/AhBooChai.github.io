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
            <i class="fa fa-minus-square" aria-hidden="true"></i>
            &nbsp;
            <span>${camera.qty}</span>
            &nbsp;
            <i class="fa fa-plus-square" aria-hidden="true"></i>
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

function deleteProduct (id){
    let list = JSON.parse(localStorage.getItem('productsInCart'));
    //step 2 check if the camera is already in the list
        //step 2a if the camera is already in the list, then update the quantity +1
        let index = list.findIndex(o => o.id == id);
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        localStorage.setItem('cartNumbers', productNumbers - list[index].qty);
        if (index != -1) {
            list.splice(index, 1);
        } 
        localStorage.setItem('productsInCart', JSON.stringify(list));
        
        displayCart();
        onLoadCartNumbers();

}

