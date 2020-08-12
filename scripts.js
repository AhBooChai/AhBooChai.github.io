window.onload = function(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3000/api/cameras';

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
                let addToCart = document.createElement('button');
                let productInfo = document.createElement('a');

                cardImage.src = `${cameras[i].imageUrl}`;
                name.textContent = `${cameras[i].name}`;
                price.textContent = `$${cameras[i].price / 100}.00`;
                addToCart.textContent = 'Add to cart';
                productInfo.innerHTML = 'Product info';
                productInfo.href = url + `${cameras[i]._id}`;

                cardBody.appendChild(name);
                cardBody.appendChild(price);
                cardBody.appendChild(productInfo);
                cardBody.appendChild(addToCart);

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
                addToCart.classList.add('btn', 'btn-primary', 'm-3');
                productInfo.classList.add('btn', 'btn-primary', 'm-3', 'stretched-link');




            } if(this.status == 404) {
                document.getElementById('productList').innerHTML = "404: Document Not Found!";
            }
        }
    }
    xhr.send();
}

___________________________________________________________________________________________________________________________________
let cameraDisplay = document.getElementById('camera_display');

document.getElementsByClassName('stretched-link').addEventListener('click', ()=>{
    
    getProductId = function(){
        let urlString = window.location.href;
        let url = new URL(urlString);
        let id = url.searchParams.get('id');
        return id;
    }

    getProductInfo = function(){
        let xhr = new XMLHttpRequest();
        let newURL = 'http://localhost:3000/api/cameras' + getProductId();

        xhr.open('GET', newURL);

        xhr.onload = function(){
            if(this.status == 200){
                let camera = JSON.parse(this.response);
                
                let container = document.createElement('div');
                let title = document.createElement('h1');
                let productImage = document.createElement('img');
                let productDescription = document.createElement('p');
                let productPrice = document.createElement('p');
                let dropDownMenu = document.createElement('select');
                let addToCard = document.createElement('button');

                title.textContent = `${name}`;
                productImage.src = `${imageUrl}`;
                productDescription.textContent = `${description}`;
                productPrice.textContent = `$${price / 100}.00`;
                
                let customization = `${- lenses}`;

                document.getElementsByTagName('select').setAttribute('id', 'dropDownMenu');

                for (let i in customization){
                    dropDownMenu.options[dropDownMenu.options.length] = new Option(customization[i], i);
                }

                container.appendChild(title);
                container.appendChild(productImage);
                container.appendChild(productDescription);
                container.appendChild(productPrice);
                container.appendChild(dropDownMenu);
                container.appendChild(addToCart);

                container.classList.add('text-center');
                addToCart.classList.add('btn', 'btn-primary');

                cameraDisplay.innerHTML = container;

            }
            if(this.status == 404){
                document.getElementById('productList').innerHTML = "404: Document Not Found!";
            }
        }
    }
    xhr.send();
});