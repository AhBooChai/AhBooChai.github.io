window.onload = function(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3000/api/cameras/';

    xhr.open('GET', url);

    xhr.onload = function(){
        if(this.status == 200) {
            let cameras = JSON.parse(this.response);
            for(let i in cameras) {
                let divOne = document.createElement('div');
                let divTwo = document.createElement('div');
                let cardImage = document.createElement('img');
                let cardBody = document.createElement('div');
                let name = document.createElement('h5');
                let price = document.createElement('h5');
                let productInfo = document.createElement('a');

                cardImage.src = `${cameras[i].imageUrl}`;
                name.textContent = `${cameras[i].name}`;
                price.textContent = `$${cameras[i].price / 100}.00`;
                productInfo.innerHTML = 'Product info';
                productInfo.href = 'product.html?productId=' + `${cameras[i]._id}`;

                cardBody.appendChild(name);
                cardBody.appendChild(price);
                cardBody.appendChild(productInfo);

                divTwo.appendChild(cardImage);
                divTwo.appendChild(cardBody);
                
                divOne.appendChild(divTwo);

                document.getElementById('productList').appendChild(divOne);

                divOne.classList.add('col-12', 'col-md-6', 'col-lg-4');
                divTwo.classList.add('card', 'm-4', 'mb-lg-0');
                cardImage.classList.add('card-img-top');
                cardBody.classList.add('text-center');
                name.classList.add('text-center');
                price.classList.add('text-center');
                productInfo.classList.add('btn', 'btn-primary', 'm-3', 'stretched-link');
                
            } if(this.status == 404) {
                document.getElementById('productList').innerHTML = "404: Document Not Found!";
            }
        }
    }
    xhr.send();
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        totalItemsInCart.textContent =  productNumbers;
    }
}

onLoadCartNumbers();









