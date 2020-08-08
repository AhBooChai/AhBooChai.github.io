window.onload = function(){
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3000/api/cameras';

    xhr.open('GET', url +'')
    xhr.onload = function(){
        if(this.status == 200) {
            let camera = JSON.parse(this.response);

            let container = document.createElement('div');

            let row = document.createElement('div');
            let col = document.createElement('div');
            let h1 = document.createElement('h1');
            let image = document.createElement('img');
            let price = document.createElement('p');
            let description = document.createElement('p');
            let option = document.createElement('select');

            h1.textContent = `${camera.name}`;
            image.src = `${camera.imageUrl}`;
            price.textContent = `${camera.price / 100}`;
            description.textContent = `${camera.description}`;

            // to populate the dropdown menu with the options of lenses

            let dropDownMenu = document.getElementById('dropdown');
            



        }
    }
}