// import the producst array 
import { products } from "./index.js";

//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function () {

    function updateProductsDisplayed() {
        const productsContainer = document.getElementById('product-list-container');

        products.forEach((item, index) => {

            if (item.category === "accessories") {
                const productDivElement = document.createElement('div');

                productDivElement.classList.add('products');

                productDivElement.innerHTML = `
                    <img class="photo" data-index="${index}" src="images/${item.name.toLowerCase()}.jpg" alt="">
                    <p>${item.name}<br>
                        $${item.cost.toFixed(2)}
                    </p>`;

                productsContainer.appendChild(productDivElement);
            }

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