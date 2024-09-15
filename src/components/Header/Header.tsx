import museumLogo from '@/assets/museum-logo-dark-bg.svg';
import bookmark from '@/assets/bookmark.svg';
import home from '@/assets/home.svg';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div>
        <img src={museumLogo} alt="museum logo" />
      </div>

      <nav className={styles.navigation}>
        {pathname !== '/' ? (
          <NavLink to="/" className={styles.link}>
            <img src={home} alt="home icon" />
            <span>Home</span>
          </NavLink>
        ) : null}

        <NavLink to="/favorites" className={styles.link}>
          <img src={bookmark} alt="bookmark icon" />
          <span>Your favorites</span>
        </NavLink>
      </nav>
    </header>
  );
};
