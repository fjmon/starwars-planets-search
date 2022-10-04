import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './myContext';
import reqAPI from '../services/reqAPI';

function MyProvider({ children }) {
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    const planetsAPI = async () => {
      const resposta = await reqAPI();
      setPlanet(resposta);
    };
    planetsAPI();
  }, []);

  const contextValue = {
    planet,
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
