// Call fetchCartProducts when the page loads to fetch the cart products
document.addEventListener('DOMContentLoaded', function () {
    fetchCartProducts(userId, cartId);
});

// Call fetchTotalItemsInCart when the page loads to fetch the total items count
document.addEventListener('DOMContentLoaded', function () {
    fetchTotalItemsInCart(userId, cartId);
});

// This function is to remove a product from the cart
async function removeFromCart(userId, cartId, productId) {
    try {
        const response = await fetch('http://localhost:3000/cart/remove-product-from-cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, cartId, productId })
        });

        if (!response.ok) {
            throw new Error('Failed to remove product from cart');
        }

    } catch (error) {
        console.error('Error removing product from cart:', error);

    }
}

// This function is to edit the quantity of the product in the cart
async function editCartProductQuantity(userId, cartId, productId, quantity) {
    try {
        const response = await fetch('http://localhost:3000/cart/edit-cart-product-quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                cartId: cartId,
                productId: productId,
                quantity: quantity
            })
        });

        if (!response.ok) {
            throw new Error('Failed to edit cart product quantity');
        }

        const responseData = await response.json();
        console.log('Cart product quantity successfully edited:', responseData);


    } catch (error) {
        console.error('Error editing cart product quantity:', error);
    }
}

// This function is to edit the quantity of the product in the cart
async function fetchCartProducts(userId, cartId) {
    try {
        const response = await fetch('http://localhost:3000/cart/get-cart-products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                cartId: cartId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart products');
        }

        const cartProducts = await response.json();
        console.log('Cart products retrieved successfully:', cartProducts);

    } catch (error) {
        console.error('Error fetching cart products:', error);
    }
}

// This function gets the total amount of items in the cart
async function fetchTotalItemsInCart(userId, cartId) {
    try {
        const response = await fetch('http://localhost:3000/cart/get-total-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                cartId: cartId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch total items in cart');
        }

        const totalItems = await response.json();
        console.log('Total items in the cart:', totalItems);

        // // Update the UI to display the total items count
        // const cartTotalItemsSpan = document.getElementById('cart-total-items');
        // cartTotalItemsSpan.textContent = totalItems; // Update the content with the total items count

    } catch (error) {
        console.error('Error fetching total items in cart:', error);
    }
}

// This function gets the subtotal for the items in the cart
// MAY NEED TO BE UPDATED WITH EXTRA FEE TOTAL
async function fetchCartSubtotal(userId, cartId) {
    try {
        const response = await fetch('http://localhost:3000/cart/get-subtotal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                cartId: cartId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart subtotal');
        }

        const subtotal = await response.json();
        console.log('Subtotal:', subtotal);

        // Update the UI to display the subtotal
        const subtotalSpan = document.getElementById('cart-subtotal');
        subtotalSpan.textContent = subtotal.toFixed(2); // Format subtotal to two decimal places and update the content

    } catch (error) {
        console.error('Error fetching cart subtotal:', error);
    }
}

// This function is to mark the cart as purchased
async function purchaseCart(cartData) {
    try {
        const response = await fetch('http://localhost:3000/cart/purchase-cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                cartId: cartId
            }) // Assuming cartData contains userID and cartID
        });

        if (!response.ok) {
            throw new Error('Failed to purchase cart');
        }

        const result = await response.json();
        console.log('Cart purchased successfully:', result);

    } catch (error) {
        console.error('Error purchasing cart:', error);

    }
}

const purchaseButton = document.getElementById('checkout-btn');
purchaseButton.addEventListener('click', async () => {

    const cartData = {
        userId: userId,
        cartId: cartId
    };
    await purchaseCart(cartData);
});