// import the products array
import { products } from "./index.js";

//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function() {

    function updateProductsDisplayed() {
        const productsContainer = document.getElementById('product-list-container');
    
        products.forEach((item, index) => {

            if(item.category === "Accessories"){
                const productDivElement = document.createElement('div');
    
                productDivElement.classList.add('products');
        
                // Wrap the image inside an anchor tag with a link to the product page
                productDivElement.innerHTML = ` 
                    <img class="photo" onclick="window.location.href='details.html'" data-index="${index}" src="images/${item.name.toLowerCase()}.jpg" alt="">
                    <p>${item.name}<br>
                        $${item.cost.toFixed(2)}
                    </p>
                    <button class="add-to-cart" onclick="addToCart('${item.name}', ${item.cost})">Add to Cart 🛒</button>
                `;
        
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



// Make a GET request to fetch featured products
fetch('http://localhost:3000/products/get-featured-products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch featured products');
        }
        return response.json();
    })
    .then(featuredProducts => {
        // Process the retrieved featured products
        console.log('Featured Products:', featuredProducts);
        // Here you can update your UI to display the featured products
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching featured products:', error);
        // Display an error message to the user
    });


    // Make a GET request to fetch products by category
function fetchProductsByCategory(category) {
    fetch(`http://localhost:3000/products/get-products-by-category?category=${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products by category');
            }
            return response.json();
        })
        .then(products => {
            // Process the retrieved products
            console.log(`Products in category '${category}':`, products);
            // Update your UI to display the products
            displayProducts(products);
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching products by category:', error);
            // Display an error message to the user
        });
}

// Function to fetch product details by ID
function fetchProductDetails(productId) {
    fetch(`http://localhost:3000/products/get-product?productID=${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            return response.json();
        })
        .then(product => {
            // Process the retrieved product details
            console.log('Product Details:', product);
            // Update your UI to display the product details
            displayProductDetails(product);
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching product details:', error);
            // Display an error message to the user
        });
}

// Function to get the user ID from the server
async function getUserId() {
    try {
        const response = await fetch('http://localhost:3000/auth/get-user-id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // You might need to include authentication headers or tokens if required
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user ID');
        }

        const userData = await response.json();
        return userData.userId;
    } catch (error) {
        console.error('Error getting user ID:', error);
        // Handle errors or return a default value
        return null;
    }
}

// Function to add a product to the cart
async function addToCart(productId, quantity = 1) {
    const userId = await getUserId(); // Get the user ID

    if (!userId) {
        console.error('User ID not available');
        // Handle the case where user ID is not available
        return;
    }

    const requestData = {
        userID: userId,
        productID: productId,
        quantity: quantity
    };

    try {
        const response = await fetch('http://localhost:3000/products/add-product-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        const responseData = await response.json();
        console.log('Product added to cart successfully:', responseData);
        // Optionally, you can update the UI to reflect the product addition to the cart
    } catch (error) {
        console.error('Error adding product to cart:', error);
        // Handle errors or display an error message to the user
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the search input element
    const searchInput = document.getElementById('search-input');

    // Add event listener for the "keydown" event
    searchInput.addEventListener('keydown', function(event) {
        // Check if the pressed key is "Enter" (key code 13)
        if (event.keyCode === 13) {
            // Prevent the default action of the Enter key (form submission)
            event.preventDefault();
            // Call the searchProductsFromInput function
            searchProductsFromInput();
        }
    });
});

async function searchProductsFromInput() {
    try {
        const searchInputValue = document.getElementById('search-input').value.trim(); // Get the value from the search bar input
        if (!searchInputValue) return; // Return if the search input is empty
        const searchResults = await searchProducts(searchInputValue); // Call the searchProducts function with the input value
        console.log('Search Results:', searchResults);
        // Update the UI to display the search results
        displaySearchResults(searchResults);
    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors or display an error message to the user
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('product-list-container');
    productsContainer.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Create HTML elements for product information
        const productImage = document.createElement('img');
        productImage.src = product.imageUrl;
        productImage.alt = product.name;

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price.toFixed(2)}`;

        // Append elements to product card
        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);

        // Append product card to container
        productsContainer.appendChild(productCard);
    });
}

fetchProductsByCategory('Accessories');