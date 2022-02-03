require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('É uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Com o argumento "MLB1615760527" chama fetch', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Com o argumento "MLB1615760527" utiliza endpoint', () => {
    const expectedUrl = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  })

  it('Retorna objeto igual a item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  it('Sem argumentos retorna um erro', () => {
    expect(fetchItem()).rejects.toEqual(new Error ('You must provide an url'));
  })
});
