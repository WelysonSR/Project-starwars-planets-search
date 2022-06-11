/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';
import Remover from '../images/Remover.png';
import './Forms.css';

function Forms() {
  const {
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
  } = useContext(StarContext);
  const [columnSort, setColumnSort] = useState('population');
  const [orderSort, setOrderSort] = useState('ASC');

  const handleTitleFilter = ({ target }) => {
    setTitleFilter(target.value.toLowerCase());
  };

  return (
    <section>
      <form>
        <input
          type="text"
          className="form-control planet-search"
          placeholder="Search for a planet"
          onChange={ (e) => handleTitleFilter(e) }
          data-testid="name-filter"
        />
        <label htmlFor="Coluna" className="form-label">
          Coluna
          <select
            id="Coluna"
            value={ columnFilter }
            className="form-select"
            onChange={ ({ target }) => setColumnFilter(target.value) }
            data-testid="column-filter"
          >
            {
              optionColunm.map((column) => (
                <option key={ column } value={ column }>
                  { column }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="Operador" className="form-label">
          Operador
          <select
            id="Operador"
            value={ comparisonFilter }
            className="form-select"
            onChange={ ({ target }) => setComparisonFilter(target.value) }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="Number" className="form-label">
          Number
          <input
            id="Number"
            type="number"
            value={ numberFilter }
            className="form-control"
            onChange={ ({ target }) => setNumberFilter(target.value) }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          className="btn btn-warning"
          onClick={ hendleNumberFilter }
          data-testid="button-filter"
        >
          Filter
        </button>

        <label htmlFor="Ordenar" className="form-label ordenar">
          Ordenar
          <select
            value={ columnSort }
            className="form-select"
            onChange={ ({ target }) => setColumnSort(target.value) }
            data-testid="column-sort"
          >
            {
              optionColunmArray.map((column) => (
                <option key={ column } value={ column }>
                  { `${column}` }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="ASC" className="form-check-label">
          Ascendente
          <input
            type="radio"
            id="ASC"
            name="sort"
            value="ASC"
            className="form-check-input"
            onChange={ () => setOrderSort('ASC') }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DESC" className="form-check-label">
          Descendente
          <input
            type="radio"
            id="DESC"
            name="sort"
            value="DESC"
            className="form-check-input"
            onChange={ () => setOrderSort('DESC') }
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          type="button"
          className="btn btn-warning"
          onClick={ () => setColumnOrdination(columnSort, orderSort) }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={ removeTotalFilter }
          data-testid="button-remove-filters"
        >
          Remove Filters
        </button>
      </form>
      <ul>
        {
          filterByNumericValues.map((filter) => (
            <li
              key={ filter.column }
              className="filter-item"
              data-testid="filter"
            >
              <p>{`${filter.column} - ${filter.comparison} - ${filter.value}`}</p>
              <img
                src={ Remover }
                alt="Remover"
                className="remover-img"
                onClick={ () => removeFilter(filter.column) }
              />
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Forms;
