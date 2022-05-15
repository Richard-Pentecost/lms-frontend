import { useEffect, useRef, useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'qs';
import classes from '../style/FilterSortDropdown.module.scss';
import '../style/NavLink.css';

const FilterSortDropdown = ({ regions }) => {
  const { search } = useLocation();
  const history = useNavigate();
  const filterDropdownRef = useRef();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const pageClickEvent = event => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    };

    return () => window.removeEventListener('click', pageClickEvent);
  }, [isActive]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const buildSortQueryString = (operation, value) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });

    let newQueryParams;
    if (Object.keys(currentQueryParams).includes(operation)) {
      const { sort, ...queryWithoutSort } = currentQueryParams;
      newQueryParams = queryWithoutSort;
    } else {
      newQueryParams = {
        ...currentQueryParams,
        [operation]: value,
      };
    }
    
    return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
  };


  const buildFilterQueryString = (operation, value) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    
    const removeFilter = () => {
      const filterArr = currentQueryParams[operation].split(',');
      const index = filterArr.indexOf(value);
      filterArr.splice(index, 1);
      return filterArr.join(',')
    };

    let newValue = value;
    if (currentQueryParams[operation] && operation === 'filter') {
      const existingFilterValue = currentQueryParams[operation].includes(value);
      newValue = existingFilterValue ? removeFilter() : `${currentQueryParams[operation]},${value}`;
    }

    let newQueryParams;
    if (newValue) {
      newQueryParams = {
        ...currentQueryParams,
        [operation]: newValue,
      };
    } else {
      const { filter, ...queryWithoutFilter } = currentQueryParams;
      newQueryParams = queryWithoutFilter;
    }

    return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
  };

  return (
    <div className={classes.container}>
      <button className={classes.btn} onClick={handleClick}>
        <span className={classes.btn__text}>Filter / Sort</span>
        <span className={classes.btn__icon}>
          { isActive ?
            <FontAwesomeIcon icon={'chevron-up'} /> :
            <FontAwesomeIcon icon={'chevron-down'} />
          }
        </span>
      </button>
      {
        search && <span onClick={() => history.push('/home')} className={classes.clearLink}>Clear Filters and Search</span>
      }
      {
        isActive && (
          <nav className={classes.dropdown} ref={filterDropdownRef}>
            <ul className={classes.dropdown__list}>
              <li className={classes.dropdownLink}>
                <span className={classes.dropdownLink__title}>Filter</span>
              </li>
              {
                regions && regions.map(region => (
                  <li key={region.uuid} onClick={handleClick} className={classes.dropdownLink}>
                    <NavLink to={buildFilterQueryString('filter', region.regionName)} className={classes.dropdownLink__link}>
                      {region.regionName}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
            <ul className={classes.dropdown__list}>
              <li className={classes.dropdownLink}>
                <span className={classes.dropdownLink__title}>Sort</span>
              </li>
              <li onClick={handleClick} className={classes.dropdownLink}>
                <NavLink to={buildSortQueryString('sort', 'z-a')} className={classes.dropdownLink__link} activeClassName="is-active">
                  Z - A
                </NavLink>
              </li>
            </ul>
          </nav>
        )
      }
    </div>
  )
}

export default FilterSortDropdown;
