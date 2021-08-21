import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/SearchBar.module.scss';

const SearchBar = () => {
  const searchRef = useRef();
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log(searchRef.current.value);
  }

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
