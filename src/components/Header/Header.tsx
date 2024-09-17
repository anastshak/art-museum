import museumLogo from '@/assets/museum-logo-dark-bg.svg';
import bookmark from '@/assets/bookmark.svg';
import home from '@/assets/home.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import classnames from 'classnames';

import styles from './Header.module.scss';

export const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState<boolean>();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={museumLogo} alt="museum logo" />
      </div>

      <nav className={classnames(styles.navigation, isOpen ? styles.active : '')}>
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

      <button onClick={() => setOpen(!isOpen)} className={classnames(styles.btn, isOpen ? styles.active : '')}>
        <div className={styles.burger1} />
        <div className={styles.burger2} />
      </button>
    </header>
  );
};
