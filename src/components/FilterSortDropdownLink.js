import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from '../style/FilterSortDropdownLink.module.scss';

const FilterSortDropdownLink = ({ handleClick, link, children }) => {
  const { search } = useLocation();
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    const formattedSearchString = search.replace(/%20/g, '').toLowerCase();
    const filter = children.replace(/\s/g, '').toLowerCase();

    formattedSearchString.includes(filter) && setActiveFilter(true);
  }, [search, children]);

  return (
    <li onClick={handleClick} className={classes.dropdownLink}>
        <Link to={link} className={classes.dropdownLink__link}>
          {children}
        </Link>
        { activeFilter && (
          <span className={classes.dropdownLink__icon}>
            <FontAwesomeIcon icon={'check'} />
          </span> 
        )}
    </li>
  )
}

export default FilterSortDropdownLink;
