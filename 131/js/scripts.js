// Array of cheeses (covers array + array methods)
const cheeses = [
    {
        name: "Aged Sharp Cheddar",
        price: 14.99,
        description: "Bold, nutty, and perfectly aged for 18 months.",
        image: "images/cheddar.jpg"
    },
    {
        name: "Creamy Gouda",
        price: 12.49,
        description: "Smooth with sweet caramel notes. A crowd favorite.",
        image: "images/gouda.jpg"
    },
    {
        name: "Triple Cream Brie",
        price: 15.99,
        description: "Rich, buttery, and decadently creamy.",
        image: "images/brie.jpg"
    },
    {
        name: "Bold Blue Cheese",
        price: 13.79,
        description: "Tangy with beautiful blue veins and big flavor.",
        image: "images/blue-cheese.jpg"
    }
];

// Object to store user favorites (covers objects + localStorage)
let userFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Render cheeses using template literals
function renderCheeses(cheeseList) {
    const grid = document.getElementById('cheese-grid');
    
    const html = cheeseList.map(cheese => `
        <div class="cheese-card">
            <img src="${cheese.image}" alt="${cheese.name}" loading="lazy">
            <h3>${cheese.name}</h3>
            <p>${cheese.description}</p>
            <p class="price">$${cheese.price.toFixed(2)}</p>
            <button onclick="toggleFavorite('${cheese.name}')" class="cta-btn" style="margin: 10px 1.2rem; padding: 0.6rem 1rem; font-size: 0.95rem;">
                ${userFavorites.includes(cheese.name) ? '❤️ Favorited' : 'Add to Favorites'}
            </button>
        </div>
    `).join('');

    grid.innerHTML = html;
}

// Toggle favorite with conditional branching + localStorage
function toggleFavorite(cheeseName) {
    if (userFavorites.includes(cheeseName)) {
        userFavorites = userFavorites.filter(name => name !== cheeseName);
    } else {
        userFavorites.push(cheeseName);
    }
    
    localStorage.setItem('favorites', JSON.stringify(userFavorites));
    renderCheeses(cheeses); // re-render to update buttons
}

// Simple DOM manipulation example
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Form handling with event listener
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const messageEl = document.getElementById('form-message');
    
    if (name.trim() === '') {
        messageEl.textContent = "Please enter your name.";
        messageEl.style.color = "red";
        return;
    }
    
    // Success message
    messageEl.textContent = `Thank you, ${name}! Your message has been received. We'll get back to you soon. 🧀`;
    messageEl.style.color = "#166534";
    
    // Clear form
    this.reset();
});

// Multiple functions + initial render
function init() {
    renderCheeses(cheeses);
    console.log("Jake's Legendairy Cheese site initialized!");
}

// Run when page loads
window.onload = init;