// =============================================
//   OKEYCHI GLOBAL PROJECT — script.js
// =============================================

// --- WhatsApp Numbers ---
const WA_LINE1 = '2348063433426';
const WA_LINE2 = '2348156328327';

// --- Product Data ---
const products = [
  { id:1,  name:'Heavy Duty Plastic Bucket 20L',      price:3500,  old:5000,   disc:30, cat:'buckets',    emoji:'🪣', rating:4.5, reviews:834,  badge:'Best Seller' },
  { id:2,  name:'Plastic Bucket Set 5L 10L 15L',      price:6800,  old:9500,   disc:28, cat:'buckets',    emoji:'🪣', rating:4.3, reviews:412  },
  { id:3,  name:'Coloured Wash Basin Bowl Large',      price:2200,  old:3500,   disc:37, cat:'buckets',    emoji:'🪣', rating:4.4, reviews:1023, badge:'Popular' },
  { id:4,  name:'Plastic Armchair Heavy Duty',         price:12500, old:17000,  disc:26, cat:'chairs',     emoji:'🪑', rating:4.6, reviews:678,  badge:'Hot' },
  { id:5,  name:'Plastic Monobloc Chair White',        price:7800,  old:11000,  disc:29, cat:'chairs',     emoji:'🪑', rating:4.2, reviews:934  },
  { id:6,  name:'Plastic Folding Table 4ft',           price:22000, old:30000,  disc:27, cat:'chairs',     emoji:'🪑', rating:4.4, reviews:287,  badge:'Sale' },
  { id:7,  name:'Airtight Food Storage Container 5L',  price:4500,  old:6500,   disc:31, cat:'containers', emoji:'📦', rating:4.7, reviews:1456, badge:'Top Pick' },
  { id:8,  name:'Plastic Storage Box with Lid 30L',    price:8500,  old:12000,  disc:29, cat:'containers', emoji:'📦', rating:4.3, reviews:567  },
  { id:9,  name:'Multipurpose Container Set 3pcs',     price:5200,  old:8000,   disc:35, cat:'containers', emoji:'📦', rating:4.5, reviews:789  },
  { id:10, name:'Plastic Crate 50L Industrial',        price:9800,  old:14000,  disc:30, cat:'crates',     emoji:'🧺', rating:4.4, reviews:345,  badge:'Bulk Deal' },
  { id:11, name:'Shopping Basket Handled 20L',         price:2800,  old:4200,   disc:33, cat:'crates',     emoji:'🧺', rating:4.1, reviews:623  },
  { id:12, name:'PVC Pipe 1 inch x 3m',               price:1800,  old:2500,   disc:28, cat:'pipes',      emoji:'🔧', rating:4.3, reviews:2100, badge:'Best Value' },
  { id:13, name:'PVC Pipe Fittings Set 20pcs',         price:4200,  old:6000,   disc:30, cat:'pipes',      emoji:'🔧', rating:4.2, reviews:876  },
  { id:14, name:'Plastic Water Tank 1000L',            price:85000, old:110000, disc:23, cat:'tanks',      emoji:'💧', rating:4.7, reviews:234,  badge:'Top Rated' },
  { id:15, name:'Overhead Water Tank 500L',            price:52000, old:70000,  disc:26, cat:'tanks',      emoji:'💧', rating:4.5, reviews:189  },
  { id:16, name:'Plastic Plates Set x6',              price:3200,  old:5000,   disc:36, cat:'kitchen',    emoji:'🍽️', rating:4.4, reviews:1234 },
  { id:17, name:'Kitchen Storage Rack 3-Tier',         price:15000, old:22000,  disc:32, cat:'kitchen',    emoji:'🍽️', rating:4.3, reviews:456,  badge:'New' },
  { id:18, name:'Industrial Drum 200L Blue',           price:48000, old:62000,  disc:23, cat:'industrial', emoji:'🏭', rating:4.6, reviews:167,  badge:'Wholesale' },
];

const flashIds = [1, 4, 7, 10, 14, 16];

// --- Cart State ---
let cart      = [];
let cartTotal = 0;

// --- Countdown Timer State ---
let timerSecs = 12457;
let waOpen    = false;

// --- Helpers ---
function fmt(n) {
  return '₦' + n.toLocaleString();
}

function stars(r) {
  return Array.from({ length: 5 }, (_, i) => i < Math.round(r) ? '★' : '☆').join('');
}

