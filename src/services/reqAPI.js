const url = 'https://swapi.dev/api/planets';

const reqAPI = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const result = data.results.filter((item) => delete item.residents);
  return result;
};

export default reqAPI;
