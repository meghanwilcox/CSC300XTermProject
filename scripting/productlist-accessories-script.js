//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // the products to an array
    const products = [
        { name: "Kozy Kitty Mug", cost: 11.99},
        { name: "Catffeinated Coffee Mug", cost: 13.99},
        { name: "Ceramic Matching Mug Set", cost: 24.99},
        { name: "French Press", cost: 15.50},
        { name: "Cutie Cat Teabag Holder", cost: 4.00},
        { name: "Meow Meow Teapot", cost: 22.99},
        { name: "Coffee Grounds Scale", cost: 37.00},
        { name: "Coffee With Cattitude Mug", cost: 13.99},
        { name: "Adorable Kitty Mug With Lid & Spoon", cost: 15.99}
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