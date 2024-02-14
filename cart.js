function addToCart(productName, price) {
    // Get the cart items container
    var cartItemsContainer = document.getElementById("cart-items");

    // Create a new row for the cart
    var newRow = document.createElement("tr");

    // Create cells for product name and price
    var productNameCell = document.createElement("td");
    var priceCell = document.createElement("td");

    // Set the content of the cells
    productNameCell.textContent = productName;
    priceCell.textContent = "$" + price.toFixed(2);

    // Append cells to the row
    newRow.appendChild(productNameCell);
    newRow.appendChild(priceCell);

    // Append the row to the cart items container
    cartItemsContainer.appendChild(newRow);
}
