/* ==========================================================================
   RETECER — APLICAÇÃO FRONT-END SPA (JAVASCRIPT PURO ES6+)
   ========================================================================== */

// STATE MANAGEMENT (ESTADO DA APLICAÇÃO)
const state = {
    currentUser: {
        id: "usr_101",
        name: "EcoTêxtil Soluções",
        email: "contato@ecotextil.com.br",
        type: "Empresa / Indústria",
        loggedIn: true
    },
    products: [
        {
            id: "prod_1",
            title: "Lote de Retalhos de Algodão Orgânico",
            category: "Retalhos",
            quantity: "120 kg",
            condition: "Excelente",
            price: 450.00,
            type: "Venda ou Troca",
            seller: "Têxtil Fibras do Brasil",
            userType: "Empresa / Indústria",
            location: "São Paulo, SP",
            image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
            description: "Retalhos limpos de confecção de camisetas 100% algodão. Ideal para estopa, desfihamento ou patchwork.",
            swapTargets: "Linhas industriais ou zíperes"
        },
        {
            id: "prod_2",
            title: "Bobinas de Linha Industrial Poliéster",
            category: "Linhas",
            quantity: "50 unidades",
            condition: "Nova",
            price: 320.00,
            type: "Venda",
            seller: "Ateliê Costura Fina",
            userType: "Pessoa Física",
            location: "Blumenau, SC",
            image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
            description: "Bobinas fechadas de alta resistência para costura pesada. Cores variadas.",
            swapTargets: ""
        },
        {
            id: "prod_3",
            title: "Lote de Zíperes Metálicos 20cm",
            category: "Aviamentos",
            quantity: "1.500 unidades",
            condition: "Nova",
            price: 600.00,
            type: "Troca",
            seller: "Metais & Aviamentos Ind.",
            userType: "Empresa / Indústria",
            location: "Caxias do Sul, RS",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
            description: "Zíperes reforçados para jeans e jaquetas. Troco por tecidos brim ou sarja.",
            swapTargets: "Tecidos Brim ou Sarja Excedentes"
        },
        {
            id: "prod_4",
            title: "Sobras de Denim Premium (Jeans)",
            category: "Tecidos",
            quantity: "300 kg",
            condition: "Excelente",
            price: 1200.00,
            type: "Venda ou Troca",
            seller: "Jeanswear Brasil Ltd",
            userType: "Empresa / Indústria",
            location: "Toritama, PE",
            image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80",
            description: "Sobras de corte de alta qualidade (100% algodão). Perfeito para ecobags e acessórios.",
            swapTargets: "Fibras de Poliéster Reciclado"
        }
    ],
    cart: [],
    favorites: [],
    chatMessages: [
        { sender: "other", text: "Olá! Vi seu anúncio de retalhos de algodão. Aceita troca por aviamentos?", time: "10:14" },
        { sender: "me", text: "Olá! Aceitamos sim, especialmente zíperes ou linhas industriais.", time: "10:16" }
    ],
    history: [
        { material: "Retalhos de Sarja", partner: "Malharia Sul", date: "10/08/2026", type: "Troca", value: "Permuta", status: "Concluída" },
        { material: "Botões Eco Madeira", partner: "BioDesign Studio", date: "02/08/2026", type: "Venda", value: "R$ 350,00", status: "Concluída" }
    ]
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHamburger();
    initMobileFilters();
    initNavScroll();
    initModalsKeyboard();
    initHomeCategories();
    renderMarketplaceProducts();
    renderSwapOpportunities();
    renderMyListings();
    renderHistoryTable();
    renderChatMessages();
    updateCartUI();
});

// SPA NAVIGATION SYSTEM
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = link.getAttribute('data-view');
            navigateTo(targetView);
        });
    });
}

function navigateTo(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    const target = document.getElementById(`view-${viewId}`);
    if(target) target.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-view') === viewId);
    });

    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// HAMBURGER MENU
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('nav-overlay');

    hamburger.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');
    const isOpen = navMenu.classList.contains('active');

    if (isOpen) {
        closeMobileMenu();
    } else {
        navMenu.classList.add('active');
        overlay.classList.add('active');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Fechar menu de navegação');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');

    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
    document.body.style.overflow = '';
}

// MOBILE FILTER TOGGLE
function initMobileFilters() {
    const toggleBtn = document.getElementById('mobile-filter-toggle');
    const sidebar = document.getElementById('filters-sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            const isOpen = sidebar.classList.contains('mobile-open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        sidebar.addEventListener('click', (e) => {
            if (e.target === sidebar && window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });
    }
}

// NAVBAR SCROLL STATE
function initNavScroll() {
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 10);
                ticking = false;
            });
            ticking = true;
        }
    });
}

