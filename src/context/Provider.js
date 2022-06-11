import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

const optionColunmArray = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [data, setData] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [optionColunm, setOptionColumn] = useState([...optionColunmArray]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingFetch(true);
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await result.json();
      setData(results);
      setFilteredData(results);
      setLoadingFetch(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const planetsFilter = data.filter((planet) => planet.name
      .toLowerCase().includes(titleFilter))
      .sort((a, b) => a.name.localeCompare(b.name));

    const newFilter = filterByNumericValues
      .reduce((acc, filter) => acc
        .filter((planet) => {
          switch (filter.comparison) {
          case 'maior que':
            return Number(planet[filter.column]) > Number(filter.value);
          case 'menor que':
            return Number(planet[filter.column]) < Number(filter.value);
          case 'igual a':
            return Number(planet[filter.column]) === Number(filter.value);
          default:
            return true;
          }
        }), planetsFilter);

    const removeUsedFilter = () => {
      const newOptionColunm = [...optionColunmArray];
      const newFilter2 = filterByNumericValues.reduce((acc, filter) => acc
        .filter((column) => column !== filter.column), newOptionColunm);
      setOptionColumn(newFilter2);
    };

    removeUsedFilter();
    setFilteredData(newFilter);
  }, [titleFilter, data, filterByNumericValues]);

  useEffect(() => {
    setColumnFilter(optionColunm[0]);
  }, [optionColunm]);

  const hendleNumberFilter = () => {
    const typeFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: numberFilter,
    };
    setFilterByNumericValues([...filterByNumericValues, typeFilter]);
    setNumberFilter(0);
  };

  const removeFilter = (column) => {
    const newFilter = filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilterByNumericValues(newFilter);
  };

  const removeTotalFilter = () => {
    setFilterByNumericValues([]);
  };

  const setColumnOrdination = (columnSort, orderSort) => {
    const number = -1;
    const newData = filteredData.sort((a, b) => {
      if (b[columnSort] === 'unknown') {
        return number;
      }
      if (orderSort === 'ASC') {
        return +a[columnSort] - +b[columnSort];
      }
      return +b[columnSort] - +a[columnSort];
    });
    setFilteredData([...newData]);
  };

  const context = {
    loadingFetch,
    filteredData,
    setTitleFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    numberFilter,
    setNumberFilter,
    hendleNumberFilter,
    filterByNumericValues,
    removeFilter,
    optionColunm,
    removeTotalFilter,
    setColumnOrdination,
    optionColunmArray,
  };

  return (
    <StarContext.Provider value={ context }>
      {children}
    </StarContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
