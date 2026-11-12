// Edite telefone, preços, ingredientes e disponibilidade neste único objeto.
const STORE = {
  whatsapp: '5568999411587',
  hours: { open: 15, close: 22 },
  sizes: [
    { id: '300', volume: '300 ml', caption: 'Pequeno · na medida', price: 12 },
    { id: '500', volume: '500 ml', caption: 'Médio · pra aproveitar', price: 18 },
    { id: '700', volume: '700 ml', caption: 'Grande · bem caprichado', price: 21 },
  ],
  toppings: [
    { id: 'banana', name: 'Banana', icon: '🍌', extraPrice: 2, available: true },
    { id: 'morango', name: 'Morango', icon: '🍓', extraPrice: 3, available: true },
    { id: 'granola', name: 'Granola', icon: '🌾', extraPrice: 2, available: true },
    { id: 'leite-po', name: 'Leite em pó', icon: '🥛', extraPrice: 2, available: true },
    { id: 'leite-condensado', name: 'Leite condensado', icon: '🍯', extraPrice: 2, available: true },
    { id: 'pacoca', name: 'Paçoca', icon: '🥜', extraPrice: 2, available: true },
    { id: 'amendoim', name: 'Amendoim', icon: '🥜', extraPrice: 2, available: true },
    { id: 'coco', name: 'Coco ralado', icon: '🥥', extraPrice: 2, available: true },
    { id: 'aveia', name: 'Aveia', icon: '🌾', extraPrice: 1.5, available: true },
    { id: 'tapioca', name: 'Flocos de tapioca', icon: '✨', extraPrice: 2.5, available: true },
  ],
};

const LAST_ORDER_KEY = 'acai-da-ponte:last-order:v1';
const state = { size: null, included: [], extras: [] };
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const sizesNode = document.querySelector('#sizes');
const toppingsNode = document.querySelector('#toppings');

function getSize() { return STORE.sizes.find((item) => item.id === state.size); }
function getTopping(id) { return STORE.toppings.find((item) => item.id === id); }
function extrasTotal() {
  return state.extras.reduce((total, id) => total + (getTopping(id)?.extraPrice || 0), 0);
}
function orderTotal() { return (getSize()?.price || 0) + extrasTotal(); }

function renderSizes() {
  sizesNode.innerHTML = STORE.sizes.map((size) => `
    <button class="size-option" type="button" role="radio" aria-checked="${state.size === size.id}" data-size="${size.id}">
      <span class="size-volume">${size.volume}</span>
      <span class="size-caption">${size.caption}</span>
      <span class="size-price">${currency.format(size.price)}</span>
    </button>`).join('');
  sizesNode.querySelectorAll('[data-size]').forEach((button) => button.addEventListener('click', () => {
    state.size = button.dataset.size;
    renderSizes();
    updateSummary();
  }));
}

function renderToppings() {
  const pickedCount = state.included.length;
  toppingsNode.innerHTML = STORE.toppings.map((item) => {
    const included = state.included.includes(item.id);
    const extra = state.extras.includes(item.id);
    const selected = included || extra;
    const label = included ? 'Incluso' : extra ? `Extra · ${currency.format(item.extraPrice)}`
      : pickedCount < 3 ? '1 dos 3 inclusos' : `Extra · ${currency.format(item.extraPrice)}`;
    return `<button class="topping-option ${included ? 'is-included' : ''} ${extra ? 'is-extra' : ''}" type="button" aria-pressed="${selected}" ${!item.available ? 'disabled' : ''} data-topping="${item.id}" aria-label="${item.name}, ${label}${item.available ? '' : ', esgotado'}">
      <span class="topping-icon" aria-hidden="true">${item.icon}</span><span><span class="topping-name">${item.name}</span><span class="topping-price">${item.available ? label : 'Esgotado'}</span></span>
    </button>`;
  }).join('');
  toppingsNode.querySelectorAll('[data-topping]').forEach((button) => button.addEventListener('click', () => {
    const id = button.dataset.topping;
    if (state.included.includes(id)) state.included = state.included.filter((item) => item !== id);
    else if (state.extras.includes(id)) state.extras = state.extras.filter((item) => item !== id);
    else if (state.included.length < 3) state.included.push(id);
    else state.extras.push(id);
    renderToppings();
    updateSummary();
  }));
  document.querySelector('#selection-count').textContent = `${pickedCount} de 3 inclusos escolhidos${state.extras.length ? ` · ${state.extras.length} extra${state.extras.length > 1 ? 's' : ''}` : ''}`;
}

function removeItem(id, kind) {
  if (kind === 'included') state.included = state.included.filter((item) => item !== id);
  else state.extras = state.extras.filter((item) => item !== id);
  renderToppings();
  updateSummary();
}

