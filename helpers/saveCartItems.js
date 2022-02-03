const saveCartItems = (cartItems) => {
  const array = [];
  cartItems.childNodes.forEach((element) => {
    array.push(element.innerText);
  });
  localStorage.setItem('cartItems', JSON.stringify(array));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