// MODALS KEYBOARD SUPPORT
function initModalsKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.getElementById('auth-modal').classList.contains('active')) {
                closeAuthModal();
            }
            if (document.getElementById('details-modal').classList.contains('active')) {
                closeDetailsModal();
            }
            const cartDrawer = document.getElementById('cart-drawer');
            if (cartDrawer.classList.contains('active')) {
                closeCart();
            }
        }
    });
}

// HOME CATEGORIES RENDER
const categoriesData = [
    { name: "Algodão", icon: "fa-seedling" },
    { name: "Tecidos", icon: "fa-scroll" },
    { name: "Linhas", icon: "fa-record-vinyl" },
    { name: "Aviamentos", icon: "fa-shirt" },
    { name: "Retalhos", icon: "fa-scissors" },
    { name: "Sobras Industriais", icon: "fa-industry" }
];

function initHomeCategories() {
    const container = document.getElementById('home-categories-grid');
    if(!container) return;

    container.innerHTML = categoriesData.map(cat => `
        <div class="category-card" role="listitem" tabindex="0" onclick="filterByCategory('${cat.name}')" onkeydown="if(event.key==='Enter')filterByCategory('${cat.name}')" aria-label="Filtrar por ${cat.name}">
            <i class="fa-solid ${cat.icon}" aria-hidden="true"></i>
            <h4>${cat.name}</h4>
        </div>
    `).join('');
}

function filterByCategory(catName) {
    navigateTo('marketplace');
    document.getElementById('filter-category').value = catName;
    applyMarketplaceFilters();
}

// MARKETPLACE RENDER & FILTERS
function renderMarketplaceProducts(items = state.products) {
    const container = document.getElementById('products-container');
    const countLabel = document.getElementById('results-count');
    if(!container) return;

    countLabel.textContent = `Exibindo ${items.length} anúncio(s) de materiais.`;

    if(items.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>Nenhum material encontrado com os filtros selecionados.</p></div>`;
        return;
    }

    container.innerHTML = items.map(p => `
        <div class="product-card" role="listitem">
            <div class="product-img-box">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
                <button class="fav-btn ${state.favorites.includes(p.id) ? 'active' : ''}" onclick="toggleFavorite('${p.id}')" aria-label="${state.favorites.includes(p.id) ? 'Remover' : 'Adicionar'} ${p.title} aos favoritos">
                    <i class="fa-solid fa-heart" aria-hidden="true"></i>
                </button>
                <span class="neg-badge">${p.type}</span>
            </div>
            <div class="product-body">
                <h3 class="product-title">${p.title}</h3>
                <div class="product-meta">
                    <p><i class="fa-solid fa-boxes-stacked" aria-hidden="true"></i> Qtd: <strong>${p.quantity}</strong></p>
                    <p><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${p.location}</p>
                </div>
                <div class="product-price">
                    ${p.price > 0 ? `R$ ${p.price.toFixed(2)}` : 'Para Permuta'}
                </div>
                <div class="product-footer">
                    <button class="btn btn-outline btn-sm btn-block" onclick="openDetailsModal('${p.id}')">Ver Detalhes</button>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')" aria-label="Adicionar ${p.title} ao carrinho">
                        <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function applyMarketplaceFilters() {
    const search = document.getElementById('marketplace-search-input').value.toLowerCase();
    const cat = document.getElementById('filter-category').value;
    const type = document.getElementById('filter-type').value;
    const condition = document.getElementById('filter-condition').value;
    const userType = document.getElementById('filter-user-type').value;

    const filtered = state.products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
        const matchesCat = cat === 'all' || p.category === cat;
        const matchesType = type === 'all' || p.type === type;
        const matchesCond = condition === 'all' || p.condition === condition;
        const matchesUser = userType === 'all' || p.userType === userType;

        return matchesSearch && matchesCat && matchesType && matchesCond && matchesUser;
    });

    renderMarketplaceProducts(filtered);

    // Close mobile filters after applying
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('filters-sidebar');
        if (sidebar) {
            sidebar.classList.remove('mobile-open');
            document.body.style.overflow = '';
        }
    }
}

function resetFilters() {
    document.getElementById('marketplace-search-input').value = '';
    document.getElementById('filter-category').value = 'all';
    document.getElementById('filter-type').value = 'all';
    document.getElementById('filter-condition').value = 'all';
    document.getElementById('filter-user-type').value = 'all';
    renderMarketplaceProducts();
}

