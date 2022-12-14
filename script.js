const totalPrice = () => {
  const cartItems = document.querySelector('.cart ol');
  const priceContainer = document.querySelector('.total-price');
  let total = 0;
  cartItems.childNodes.forEach((item) => {
  const price = item.innerText.split('|')[2].split(':')[1].trim().split('');
  price.splice(0, 1);
  const formattedPrice = price.join('');
  const priceNumber = parseFloat(formattedPrice);
  total += priceNumber;
  });
  priceContainer.innerText = `${total}`;
};

const updateCart = () => {
  const cartItems = document.querySelector('.cart ol');
  saveCartItems(cartItems);
  totalPrice();
};

const emptyCart = () => {
  const cartItems = document.querySelector('.cart ol');
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    updateCart();
  });
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.currentTarget.remove();
  updateCart();
}

const loadItems = async () => {
  const cartItems = await getSavedCartItems();
  const parsedCartItems = JSON.parse(cartItems);
  if (parsedCartItems.length !== 0) {
    parsedCartItems.forEach((savedItem) => {
      const cartItemList = document.querySelector('.cart ol');
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = savedItem;
      li.addEventListener('click', cartItemClickListener);
      cartItemList.appendChild(li);
    });
    totalPrice();
  }
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemsToCart = () => {
  const cartItemList = document.querySelector('.cart ol');
  const itemButtons = document.querySelectorAll('.item button');

  itemButtons.forEach((itemButton) => itemButton.addEventListener('click', (event) => {
    const id = getSkuFromProductItem(event.target.parentElement);
    fetchItem(id)
      .then((product) => {
        const { id: sku, title: name, price: salePrice } = product;
        cartItemList.appendChild(createCartItemElement({ sku, name, salePrice }));
        updateCart();
      });
  }));
};

const loading = () => {
  const itemSection = document.querySelector('.items');
  const section = createCustomElement('section', 'loading', 'carregando...');
  itemSection.appendChild(section);
};

const appendItems = () => {
  const itemSection = document.querySelector('.items');

  loading();
  fetchProducts('computador')
    .then((products) => {
      products.results.forEach((product) => {
        const { id: sku, title: name, thumbnail: image } = product;
        itemSection.appendChild(createProductItemElement({ sku, name, image }));
      });
    })
    .then(() => addItemsToCart())
    .then(() => {
      document.querySelector('.loading').remove();
    });
};

window.onload = () => {
  appendItems();
  loadItems();
  totalPrice();
  emptyCart();
};