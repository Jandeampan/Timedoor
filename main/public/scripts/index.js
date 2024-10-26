document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    } else {
        console.error('Add to cart button not found');
    }
});

function addToCart() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    } else {
        console.error('Cart count element not found');
    }
}