import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'qs';
import classes from '../style/SearchBar.module.scss';

const SearchBar = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const searchRef = useRef();
  
  const handleSubmit = event => {
    event.preventDefault();
    const searchValue = searchRef.current.value;
    const url = searchValue ? buildQueryString('query', searchValue) : '/'; 
    navigate(url);
  };

  const buildQueryString = (operation, value) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    const newQueryParams = {
      ...currentQueryParams,
      [operation]: value,
    };
    return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.searchBar}>
      <input 
        data-testid='search'
        className={classes.searchBar__input}
        type='text'
        ref={searchRef}
        placeholder='Search'
      />
      <button type='submit' className={classes.searchBar__btn}>
        <span className={classes.searchBar__btnIcon}><FontAwesomeIcon icon={'search'} /></span>
      </button>
    </form>
  )
}

export default SearchBar;