function renderCart() {
  const size = getSize();
  const rows = [];
  if (size) rows.push(`<li><span><strong>Açaí ${size.volume}</strong><small>Tamanho do copo</small></span><b>${currency.format(size.price)}</b></li>`);
  state.included.forEach((id) => {
    const item = getTopping(id);
    if (item) rows.push(`<li><span><strong>${item.name}</strong><small>Complemento incluso</small></span><span class="included-price">Incluso <button type="button" class="remove-item" data-remove="${id}" data-kind="included" aria-label="Remover ${item.name}">×</button></span></li>`);
  });
  state.extras.forEach((id) => {
    const item = getTopping(id);
    if (item) rows.push(`<li><span><strong>${item.name}</strong><small>Complemento extra</small></span><span><b>${currency.format(item.extraPrice)}</b> <button type="button" class="remove-item" data-remove="${id}" data-kind="extra" aria-label="Remover ${item.name}">×</button></span></li>`);
  });
  document.querySelector('#cart-items').innerHTML = rows.length ? rows.join('') : '<li class="empty-cart">Seu pedido aparecerá aqui conforme você escolhe.</li>';
  document.querySelector('#cart-total').textContent = currency.format(orderTotal());
  document.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => removeItem(button.dataset.remove, button.dataset.kind)));
}

function orderDetailText() {
  const size = getSize();
  if (!size) return 'Escolha um copo para começar';
  const included = state.included.map((id) => getTopping(id)?.name).filter(Boolean);
  const extras = state.extras.map((id) => getTopping(id)?.name).filter(Boolean);
  return `${size.volume} · ${included.length} incluso${extras.length ? ` · ${extras.length} extra${extras.length > 1 ? 's' : ''}` : ''}`;
}

function updateSummary() {
  const size = getSize();
  const total = orderTotal();
  document.querySelector('#total-price').textContent = size ? currency.format(total) : 'Escolha um copo';
  document.querySelector('#order-detail').textContent = orderDetailText();
  renderCart();
  const link = document.querySelector('#whatsapp-order');
  if (!size) {
    link.classList.add('is-disabled');
    link.setAttribute('aria-disabled', 'true');
    link.href = '#cardapio';
    return;
  }
  const included = state.included.map((id) => getTopping(id)?.name).filter(Boolean);
  const extras = state.extras.map((id) => getTopping(id)).filter(Boolean);
  const lines = [
    'Olá! Quero fazer um pedido para retirada na Açaí da Ponte:',
    `• Açaí ${size.volume} — ${currency.format(size.price)}`,
    `• Complementos inclusos: ${included.length ? included.join(', ') : 'nenhum'}`,
    `• Complementos extras: ${extras.length ? extras.map((item) => `${item.name} (${currency.format(item.extraPrice)})`).join(', ') : 'nenhum'}`,
    `Total: ${currency.format(total)}`,
    'Vou retirar na Rua Maranhão, 201, Centro. Por favor, confirmem meu pedido e o tempo de preparo.',
  ];
  link.href = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  link.classList.remove('is-disabled');
  link.setAttribute('aria-disabled', 'false');
}

function saveLastOrder() {
  const size = getSize();
  if (!size) return;
  const order = { size: size.id, included: [...state.included], extras: [...state.extras], savedAt: new Date().toISOString() };
  try { localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order)); } catch { /* armazenamento indisponível */ }
  updateRepeatButton();
}

function updateRepeatButton() {
  const button = document.querySelector('#repeat-order');
  let available = false;
  try { available = Boolean(localStorage.getItem(LAST_ORDER_KEY)); } catch { /* armazenamento indisponível */ }
  button.disabled = !available;
  button.title = available ? 'Restaurar o último pedido salvo neste aparelho' : 'Monte e abra um pedido no WhatsApp para salvar aqui';
  document.querySelector('#repeat-hint').textContent = available ? 'Recupera o último pedido salvo neste aparelho.' : 'Seu último pedido aparecerá aqui depois de abrir o WhatsApp.';
}

function repeatLastOrder() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem(LAST_ORDER_KEY) || 'null'); } catch { saved = null; }
  if (!saved || !STORE.sizes.some((item) => item.id === saved.size)) return;
  state.size = saved.size;
  state.included = (Array.isArray(saved.included) ? saved.included : []).filter((id) => getTopping(id)?.available).slice(0, 3);
  state.extras = (Array.isArray(saved.extras) ? saved.extras : []).filter((id) => getTopping(id)?.available && !state.included.includes(id));
  renderSizes();
  renderToppings();
  updateSummary();
  document.querySelector('#cart').scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.querySelector('#cart-feedback').textContent = 'Último pedido recuperado. Você pode alterar qualquer item.';
}

document.querySelector('#whatsapp-order').addEventListener('click', (event) => {
  if (!getSize()) {
    event.preventDefault();
    document.querySelector('#cardapio').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  saveLastOrder();
});

document.querySelector('#repeat-order').addEventListener('click', repeatLastOrder);
document.querySelector('#reset-order').addEventListener('click', () => {
  state.size = null;
  state.included = [];
  state.extras = [];
  renderSizes();
  renderToppings();
  updateSummary();
  document.querySelector('#cart-feedback').textContent = 'Pedido limpo. Escolha um copo para começar.';
});

function updateStoreStatus() {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Rio_Branco', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map((part) => [part.type, part.value]));
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  const open = hour >= STORE.hours.open && (hour < STORE.hours.close || (hour === STORE.hours.close && minute === 0));
  document.querySelector('#store-status-text').textContent = open ? 'Aberta agora' : 'Fechada agora';
  document.querySelector('.status-dot').classList.toggle('closed', !open);
}

renderSizes();
renderToppings();
updateSummary();
updateRepeatButton();
updateStoreStatus();
setInterval(updateStoreStatus, 60_000);
