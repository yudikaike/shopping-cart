const getSavedCartItems = () => {
  const cartItems = localStorage.getItem('cartItems');
  return JSON.parse(cartItems);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
