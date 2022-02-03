const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Com o argumento <ol><li>Item</li></ol> chama localStorage.setItem', () => {
    const ol = document.createElement('ol');
    const li = document.createElement('li');
    li.innerText = 'Item';
    ol.appendChild(li);
    saveCartItems(ol);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('Com o argumento <ol><li>Item</li></ol> chama localStorage.setItem com', () => {
    const ol = document.createElement('ol');
    const li = document.createElement('li');
    li.innerText = 'Item';
    ol.appendChild(li);
    saveCartItems(ol);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '["Item"]');
  })
});