// SWAPS SYSTEM
function renderSwapOpportunities() {
    const container = document.getElementById('swap-opportunities-container');
    if(!container) return;

    const swapItems = state.products.filter(p => p.type.includes('Troca'));
    container.innerHTML = swapItems.map(p => `
        <div class="product-card" role="listitem">
            <div class="product-img-box">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
                <span class="neg-badge">Aceita Troca</span>
            </div>
            <div class="product-body">
                <h3 class="product-title">${p.title}</h3>
                <p class="product-meta">O Vendedor busca: <strong>${p.swapTargets || 'Outros insumos têxteis'}</strong></p>
                <button class="btn btn-primary btn-block btn-sm" onclick="startSwapNegotiation('${p.id}')">
                    <i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i> Propor Troca
                </button>
            </div>
        </div>
    `).join('');
}

function handleSwapSearch(e) {
    e.preventDefault();
    const have = document.getElementById('swap-have').value;
    const want = document.getElementById('swap-want').value;

    showToast(`Buscando correspondências para quem tem "${want}" e precisa de "${have}"...`);
    setTimeout(() => {
        navigateTo('marketplace');
        showToast("Encontramos oportunidades compatíveis com seu perfil!");
    }, 1200);
}

function startSwapNegotiation(productId) {
    navigateTo('chat');
    showToast("Chat iniciado para negociação de troca!");
}

// PUBLISH LISTING FORM
function handlePublishListing(e) {
    e.preventDefault();

    const newProd = {
        id: `prod_${Date.now()}`,
        title: document.getElementById('pub-title').value,
        category: document.getElementById('pub-category').value,
        type: document.getElementById('pub-type').value,
        quantity: document.getElementById('pub-quantity').value,
        price: parseFloat(document.getElementById('pub-price').value) || 0,
        condition: document.getElementById('pub-condition').value,
        location: document.getElementById('pub-location').value,
        swapTargets: document.getElementById('pub-swap-targets').value,
        description: document.getElementById('pub-description').value,
        image: document.getElementById('pub-image').value || "https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=600&q=80",
        seller: state.currentUser.name,
        userType: state.currentUser.type
    };

    state.products.unshift(newProd);
    showToast("Seu material foi publicado com sucesso na RETECER!", "success");
    document.getElementById('publish-form').reset();
    renderMarketplaceProducts();
    renderMyListings();
    navigateTo('marketplace');
}

// CART & CHECKOUT DRAWER
function addToCart(productId) {
    const item = state.products.find(p => p.id === productId);
    if(!item) return;

    state.cart.push(item);
    updateCartUI();
    showToast(`${item.title} adicionado ao carrinho!`);
}