// --- Render Products ---
function renderProducts(list, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = list.map(p => `
    <div class="product">
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      <div class="product-wish" onclick="event.stopPropagation(); showToast('❤️ Added to wishlist')">♡</div>
      <div class="product-img">${p.emoji}</div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div style="display:flex; align-items:baseline; gap:4px; flex-wrap:wrap">
          <span class="product-price">${fmt(p.price)}</span>
          ${p.old ? `<span class="product-old">${fmt(p.old)}</span><span class="product-disc">-${p.disc}%</span>` : ''}
        </div>
        <div class="product-rating">
          <span class="product-stars">${stars(p.rating)}</span>
          <span class="product-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-btns">
          <button class="add-cart-btn" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
          <button class="wa-prod-btn" onclick="waProduct(${p.id})" title="Order via WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.232-1.316A9.953 9.953 0 0011.999 22C17.522 22 22 17.523 22 12S17.522 2 11.999 2zm0 18a7.95 7.95 0 01-4.073-1.114l-.292-.174-3.103.78.812-2.981-.19-.306A7.943 7.943 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-7.999 8h-.002z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Cart Functions --- 
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  cart.push(p);
  cartTotal += p.price;

  document.getElementById('cartCount').textContent     = cart.length;
  document.getElementById('cartBar').style.display     = 'flex';
  document.getElementById('cartItemsLabel').textContent = cart.length + ' item' + (cart.length > 1 ? 's' : '');
  document.getElementById('cartTotal').textContent      = fmt(cartTotal);

  showToast('🛒' + p.name.substring(0, 28) + '... added!');
}

function showCartToast() {
  if (!cart.length) { showToast('🛒 Your cart is empty'); return; }
  showToast('🛒 ' + cart.length + ' items · Total ' + fmt(cartTotal));
}

// --- WhatsApp Functions ---
function waProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(
    'Hello Okeychi Global Project! 👋\n\n' +
    'I\'m interested in ordering:\n\n' +
    '🛍️ *' + p.name + '*\n' +
    '💰 Price: ' + fmt(p.price) + '\n\n' +
    'Please let me know availability and delivery options. Thank you!'
  );
  window.open('https://wa.me/' + WA_LINE1 + '?text=' + msg, '_blank');
}

function waCheckout() {
  if (!cart.length) { showToast('🛒 Your cart is empty'); return; }
  const items = cart.map(p => '• ' + p.name + ' — ' + fmt(p.price)).join('\n');
  const msg = encodeURIComponent(
    'Hello Okeychi Global Project! 👋\n\n' +
    'I\'d like to place an order:\n\n' +
    items + '\n\n' +
    '💰 *Total: ' + fmt(cartTotal) + '*\n\n' +
    'Please confirm availability and delivery. Thank you!'
  );
  window.open('https://wa.me/' + WA_LINE1 + '?text=' + msg, '_blank');
}

function toggleWaPopup() {
  waOpen = !waOpen;
  document.getElementById('waPopup').classList.toggle('open', waOpen);
}

function openWaPopup() {
  waOpen = true;
  document.getElementById('waPopup').classList.add('open');
}

function sendWaMsg(number) {
  const msg = document.getElementById('waMsg').value.trim();
  if (!msg) return;
  window.open('https://wa.me/' + number + '?text=' + encodeURIComponent(msg), '_blank');
  showToast('✅ Opening WhatsApp...');
}

// --- Toast ---
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// --- Filter by Category ---
function filterCat(cat, el) {
  if (el) {
    document.querySelectorAll('.cat').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  }
  const titles = {
    all: 'All Products', buckets: 'Buckets & Bowls', chairs: 'Chairs & Tables',
    containers: 'Containers & Storage', crates: 'Crates & Baskets',
    pipes: 'Pipes & Fittings', tanks: 'Water Tanks',
    kitchen: 'Kitchen Plastics', industrial: 'Industrial'
  };
  const filtered = cat === 'all' ? products : products.filter(p => p.cat === cat);
  document.getElementById('sectionTitle').textContent = titles[cat] || 'Products';
  renderProducts(filtered, 'mainProducts');
}

// --- Search ---
function doSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) { filterCat('all', null); return; }
  const res = products.filter(p => p.name.toLowerCase().includes(q) || p.cat.includes(q));
  document.getElementById('sectionTitle').textContent = 'Results for "' + q + '" (' + res.length + ')';
  renderProducts(res, 'mainProducts');
  document.querySelectorAll('.cat').forEach(c => c.classList.remove('active'));
  if (!res.length) showToast('😕 No products found for "' + q + '"');
}

// --- Countdown Timer ---
function startTimer() {
  setInterval(() => {
    if (timerSecs <= 0) timerSecs = 9999;
    timerSecs--;
    const h = Math.floor(timerSecs / 3600);
    const m = Math.floor((timerSecs % 3600) / 60);
    const s = timerSecs % 60;
    document.getElementById('th').textContent = String(h).padStart(2, '0');
    document.getElementById('tm').textContent = String(m).padStart(2, '0');
    document.getElementById('ts').textContent = String(s).padStart(2, '0');
  }, 1000);
}

// --- Init on Page Load ---
window.addEventListener('load', () => {
  renderProducts(products.filter(p => flashIds.includes(p.id)), 'flashProducts');
  renderProducts(products, 'mainProducts');
  startTimer();
});