swal.fire('Bienvenido a mi E-commerce!');
const cards = document.getElementById("cards");
let components = [];
const fetchS = async() => {
	const response = await fetch("../API/data.json");
	components = await response.json();
	componentsRender(components);
}
fetchS();
const componentsRender = (products) => {
	for (let productZ of products){
		const card = document.createElement("div");
		card.innerHTML = `
		<div class="col">
		<div class="card">
		  <img src="${productZ.image}" class="card-img-top beastars01" alt="${productZ.name}">
		  <div class="card-body text-center">
			<h5 class="card-title">${productZ.name}</h5>
			<p class="card-text card-price">$${productZ.price}</p>
			<a class="btn btn-primary addToCart" data-id="${productZ.id}" data-price= "${productZ.price}" data-name = "${productZ.name}" data-image = "${productZ.image}" data-quantity="${productZ.quantity}">Add to cart</a>
		  </div>
		</div>
	  </div>
		`;
	
		cards.append(card);
	}
	buttons();
}


let cart = [];
const buttons = () => {
	const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
	addToShoppingCartButtons.forEach((addToCartButton) => {
		addToCartButton.addEventListener('click', e =>{
			let idProducto = e.target.dataset.id;
			let nombreProducto = e.target.dataset.name;
			let precioProducto = e.target.dataset.price;
			let linkImagen = e.target.dataset.image;
			let cantidad = e.target.dataset.quantity
			let encontrarIndex = cart.findIndex(el => el.id == e.target.dataset.id);
			if (encontrarIndex == -1){
				cart.push({"id":idProducto,"nombre":nombreProducto,"precio":precioProducto,"imagen":linkImagen,"cantidad":cantidad});
			}
			else{
				cart[encontrarIndex].cantidad++;
			}
			showCart(cart);
		});
	});
}

const cargarTotal = () => {
	let totalHTML = document.getElementById('shoppingCartTotal');
	let total = 0;
	cart.forEach(el => total += (el.cantidad*el.precio));
	totalHTML.innerHTML = `$${total}`;
}
const eliminarProducto = () => {
	let buttonDelete = document.querySelectorAll('.buttonDelete');
	buttonDelete.forEach(buttonDelete => {
		buttonDelete.addEventListener('click', (e) => {
			cart.splice(el => el.id == e.target.dataset.id, 1);
			cargarTotal();
			buttonDelete.parentElement.parentElement.parentElement.remove();
			localStorage.setItem('cart',JSON.stringify(cart));
		})
	})
}
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');
const showCart = (producto) => {
	let html = ``;
	for (let productos of producto){
		let content = `<div class="row shoppingCartItem">
		<div class="col-6">
			<div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
				<img src="${productos.imagen}" class="shopping-cart-image">
				<h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${productos.nombre}</h6>
			</div>
		</div>
		<div class="col-2">
			<div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
				<p class="item-price mb-0 shoppingCartItemPrice">${productos.precio}</p>
			</div>
		</div>
		<div class="col-4">
			<div
				class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
				<input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="${productos.cantidad}" data-id="${productos.id}">
				<button class="btn btn-danger buttonDelete" type="button" data-id="${productos.id}">X</button>
			</div>
		</div>
	</div>`;
	html += content;
	}
	localStorage.setItem('cart',JSON.stringify(producto));
	shoppingCartItemsContainer.innerHTML = `
	<div>
		${html}
	</div>`
	
	reSearch();
	cargarTotal();
	eliminarProducto();
}
const reSearch = () =>{
	let shoppingQuantity = document.querySelectorAll('.shoppingCartItemQuantity');
	shoppingQuantity.forEach(shoppingQuantityZ => {
		shoppingQuantityZ.addEventListener('input', e => {
			/* cart[e.target.dataset.id].cantidad = e.target.value; */
			for (let i = 0; i<cart.length; i++){
				if (cart[i].id == e.target.dataset.id){
					cart[i].cantidad = e.target.value;
				}
			}
			cargarTotal();
			localStorage.setItem('cart',JSON.stringify(cart));
		})
	})
}
if (localStorage.getItem('cart')){
	cart = JSON.parse(localStorage.getItem('cart'));
	showCart(cart);
}
let botonSwal = document.getElementById("btnCompra");

