
// Function to add an item to the cart
function addToCart(productName, price, sizeId) {
    const size = document.getElementById(sizeId).value;

    const item = {
        name: productName,
        price: price,
        size: size
    };

    const cartItems = document.getElementById('cart-items');
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.size} - $${item.price}`;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.onclick = function () {
        cartItems.removeChild(li);
        updateTotalPrice();
    };

    li.appendChild(deleteBtn);
    cartItems.appendChild(li);

    // Update button text to 'Added to cart'
    const buttons = document.querySelectorAll('.cartBtn');
    buttons.forEach((button) => {
        if (button.getAttribute('onclick').includes(productName)) {
            button.innerHTML = 'Added to cart';
        }
    });

    updateTotalPrice();
}

// Function to calculate the total price of items in the cart
function updateTotalPrice() {
    const cartItems = document.getElementById('cart-items').children;
    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const itemText = cartItems[i].textContent;
        const itemPrice = parseFloat(itemText.split('- $')[1].trim());
        totalPrice += itemPrice;
    }

    document.getElementById('total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
}



// Function to update the "Add to Cart" button based on availability
const IsItemAvailable = false;
function AddtoCartButton() {
    const button = document.getElementById('AddtoCart');
    const availabilityStatus = document.getElementById('availability-status');

    if (IsItemAvailable) {
        button.disabled = false;
        button.classList.remove('disabled');
        button.textContent = 'Add to Cart';
        availabilityStatus.textContent = ' In Stock';
        availabilityStatus.style.color = 'green';
    } else {
        button.disabled = true
        button.classList.add('disabled');
        button.textContent = 'Unavailable'
        availabilityStatus.textContent = 'Out of Stock';
        availabilityStatus.style.color = 'red';
        }
}


// Function for checkout with an if-else alert
function checkout() {
    const cartItems = document.getElementById('cart-items');

    if (cartItems.children.length === 0) {
        alert('Your cart or address is Empty');
        return;
    }

    if (!validateInputs()) {
        return;
    }

     document.getElementById('checkoutBtn').innerHTML = 'Processing...';
    setTimeout(() => {
        document.getElementById('checkoutBtn').innerHTML = 'Checkout';
        alert('Checkout Succeeded!');
    }, 2000);
}

//Function to validate input fields
function validateInputs() {
    const inputs = document.querySelectorAll('.address input');
    let allFilled = true;

    inputs.forEach((input) => {
        if (input.value.trim()=== '' ) {
            allFilled = false;
            input.style.border = '2px solid red';
        } else {
            input.style.border = '';
        }
    });

    if (!allFilled) {
        alert('Please fill in all fields');
    } else {
        alert('Checkout Succeeded')
    }
}

// Function to change language
function changeLanguage(lang) {
    const languages = {
        en: { heading: 'Welcome' },
        tur: { heading: 'Hoş geldin' },
        ar: { heading: 'أهلاً وسهلاً'}
    };

    if (languages[lang]) {
        document.getElementById('heading').innerHTML = languages[lang].heading;
    } else {
        console.warn('Language not supported:', lang);
    }
}
