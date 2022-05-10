import { useEffect, useRef, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'qs';
import classes from '../style/FilterSortDropdown.module.scss';

const FilterSortDropdown = ({ regions }) => {
  const { search } = useLocation();
  const filterDropdownRef = useRef();
  const [isActive, setIsActive] = useState(false);

  // console.log(search);
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


  const buildQueryString = (operation, value) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    // const existingFilterValue = currentQueryParams[operation];
    // const newValue = existingFilterValue && operation === 'filter' ? `${currentQueryParams[operation]},${value}`: value;
    const newQueryParams = {
      ...currentQueryParams,
      [operation]: value,
    };

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
        isActive && (
          <nav className={classes.dropdown} ref={filterDropdownRef}>
            <ul className={classes.dropdown__list}>
              <li className={classes.dropdownLink}>
                <span className={classes.dropdownLink__title}>Filter</span>
              </li>
              {
                regions && regions.map(region => (
                  <li key={region.uuid} onClick={handleClick} className={classes.dropdownLink}>
                    <NavLink to={buildQueryString('filter', region.regionName)} className={classes.dropdownLink__link}>
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
                <NavLink to={buildQueryString('sort', 'a-z')} className={classes.dropdownLink__link} activeClassName="active">
                  A - Z
                </NavLink>
              </li>
              <li onClick={handleClick} className={classes.dropdownLink}>
                <NavLink to={buildQueryString('sort', 'z-a')} className={classes.dropdownLink__link}>
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
