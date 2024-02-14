//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // the products to an array
    const products = [
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 5.00}
    ];

    function updateProductsDisplayed() {
        const productsContainer = document.getElementById('product-list-container');

        products.forEach((item, index) => {

            const productDivElement = document.createElement('div');

            productDivElement.classList.add('products');

            productDivElement.innerHTML = `
            <img class="photo" data-index="${index}" src="images/${item.name.toLowerCase()}.jpg" alt="">
            <p>${item.name}<br>
                $${item.cost.toFixed(2)}
            </p>`;

            productsContainer.appendChild(productDivElement);
        });
    }

    updateProductsDisplayed();

});