const fetchProducts = () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
