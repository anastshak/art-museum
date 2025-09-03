import museumLogo from '@/assets/museum-logo-light-bg.svg';
import modsenLogo from '@/assets/modsen-logo.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <img src={museumLogo} alt="museum logo" />
      </div>

      <div>
        <img src={modsenLogo} alt="modsen logo" />
      </div>
    </footer>
  );
};
