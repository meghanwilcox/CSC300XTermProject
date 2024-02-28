// import the products array
import { products, updateProducts } from "./index.js";

document.addEventListener('DOMContentLoaded', function () {
    let isFormOpen = false;

    function updateProductsDisplayed() {
        const productsContainer = document.getElementById('product-list-container');

        //NEW CODE
        productsContainer.innerHTML = '';

        products.forEach((item, index) => {

            const productDivElement = document.createElement('div');

            productDivElement.classList.add('products');

            productDivElement.innerHTML = `
            <div id="${index}">
                <img class="photo" data-index="${index}" src="images/${item.name.toLowerCase()}.jpg" alt="">
                <p>${item.name}</p>
            </div>`;

            productsContainer.appendChild(productDivElement);

        });
    }

    function handleSubmit(index) {
        return function () {
            // Retrieve the values from the input fields
            const newName = document.getElementById('name').value;
            const newCost = parseFloat(document.getElementById('cost').value);

            // Update the corresponding fields in the products array
            products[index].name = newName;
            products[index].cost = newCost;

            // Log the updated array (you can remove this in the final version)
            console.log(products[index].name);

            // Remove the form
            const clickedProductContainer = document.getElementById(index);
            const clickedProductEditForm = clickedProductContainer.querySelector('form');
            clickedProductContainer.removeChild(clickedProductEditForm);

            // Set the flag back to false when the form is closed
            isFormOpen = false;

            // Update the global array in index.js
            updateProducts(products);

            // NEW CODE
            updateProductsDisplayed();
        };
    }

    function handleProductClick(event) {
        const clickedElement = event.target;

        // Check if the form is open
        if (isFormOpen) {
            return;
        }

        // Check if the clicked element has the 'photo' class (you can adjust this based on your HTML structure)
        if (clickedElement.classList.contains('photo')) {
            // Retrieve the index from the data-index attribute
            const index = clickedElement.getAttribute('data-index');

            const clickedProductContainer = document.getElementById(index);

            // Check if the input form is already present
            if (!clickedProductContainer.querySelector('form')) {
                const clickedProductEditForm = document.createElement('div');

                clickedProductEditForm.innerHTML = `
                <form>
                    <label>Product Name: </label>
                    <input type="text" id="name" value="${products[index].name}"><br>

                    <label>Product Price: </label>
                    <input type="text" id="cost" value="${products[index].cost.toFixed(2)}"><br>
                    <button id="edit-cancel">Close</button>
                    <input type="submit" id="edit-submit" class="submit" value="Submit">
                </form>`;

                clickedProductContainer.appendChild(clickedProductEditForm);

                // Set the flag to true, indicating that the form is open
                isFormOpen = true;

                // Add event listener to the Cancel button
                const cancelButton = document.getElementById('edit-cancel');
                cancelButton.addEventListener('click', function removeForm() {
                    clickedProductContainer.removeChild(clickedProductEditForm);
                    cancelButton.removeEventListener('click', removeForm);

                    // Set the flag back to false when the form is closed
                    isFormOpen = false;
                });

                // Add event listener to the Submit button
                const submitButton = document.getElementById('edit-submit');
                submitButton.addEventListener('click', handleSubmit(index));
            }
        }
    }


    // Add click event listener to the document
    document.addEventListener('click', handleProductClick);

    updateProductsDisplayed();

});