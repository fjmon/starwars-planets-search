import { number } from 'prop-types';
import React, { useContext } from 'react';
import StarWarsContext from '../context/myContext';

function Table() {
  const {
    planet,
    namePlanet,
    setNamePlanet,
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
        data-testid="column-filter"
      >
        {cols.map((item) => (
          <option key={ item }>{item}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick=
      >
        Filtrar
      </button>

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
