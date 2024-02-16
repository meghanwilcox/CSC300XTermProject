//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // the products to an array
    const products = [
        { name: "Sweetheart Roast", cost: 15.59},
        { name: "Classic Light Roast", cost: 25.99},
        { name: "Classic Medium Roast", cost: 25.99},
        { name: "Classic Dark Roast", cost: 25.99},
        { name: "Single Shot of Espresso", cost: 4.00},
        { name: "Americano", cost: 7.25},
        { name: "Cortado", cost: 6.50},
        { name: "Macchiato", cost: 6.99},
        { name: "Capuccino", cost: 7.25}
    ];

    function updateProductsDisplayed() {
        const productsContainer = document.getElementById('product-list-container');
    
        products.forEach((item, index) => {
    
            const productDivElement = document.createElement('div');
    
            productDivElement.classList.add('products');
    
            // Wrap the image inside an anchor tag with a link to the product page
            productDivElement.innerHTML = `
                <a href="details.html"> 
                    <img class="photo" data-index="${index}" src="images/${item.name.toLowerCase()}.jpg" alt="">
                </a>
                <p>${item.name}<br>
                    $${item.cost.toFixed(2)}
                </p>
                <button class="add-to-cart" onclick="addToCart('${item.name}', ${item.cost})">Add to Cart 🛒 </button>
            `;
    
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