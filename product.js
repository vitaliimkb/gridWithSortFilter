function getProducts(url) {
    fetch(url)
        .then(response => response.json())
        .then(product => {
            document.getElementById("products").innerHTML = `
                 <div class="card my-5">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${product.image}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8 d-flex align-items-center">
                            <div class="card-body">
                                <h4 class="card-title">${product.title}</h4>
                                <p class="text-muted">${product.category}</p>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text text-primary">${product.price}$</p>
                            </div>
                        </div>
                    </div>
                </div>
             `
        });
}
let params = new URLSearchParams(window.location.search);
const id = params.get("id");
getProducts(`https://fakestoreapi.com/products/${id}`);