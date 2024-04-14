import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
const Navigation = () => {
  return (
    <header className={css['NavBox']}>
      <nav className={css['Nav']}>
        <ul className={css['NavList']}>
          <li>
            <NavLink to="/" className={css['NavListItem']}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={css['NavListItem']}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
