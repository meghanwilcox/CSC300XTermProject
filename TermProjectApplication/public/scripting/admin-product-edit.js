// import the products array
import { products } from "./index.js";

//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    let isFormOpen = false;

    //function: updateProductsDisplayed: this function updates the products displayed on the site, filtering for a specified categroy
    function updateProductsDisplayed(filtercategory) {
        //get the container in which the products will go, and clear the container of existing content
        const productsContainer = document.getElementById('product-list-container');
        productsContainer.innerHTML = '';

        //loop through thee products in the global array, and select only the products of the correct category to be displayed on the page
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

    //function: handleProductClick: this function reacts to the user clicking a product, and brings up a menu for them to edit the product
    function handleProductClick(event) {
        const clickedElement = event.target;

        // Check if the form is open
        if (isFormOpen) {
            return;
        }

        // Check if the clicked element has the 'photo' class
        if (clickedElement.classList.contains('photo')) {

            // Retrieve the index from the data-index attribute
            const index = clickedElement.getAttribute('data-index');
            const clickedProductContainer = document.getElementById(index);

            // Check if the input form is already present
            if (!clickedProductContainer.querySelector('form')) {
                const clickedProductEditForm = document.createElement('div');

                //apply the form html to the element
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

                // Add event listener to the close button to close the form
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

    // Add event listener to the select element to select a category
    const categoryFilterSelect = document.getElementById('category-filter-select');
    categoryFilterSelect.addEventListener('change', function () {
        const selectedCategory = categoryFilterSelect.value;
        updateProductsDisplayed(selectedCategory);
    });

    //update the inital page to display all the products
    updateProductsDisplayed("All");

});