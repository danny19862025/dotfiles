// Host switcher tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const hostPanels = document.querySelectorAll('.host-panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.host;
    tabButtons.forEach((b) => {
      const isActive = b.dataset.host === target;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', String(isActive));
    });
    hostPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === target);
    });
  });
});

// Copy-to-clipboard buttons
document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1500);
    } catch {
      btn.textContent = 'Failed';
    }
  });
});

// Cheatsheet category filter + live search
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('cheat-search');
const cheatItems = document.querySelectorAll('.cheat-item');

let activeCategory = 'all';

function applyCheatFilter() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  cheatItems.forEach((item) => {
    const matchesCat = activeCategory === 'all' || item.dataset.cat === activeCategory;
    const matchesText = !query || item.textContent.toLowerCase().includes(query);
    item.classList.toggle('hidden', !(matchesCat && matchesText));
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    activeCategory = btn.dataset.filter || 'all';
    filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
    applyCheatFilter();
  });
});

searchInput?.addEventListener('input', applyCheatFilter);
