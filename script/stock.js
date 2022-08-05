const list = document.getElementById("list");

fetch("../API/data.json")
.then(response => response.json())
/* .then(data => console.log(data)); */
.then(products =>{
    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <p>id: ${product.id}</p>
            <hr/>
        `;

        list.append(li);
    });
})