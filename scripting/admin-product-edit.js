// import the producst array 
import { products } from "./index.js";

//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function () {

    function updateProductsDisplayed() {
        const productsContainer = document.getElementById('product-list-container');

        products.forEach((item, index) => {

            const productDivElement = document.createElement('div');

            productDivElement.classList.add('products');

            productDivElement.innerHTML = `
                <img class="photo" data-index="${index}" src="images/${item.name.toLowerCase()}.jpg" alt="">
                <p>${item.name}</p>`;

            productsContainer.appendChild(productDivElement);
            
        });
    }

    updateProductsDisplayed();

});