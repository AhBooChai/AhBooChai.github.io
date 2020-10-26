let url = window.location.href;
let newURL = new URL(url);
let response = JSON.parse(newURL.searchParams.get('response'));
let total = (newURL.searchParams.get('total'));
let confirmation = document.getElementById('confirmation');
console.log(response);


confirmation.innerHTML = `Your order ID is : ${response.orderId}, the total of your purchase is ${total}`;