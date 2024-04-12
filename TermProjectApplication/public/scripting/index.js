document.addEventListener('DOMContentLoaded', async () => {

    function formatFeaturedProducts(featuredProducts) {
        const featuredProductsContainer = document.getElementById('fproduct-container');
        featuredProductsContainer.innerHTML = ''; // Clear previous content
    
        featuredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('featured-product');
            productDiv.addEventListener('click', () => {
                redirectToProductDetails(product.productID);
            });
    
            const productName = document.createElement('h2');
            productName.textContent = product.name;
    
            //add this in later when we make the data in the database accurate
            // const productImage = document.createElement('img');
            // productImage.src = product.imageURL;
            // productImage.alt = product.name;
    
            const productPrice = document.createElement('p');
            productPrice.textContent = '$' + product.price.toFixed(2);
    
    
            productDiv.appendChild(productName);
            //productDiv.appendChild(productImage);
            productDiv.appendChild(productPrice);
    
            featuredProductsContainer.appendChild(productDiv);
        });
    }
    
    function redirectToProductList(userID, page) {
        // Redirect to details.html page with productID as URL parameter
        window.location.href = `productlist-${page}.html?userID=${userID}`;
    }


    function redirectToProductDetails(productID) {
        // Redirect to details.html page with productID as URL parameter
        window.location.href = `details.html?productID=${productID}`;
    }

    function extractUserIDFromURL() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const userID = urlParams.get('userID');
        return userID;
    }
    
    // Example usage:
    const userID = extractUserIDFromURL();
    console.log(userID); // Output: 1
    
    try {
        const response = await fetch('http://localhost:3000/product/get-featured-products', {
            method: 'GET'
        });

        if (response.ok) {
            const featuredProducts = await response.json();
            formatFeaturedProducts(featuredProducts);
        } else {
            console.error('Error retrieving featured products:', response.statusText);
        }
    } catch (error) {
        console.error('Error retrieving featured products:', error);
    }
    
    // const logoutButton = document.getElementById('logout-button');
    // logoutButton.addEventListener('click', async () => {
    //     try {
    //         // Call the logout API endpoint
    //         const response = await fetch('http://localhost:3000/auth/abandon-cart', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 userID: extractUserIDFromURL() // Assuming you have extracted userID already
    //             })
    //         });

    //         if (response.ok) {
    //             alert('Logout successful');
    //             // Redirect the user to the login page or any other page as needed
    //             window.location.href = 'login.html';
    //         } else {
    //             console.error('Error logging out:', response.statusText);
    //             alert('An error occurred while logging out');
    //         }
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //         alert('An error occurred while logging out');
    //     }
    // });

const coffeeButton = document.getElementById('coffee-redirect-button');
const teaButton = document.getElementById('tea-redirect-button');
const accessoriesButton = document.getElementById('accessories-redirect-button');
//const cartButton = document.getElementById('cart-redirect-button');

coffeeButton.addEventListener('click', async () => {
    console.log('Coffee button clicked');
    redirectToProductList(userID, "coffee");
});

teaButton.addEventListener('click', async () => {
    console.log('Tea button clicked');
    redirectToProductList(userID, "tea");
});

accessoriesButton.addEventListener('click', async () => {
    console.log('Accessories button clicked');
    redirectToProductList(userID, "accessories");
});
    
});