botonSwal.addEventListener("click", () => {
  Swal.fire({
    title: "Listo!",
    text: "Comprado con exito",
    icon: "success",
    confirmButtonText: "ok",
  });
  shoppingCartItemsContainer.innerHTML = "";
  cart.splice(0,12);
  localStorage.setItem('cart',JSON.stringify(cart))
  cargarTotal();
});

/*

const comprarButton = document.querySelector('.comprarButton');

comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');
//Add to cart button
function addToCartClicked(event) {
	const button = event.target;
	const card = button.closest('.card');
	
	const cardTitle = card.querySelector('.card-title').textContent;
	const cardPrice = card.querySelector('.card-price').textContent;
	const cardImg = card.querySelector('.card-img-top').src;
	addItemToShoppingCart(cardTitle, cardPrice, cardImg);
}

//Add to cart HTML
function addItemToShoppingCart(cardTitle, cardPrice, cardImg){
	const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
		'shoppingCartItemTitle'
	);
	let cantidad = 0;
	for (let i = 0; i < elementsTitle.length; i++) {
		if (elementsTitle[i].innerText === cardTitle) {
		  let elementQuantity = elementsTitle[
			i
		  ].parentElement.parentElement.parentElement.querySelector(
			'.shoppingCartItemQuantity'
		  );
		  elementQuantity++;
		  updateShoppingCartTotal(cart);
		  return;
		}
	}
	let encontrarIndex = cart.findIndex(el => {
		el.card === cardTitle
	});
	if (encontrarIndex == -1){
		cart.push({"card": cardTitle, "price": cardPrice, "img": cardImg, "quantity": 1});
	}
	else{
		cart[encontrarIndex].quantity++;
		console.log(cart[encontrarIndex].quantity);
		localStorage.clear();
	}
	console.log(encontrarIndex);
	console.log(cart);
	localStorage.setItem('cart',JSON.stringify(cart));
	const shoppingCartRow = document.createElement('div');
	let content = "";
	cart.forEach(el => {
		content = `
		<div class="row shoppingCartItem">
		<div class="col-6">
			<div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
				<img src=${el.img} class="shopping-cart-image">
				<h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${el.card}</h6>
			</div>
		</div>
		<div class="col-2">
			<div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
				<p class="item-price mb-0 shoppingCartItemPrice">${el.price}</p>
			</div>
		</div>
		<div class="col-4">
			<div
				class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
				<input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
				<button class="btn btn-danger buttonDelete" type="button" data-id="${el.id}">X</button>
			</div>
		</div>
	</div>`;
	})
	shoppingCartRow.innerHTML = content;
	shoppingCartItemsContainer.append(shoppingCartRow);
  
	shoppingCartRow
	  .querySelector('.buttonDelete')
	  .addEventListener('click', removeShoppingCartItem);
  
	shoppingCartRow
	  .querySelector('.shoppingCartItemQuantity')
	  .addEventListener('change', quantityChanged);
  
	updateShoppingCartTotal(cart);
}

//Shoping cart total value ($)
let cart = [];
if (localStorage.getItem('cart')){
	cart = JSON.parse(localStorage.getItem('cart'));
}
console.log(cart);
function updateShoppingCartTotal(cart){
	let total = 0;
	const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
	const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

	shoppingCartItems.forEach((shoppingCartItem) => {
		const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
		const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''));
		const shoppingCartQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
		const shoppingCartItemQuantity = Number(shoppingCartQuantityElement.value);
		total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
	});
	shoppingCartTotal.innerHTML = `$${total.toFixed(0)}`;
}
function removeShoppingCartItem(event) {
	const buttonClicked = event.target;
	buttonClicked.closest('.shoppingCartItem').remove();
	updateShoppingCartTotal(cart);
}
  
function quantityChanged(event) {
	const input = event.target;
	input.value <= 0 ? (input.value = 1) : null;
	updateShoppingCartTotal(cart);
}
  
function comprarButtonClicked() {
	shoppingCartItemsContainer.innerHTML = '';
	updateShoppingCartTotal(cart);
}

let botonSwal = document.getElementById("btnCompra");

botonSwal.addEventListener("click", () => {
  Swal.fire({
    title: "Listo!",
    text: "Comprado con exito",
    icon: "success",
    confirmButtonText: "ok",
  });
});
  */