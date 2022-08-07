swal.fire('Bienvenido a mi E-commerce!');

const cards = document.getElementById("cards");

fetch("../API/data.json")
.then(response => response.json())
/* .then(data => console.log(data)); */
.then(products =>{
    products.forEach(product => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="col">
        <div class="card">
          <img src="${product.image}" class="card-img-top beastars01" alt="${product.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text card-price">${product.price}</p>
            <a class="btn btn-primary addToCart">Add to cart</a>
          </div>
        </div>
      </div>
        `;

        cards.append(card);
    });
})

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
	addToCartButton.addEventListener('click', addToCartClicked);
});

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
	for (let i = 0; i < elementsTitle.length; i++) {
		if (elementsTitle[i].innerText === cardTitle) {
		  let elementQuantity = elementsTitle[
			i
		  ].parentElement.parentElement.parentElement.querySelector(
			'.shoppingCartItemQuantity'
		  );
		  elementQuantity.value++;
		  updateShoppingCartTotal();
		  return;
		}
	}

	const shoppingCartRow = document.createElement('div');
	const shoppingCartContent = `
	<div class="row shoppingCartItem">
		<div class="col-6">
			<div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
				<img src=${cardImg} class="shopping-cart-image">
				<h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitle}</h6>
			</div>
		</div>
		<div class="col-2">
			<div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
				<p class="item-price mb-0 shoppingCartItemPrice">${cardPrice}</p>
			</div>
		</div>
		<div class="col-4">
			<div
				class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
				<input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
				<button class="btn btn-danger buttonDelete" type="button">X</button>
			</div>
		</div>
	</div>`;
	shoppingCartRow.innerHTML = shoppingCartContent;
	shoppingCartItemsContainer.append(shoppingCartRow);
  
	shoppingCartRow
	  .querySelector('.buttonDelete')
	  .addEventListener('click', removeShoppingCartItem);
  
	shoppingCartRow
	  .querySelector('.shoppingCartItemQuantity')
	  .addEventListener('change', quantityChanged);
  
	updateShoppingCartTotal();
}
//Shoping cart total value ($)
function updateShoppingCartTotal(){
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
	updateShoppingCartTotal();
}
  
function quantityChanged(event) {
	const input = event.target;
	input.value <= 0 ? (input.value = 1) : null;
	updateShoppingCartTotal();
}
  
function comprarButtonClicked() {
	shoppingCartItemsContainer.innerHTML = '';
	updateShoppingCartTotal();
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
 