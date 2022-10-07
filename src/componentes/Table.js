import React, { useContext } from 'react';
import StarWarsContext from '../context/myContext';

function Table() {
  const {
    planet,
    namePlanet,
    setNamePlanet,
    selected,
    setSelected,
    filterValues,
    setFilterValues,
    filtrandoDados,
    filterColumns,
  } = useContext(StarWarsContext);

  const cols = ['orbital_period', 'population',
    'diameter', 'rotation_period', 'surface_water'];

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => {
          setNamePlanet({ filterByName: { name: target.value } });
        } }
        value={ namePlanet.filterByName.name }
      />

      <select
        value={ selected.column }
        onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
        data-testid="column-filter"
      >
        {cols.filter(filterColumns)
          .map((item) => (
            <option key={ item }>{item}</option>
          ))}
      </select>

      <select
        value={ selected.comparison }
        onChange={ (e) => setSelected({ ...selected, comparison: e.target.value }) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ selected.value }
        onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }

      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          setFilterValues([...filterValues, selected]);
          setSelected({
            column: 'population',
            comparison: 'maior que',
            value: '0',
          });
        } }
      >
        Filtrar
      </button>

      {/* /* <button>
      type="button"
      onClick={ () => {

      </button> */ }

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        {

          planet.filter((planeta) => planeta.name.toUpperCase()
            .includes(namePlanet.filterByName.name.toUpperCase()))
            .filter(filtrandoDados)
            .filter(filterColumns)
            .map((item) => (
              <tbody key={ item.name }>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.films}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>
              </tbody>
            ))
        }
      </table>
    </div>
  );
}

export default Table;