function updateCartUI() {
    const badge = document.getElementById('cart-count');
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');

    if(badge) badge.textContent = state.cart.length;

    if(!container) return;

    if(state.cart.length === 0) {
        container.innerHTML = `<p class="empty-state">Seu carrinho está vazio.</p>`;
        if(subtotalEl) subtotalEl.textContent = "R$ 0,00";
        return;
    }

    let subtotal = 0;
    container.innerHTML = state.cart.map((item, index) => {
        subtotal += item.price;
        return `
            <div class="cart-item">
                <img class="cart-item-img" src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="cart-item-info">
                    <h5>${item.title}</h5>
                    <small>${item.quantity}</small>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <button class="btn-text cart-item-remove" onclick="removeFromCart(${index})" aria-label="Remover ${item.title} do carrinho"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
            </div>
        `;
    }).join('');

    if(subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    updateCartUI();
}

document.getElementById('cart-toggle').addEventListener('click', () => {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function handleCheckout() {
    if(state.cart.length === 0) {
        showToast("Adicione ao menos um material para negociar.");
        return;
    }

    closeCart();
    showToast("Negociação iniciada com sucesso! Vendedores notificados.", "success");
    state.cart = [];
    updateCartUI();
}

// CHAT SIMULATION
function renderChatMessages() {
    const container = document.getElementById('chat-messages-container');
    if(!container) return;

    container.innerHTML = state.chatMessages.map(msg => `
        <div class="msg ${msg.sender === 'me' ? 'sent' : 'received'}">
            <p>${msg.text}</p>
            <small style="font-size:0.7rem; opacity:0.8; display:block; text-align:right;">${msg.time}</small>
        </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
}

function handleSendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input-field');
    const text = input.value.trim();

    if(!text) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    state.chatMessages.push({ sender: 'me', text, time: timeStr });
    input.value = '';
    renderChatMessages();

    // Auto simulated response
    setTimeout(() => {
        state.chatMessages.push({
            sender: 'other',
            text: 'Perfeito! Podemos agendar a retirada do material esta semana?',
            time: `${now.getHours()}:${String(now.getMinutes()+1).padStart(2, '0')}`
        });
        renderChatMessages();
    }, 1500);
}

// PROFILE TABS & HISTÓRICO
function switchProfileTab(tabName) {
    document.querySelectorAll('.profile-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    const clickedBtn = event.currentTarget || event.target;
    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

function renderMyListings() {
    const container = document.getElementById('my-listings-container');
    if(!container) return;

    const myList = state.products.filter(p => p.seller === state.currentUser.name || p.seller === "Têxtil Fibras do Brasil");

    if (myList.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Você ainda não possui anúncios publicados.</p></div>';
        return;
    }

    container.innerHTML = myList.map(p => `
        <div class="product-card" role="listitem">
            <div class="product-img-box">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="product-body">
                <h4>${p.title}</h4>
                <p class="product-meta">Qtd: ${p.quantity}</p>
                <span class="status-tag concluido">Ativo</span>
            </div>
        </div>
    `).join('');
}

function renderHistoryTable() {
    const body = document.getElementById('history-table-body');
    if(!body) return;

    body.innerHTML = state.history.map(h => `
        <tr>
            <td><strong>${h.material}</strong></td>
            <td>${h.partner}</td>
            <td>${h.date}</td>
            <td>${h.type}</td>
            <td>${h.value}</td>
            <td><span class="status-tag concluido">${h.status}</span></td>
        </tr>
    `).join('');
}

// MODALS ENGINE
function openDetailsModal(productId) {
    const p = state.products.find(item => item.id === productId);
    if(!p) return;

    const body = document.getElementById('details-modal-body');
    body.innerHTML = `
        <div class="details-grid">
            <img class="details-img" src="${p.image}" alt="${p.title}">
            <div class="details-info">
                <span class="badge-tag">${p.category}</span>
                <h2>${p.title}</h2>
                <p style="color:var(--text-muted); margin-bottom: 16px;">${p.description}</p>
                <p><strong>Quantidade:</strong> ${p.quantity}</p>
                <p><strong>Condição:</strong> ${p.condition}</p>
                <p><strong>Localização:</strong> ${p.location}</p>
                <p><strong>Anunciante:</strong> ${p.seller} (${p.userType})</p>
                ${p.swapTargets ? `<p style="color:var(--accent-teal); margin-top:8px;"><strong>Troca Aceita por:</strong> ${p.swapTargets}</p>` : ''}
                <div class="details-price">
                    ${p.price > 0 ? `R$ ${p.price.toFixed(2)}` : 'Disponível para Permuta'}
                </div>
                <button class="btn btn-primary btn-block" onclick="addToCart('${p.id}'); closeDetailsModal();">
                    <i class="fa-solid fa-cart-plus" aria-hidden="true"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    const modal = document.getElementById('details-modal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeDetailsModal() {
    const modal = document.getElementById('details-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function toggleAuthMode(mode) {
    const loginBtn = document.getElementById('tab-login-btn');
    const registerBtn = document.getElementById('tab-register-btn');
    const loginForm = document.getElementById('form-login');
    const registerForm = document.getElementById('form-register');

    loginBtn.classList.toggle('active', mode === 'login');
    registerBtn.classList.toggle('active', mode === 'register');
    loginBtn.setAttribute('aria-selected', mode === 'login');
    registerBtn.setAttribute('aria-selected', mode === 'register');
    loginForm.classList.toggle('active', mode === 'login');
    registerForm.classList.toggle('active', mode === 'register');
}

function handleAuthLogin(e) {
    e.preventDefault();
    closeAuthModal();
    showToast("Bem-vindo de volta à RETECER!", "success");
}

function handleAuthRegister(e) {
    e.preventDefault();
    closeAuthModal();
    showToast("Conta criada com sucesso!", "success");
}

// FAVORITES
function toggleFavorite(productId) {
    const index = state.favorites.indexOf(productId);
    if(index === -1) {
        state.favorites.push(productId);
        showToast("Item adicionado aos Favoritos!");
    } else {
        state.favorites.splice(index, 1);
        showToast("Item removido dos Favoritos.");
    }
    renderMarketplaceProducts();
}

// UTILITY TOAST NOTIFICATIONS
function showToast(message, type = "info") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
