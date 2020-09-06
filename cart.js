function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        totalItemsInCart.textContent =  productNumbers;
    }
}

onLoadCartNumbers();