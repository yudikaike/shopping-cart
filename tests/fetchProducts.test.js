require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('É uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Com o argumento "computador" chama fetch', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Com o argumento "computador" utiliza endpoint', () => {
    const expectedUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  })

  it('Com o argumento "computador" retorna estrutura de dados', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })

  it('Sem argumentos retorna erro', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error ('You must provide an url'));
  })
});
