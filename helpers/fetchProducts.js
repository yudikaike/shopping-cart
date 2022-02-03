const fetchProducts = (query) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
