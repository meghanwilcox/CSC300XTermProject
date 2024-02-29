// import the products array
import { products } from "./index.js";

document.addEventListener('DOMContentLoaded', function () {
    let isFormOpen = false;

    function updateProductsDisplayed(filtercategory) {
        
        const productsContainer = document.getElementById('product-list-container');

        productsContainer.innerHTML = '';

        products.forEach((item, index) => {

            if(filtercategory === item.category || filtercategory === "All"){
                const productDivElement = document.createElement('div');

                productDivElement.classList.add('products');
    
                productDivElement.innerHTML = `
                <div id="${index}">
                    <img class="photo" data-index="${index}" src="images/${item.name.toLowerCase()}.jpg" alt="">
                    <p>${item.name}</p>
    
                </div>`;
    
                productsContainer.appendChild(productDivElement);
            }

        });
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
                    <label>Product ID: ${products[index].productID}</label><br>
                    <label>Product Name: </label>
                    <input type="text" id="name" value="${products[index].name}"><br>
                    <label>Description: </label> <br>
                    <textarea id="description" rows="5" cols="30">${products[index].description}</textarea><br>
                    <label>Category: </label>
                    <select id="category" name="category">
                        <option value="Coffee" ${products[index].category === 'Coffee' ? 'selected' : ''}>Coffee</option>
                        <option value="Tea" ${products[index].category === 'Tea' ? 'selected' : ''}>Tea</option>
                        <option value="Accessories" ${products[index].category === 'Accessories' ? 'selected' : ''}>Accessories</option>
                    </select><br>
                    <label>Price: </label>
                    <input type="text" id="cost" value="${products[index].cost.toFixed(2)}"><br>
                    <label>Image Path: ${"images/" + products[index].name + ".jpg"}</label><br>
                    <input type="file" id="path" accept="image/*"><br>
                    <button id="edit-close">Close</button>
                    <input type="submit" id="edit-submit" class="submit" value="Submit">
                </form>`;

                clickedProductContainer.appendChild(clickedProductEditForm);

                // Set the flag to true, indicating that the form is open
                isFormOpen = true;

                // Add event listener to the Cancel button
                const cancelButton = document.getElementById('edit-close');
                cancelButton.addEventListener('click', function removeForm() {
                    clickedProductContainer.removeChild(clickedProductEditForm);
                    cancelButton.removeEventListener('click', removeForm);

                    // Set the flag back to false when the form is closed
                    isFormOpen = false;
                });
            }
        }
    }


    // Add click event listener to the document
    document.addEventListener('click', handleProductClick);

    // Add event listener to the select element
    const categoryFilterSelect = document.getElementById('category-filter-select');
    categoryFilterSelect.addEventListener('change', function () {
        const selectedCategory = categoryFilterSelect.value;
        updateProductsDisplayed(selectedCategory);
    });

    updateProductsDisplayed("All");

});