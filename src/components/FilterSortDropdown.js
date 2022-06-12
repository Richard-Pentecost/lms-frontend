import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'qs';
import FilterSortDropdownLink from './FilterSortDropdownLink';
import classes from '../style/FilterSortDropdown.module.scss';

const FilterSortDropdown = ({ regions }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
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
        search && <span onClick={() => navigate('/home')} className={classes.clearLink}>Clear Filters and Search</span>
      }
      {
        isActive && (
          <nav className={classes.dropdown} ref={filterDropdownRef}>
            <ul className={classes.dropdown__list}>
              <li className={classes.dropdownHeading}>
                <span className={classes.dropdownHeading__title}>Filter</span>
              </li>
              {
                regions && regions.map(region => (
                  <FilterSortDropdownLink 
                    key={region.uuid}
                    handleClick={handleClick} 
                    link={buildFilterQueryString('filter', region.regionName)}
                  >{region.regionName}</FilterSortDropdownLink>
                ))
              }
            </ul>
            <ul className={classes.dropdown__list}>
              <li className={classes.dropdownHeading}>
                <span className={classes.dropdownHeading__title}>Sort</span>
              </li>
              <FilterSortDropdownLink 
                handleClick={handleClick} 
                link={buildSortQueryString('sort', 'z-a')}
              >Z - A</FilterSortDropdownLink>
            </ul>
          </nav>
        )
      }
    </div>
  )
}

export default FilterSortDropdown;
