import { Gallery } from '@/components/Gallery/Gallery';
import { RandomGallery } from '@/components/RandomGallery/RandomGallery';
import { SearchBar } from '@/components/SearchBar/SearchBar';

import styles from './Main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>
        let's find some <span>art</span> here!
      </h1>
      <SearchBar />
      <Gallery />
      <RandomGallery />
    </main>
  );
};
