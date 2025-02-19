// Inisialisasi keranjang dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Fungsi untuk menampilkan produk di keranjang
function displayCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity" />
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button class="remove-item" data-index="${index}">Hapus</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });
    
    totalPriceElement.textContent = total.toFixed(2);
}

// Fungsi untuk memperbarui jumlah produk
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('item-quantity')) {
        let index = e.target.dataset.index;
        cart[index].quantity = parseInt(e.target.value);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
});

// Fungsi untuk menghapus produk dari keranjang
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        let index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
});

// Tombol Checkout
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Terima kasih telah berbelanja!');
        localStorage.removeItem('cart');
        cart = [];
        displayCart();
    } else {
        alert('Keranjang belanja kosong!');
    }
});

// Tampilkan isi keranjang saat halaman dimuat
displayCart();
