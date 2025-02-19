// Menangani tombol "Add to Cart"
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Produk berhasil ditambahkan ke keranjang!');
    });
});

// Menangani tombol "Favorite"
document.querySelectorAll('.favorite').forEach(favBtn => {
    favBtn.addEventListener('click', () => {
        favBtn.classList.toggle('favorited'); // Tambahkan atau hapus class
    });
});

// Fitur pencarian produk
document.querySelector('.search').addEventListener('input', function() {
    let keyword = this.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        let productName = card.querySelector('h2').innerText.toLowerCase();
        if (productName.includes(keyword)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

let index = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const totalSlides = slides.length;
const dotsContainer = document.querySelector(".dots-container");
let slideInterval;

// Duplikasi slide pertama untuk efek infinite loop
slider.appendChild(slides[0].cloneNode(true));

// Buat indikator titik
for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

// Fungsi untuk mengupdate titik aktif
function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}
function nextSlide() {
    index++;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = "translateX(" + (-index * 100) + "%)";

    setTimeout(() => {
        if (index === totalSlides) {
            slider.style.transition = "none";
            index = 0;
            slider.style.transform = "translateX(0)";
        }
    }, 500);

    updateDots();
}

function prevSlide() {
    index--;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = "translateX(" + (-index * 100) + "%)";

    setTimeout(() => {
        if (index === totalSlides) {
            slider.style.transition = "none";
            index = 0;
            slider.style.transform = "translateX(0)";
        }
    }, 500);

    updateDots();
}

function goToSlide(n) {
    index = n;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = "translateX(" + (-index * 100) + "%)";
    updateDots();
}

// Fungsi auto-slide
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 3000);
}

// Pause saat hover
function pauseSlide() {
    clearInterval(slideInterval);
}

// Resume saat mouse keluar
function resumeSlide() {
    startSlideShow();
}

// Jalankan auto-slide saat halaman dimuat
startSlideShow();
updateDots();
