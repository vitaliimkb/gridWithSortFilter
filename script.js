let productsArray = [];

function getProducts(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            productsArray = data;
            showProducts(productsArray)
        });
}
getProducts('https://fakestoreapi.com/products/');


function showProducts(products) {
    const grid = document.getElementById("products");
    grid.innerHTML = "";
    products.forEach(product => {
        grid.innerHTML += `
                <div class="col">
                    <div class="card">
                        <img src="${product.image}" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="text-muted">${product.category}</p>
                            <p class="card-text">${product.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <p>${product.price}$</p>
                            <a class="btn btn-primary" href="product.html?id=${product.id}">Detail</a>
                        </div>
                    </div>
                </div>
            `
    });
}

showProducts(productsArray)

document.getElementById("sort-select").addEventListener("change", function () {
    if (this.value === "asc") {
        productsArray.sort(function (a, b) {
            return a.price - b.price;
        })
    }
    else if (this.value === "desc") {
        productsArray.sort(function (a, b) {
            return b.price - a.price;
        })
    }
    else {
        productsArray.sort(function (a, b) {
            return a.id - b.id;
        })
    }
    showProducts(productsArray)
})

function getCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(data => {
            showCategories(data)
        });
}
getCategories();
function showCategories(categories) {
    categories.forEach(category => {
        document.getElementById("filter-select").innerHTML += `
        <option value="${category}">${capitalize(category)}</option>
    `
    })
}
function capitalize(title) {
    return title.charAt(0).toUpperCase() + title.slice(1)
}
document.getElementById("filter-select").addEventListener("change", function () {
    let url = `https://fakestoreapi.com/products/category/${this.value}`
    getProducts(url)
})