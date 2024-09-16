import { Gallery } from '@/components/Gallery/Gallery';
import styles from './Main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>
        let's find some <span>art</span> here!
      </h1>
      <Gallery />
    </main>
  );
};
