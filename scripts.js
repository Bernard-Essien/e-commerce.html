


function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
   
    const toggleButton = document.querySelector('.toggle-menu');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMenu);
    }

    
    const addToCartButtons = document.querySelectorAll('.product button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.parentElement.querySelector('h3').textContent;
            const productPrice = event.target.parentElement.querySelector('p').textContent;
            addToCart(productName, productPrice);
        });
    });


    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('#message').value;

            if (name && email && message) {
                alert('Thank you for contacting us!');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});


const cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: parseFloat(productPrice.replace('$', '')), quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    const cartTableBody = document.querySelector('.cart table tbody');
    const cartSummary = document.querySelector('.cart-summary p');

    if (!cartTableBody || !cartSummary) return;

    cartTableBody.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove">Remove</button></td>
        `;

        row.querySelector('input').addEventListener('change', (event) => {
            item.quantity = parseInt(event.target.value);
            updateCartUI();
        });

        row.querySelector('.remove').addEventListener('click', () => {
            cart.splice(cart.indexOf(item), 1);
            updateCartUI();
        });

        cartTableBody.appendChild(row);
        subtotal += item.price * item.quantity;
    });

    cartSummary.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}
