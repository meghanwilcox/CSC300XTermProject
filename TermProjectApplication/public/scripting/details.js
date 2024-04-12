document.addEventListener('DOMContentLoaded', async () => {

    // function extractUserIDFromURL() {
    //     const queryString = window.location.search;
    //     const urlParams = new URLSearchParams(queryString);
    //     return urlParams.get('userID');
    // }

    function extractProductIDFromURL() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('productID');
    }

    function formatProductDetails(product) {
        //const productContainer = document.getElementById('prod-details-container-main');
        //productContainer.innerHTML = ''; // Clear previous content
        
        //const productImageContainer = document.getElementById('product-image-container-main')
        const productDetailsContainer = document.getElementById('product-details-container-text');
    
        const productName = document.createElement('h2');
        productName.textContent = product.name;
    
        //     //add this in later when we make the data in the database accurate
        //     // const productImage = document.createElement('img');
        //     // productImage.src = product.imageURL;
        //     // productImage.alt = product.name;
    
        const productPrice = document.createElement('p');
        productPrice.textContent = '$' + product.price.toFixed(2);

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        productDetailsContainer.appendChild(productName);
        //     //productDiv.appendChild(productImage);
        productDetailsContainer.appendChild(productDescription);
        productDetailsContainer.appendChild(productPrice);


        if(product.quantity === 0){
            const outOfStock = document.createElement('p');
            outOfStock.textContent = 'Out of Stock!';
            productDetailsContainer.appendChild(outOfStock);
        } else {
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            productDetailsContainer.appendChild(addToCartButton);
        }
   
    }

    try {
        const response = await fetch('http://localhost:3000/product/get-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productID: extractProductIDFromURL() })
        });
    
        if (response.ok) {
            const product = await response.json();
            formatProductDetails(product);
        } else {
            console.error('Error retrieving product:', response.statusText);
        }
    } catch (error) {
        console.error('Error retrieving product', error);
    }
    
    console.log('ProductID:', extractProductIDFromURL());

    
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
    
    
});