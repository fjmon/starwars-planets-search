import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import reqAPI from '../services/reqAPI';
import StarWarsContext from './myContext';

function MyProvider({ children }) {
  const [planet, setPlanet] = useState([]);
  const [namePlanet, setNamePlanet] = useState({ filterByName: { name: '' } });
  const [selected, setSelected] = useState({
    column: 'population', // estado generico inputs - rep valores selecionados
    comparison: 'maior que',
    value: '0',
  });
  const [filterValues, setFilterValues] = useState([]);

  const filterColumns = (param) => !filterValues
    .find((item) => param === item.column
    || param === item.comparison || param === item.value);

  // const [data, setData] = useState({}) // onde os dados estão, quem receberá meus dados
  // const [selectedFilters, setSelectedFilters] = useState({}) // est p agrupar filtros

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const dados = await fetch(API)
  //     cons response = await dados.json()
  //     setData(response)
  //   }
  //     fetchData()
  // }, []);

  useEffect(() => {
    const planetsAPI = async () => {
      const resposta = await reqAPI();
      setPlanet(resposta);
      // setData(data);
    };
    planetsAPI();
  }, []);

  function filtrandoDados(item) {
    const resultFiltro = [];
    filterValues.forEach((elem) => {
      switch (elem.comparison) {
      case 'maior que':
        resultFiltro.push(Number(item[elem
          .column]) > Number(elem.value));
        break;

      case 'menor que':
        resultFiltro.push(Number(item[elem
          .column]) < Number(elem.value));
        break;

      default:
        resultFiltro.push(item[elem
          .column] === elem.value.toUpperCase());
        break;
      }
    });
    return resultFiltro
      .every((elemento) => elemento);
  }

  const contextValue = {
    planet,
    namePlanet,
    setNamePlanet,
    selected,
    setSelected,
    filterValues,
    setFilterValues,
    filtrandoDados,
    filterColumns,
  };

  return (
    <div>
      <StarWarsContext.Provider value={ contextValue }>
        {children}
      </StarWarsContext.Provider>
    </div>

  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
