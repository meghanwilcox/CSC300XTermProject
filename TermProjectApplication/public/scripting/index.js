// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('http://localhost:3000/product/get-featured-products', {
//             method: 'GET'
//         });

//         if (response.ok) {
//             const featuredProducts = await response.json();
//             alert("Success!");
//             formatFeaturedProducts(featuredProducts);
//         } else {
//             console.error('Error retrieving featured products:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error retrieving featured products:', error);
//     }
// });

// function formatFeaturedProducts(featuredProducts) {
//     const featuredProductsContainer = document.getElementById('fproduct-container');
//     featuredProductsContainer.innerHTML = ''; // Clear previous content

//     featuredProducts.forEach(product => {
//         const productDiv = document.createElement('div');
//         productDiv.classList.add('featured-product');

//         const productName = document.createElement('h2');
//         productName.textContent = product.name;

//         //add this in later when we make the data in the database accurate
//         // const productImage = document.createElement('img');
//         // productImage.src = product.imageURL;
//         // productImage.alt = product.name;

//         const productPrice = document.createElement('p');
//         productPrice.textContent = '$' + product.price.toFixed(2);

//         productDiv.appendChild(productName);
//         //productDiv.appendChild(productImage);
//         productDiv.appendChild(productPrice);

//         featuredProductsContainer.appendChild(productDiv);
//     });
// }
document.addEventListener('DOMContentLoaded', async () => {
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
});

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

function redirectToProductDetails(productID) {
    // Redirect to details.html page with productID as URL parameter
    window.location.href = `details.html?productID=${productID}`;
}