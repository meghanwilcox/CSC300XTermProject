//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // the products to an array
    const products = [
        { name: "Test Product", cost: 1.00},
        { name: "Test Product", cost: 6.00},
        { name: "Test Product", cost: 3.00},
        { name: "Test Product", cost: 5.00},
        { name: "Test Product", cost: 4.00},
        { name: "Test Product", cost: 2.00},
        { name: "Test Product", cost: 7.00},
        { name: "Test Product", cost: 9.00},
        { name: "Test Product", cost: 8.00}
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

    function sortProductsLowToHigh() {
        const productsContainer = document.getElementById('product-list-container');

        productsContainer.innerHTML = "";
        
        products.sort((a, b) => a.cost - b.cost);

        updateProductsDisplayed();

    }

    function sortProductsHighToLow() {
        const productsContainer = document.getElementById('product-list-container');

        productsContainer.innerHTML = "";

        products.sort((a, b) => b.cost - a.cost);

        updateProductsDisplayed();
    }

    updateProductsDisplayed();

    const lowToHighButton = document.getElementById('low-to-high');
    lowToHighButton.addEventListener('click', sortProductsLowToHigh);

    const highToLowButton = document.getElementById('high-to-low');
    highToLowButton.addEventListener('click', sortProductsHighToLow);

});