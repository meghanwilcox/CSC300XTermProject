export let products = [
    { name: "Product 1", cost: 1.00, category: "coffee"},
    { name: "Product 2", cost: 6.00, category: "coffee"},
    { name: "Product 3", cost: 3.00, category: "coffee"},
    { name: "Product 4", cost: 5.00, category: "coffee"},
    { name: "Product 5", cost: 4.00, category: "coffee"},
    { name: "Product 6", cost: 2.00, category: "coffee"},
    { name: "Product 7", cost: 7.00, category: "coffee"},
    { name: "Product 8", cost: 9.00, category: "coffee"},
    { name: "Product 9", cost: 8.00, category: "coffee"},
    { name: "Product 10", cost: 1.00, category: "tea"},
    { name: "Product 11", cost: 6.00, category: "tea"},
    { name: "Product 12", cost: 3.00, category: "tea"},
    { name: "Product 13", cost: 5.00, category: "tea"},
    { name: "Product 14", cost: 4.00, category: "tea"},
    { name: "Product 15", cost: 2.00, category: "tea"},
    { name: "Product 16", cost: 7.00, category: "tea"},
    { name: "Product 17", cost: 9.00, category: "tea"},
    { name: "Product 18", cost: 8.00, category: "tea"},
    { name: "Product 19", cost: 1.00, category: "accessories"},
    { name: "Product 20", cost: 6.00, category: "accessories"},
    { name: "Product 21", cost: 3.00, category: "accessories"},
    { name: "Product 22", cost: 5.00, category: "accessories"},
    { name: "Product 23", cost: 4.00, category: "accessories"},
    { name: "Product 24", cost: 2.00, category: "accessories"},
    { name: "Product 25", cost: 7.00, category: "accessories"},
    { name: "Product 26", cost: 9.00, category: "accessories"},
    { name: "Product 27", cost: 8.00, category: "accessories"}
];    


// Function to update products
export function updateProducts(updatedProducts) {
    products = updatedProducts;
}