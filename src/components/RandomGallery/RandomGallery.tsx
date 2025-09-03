import { useEffect, useState } from 'react';
import { getArtworks } from '@/services/api';
import { ArtWork } from '@/types/types';
import { MiniCard } from '@/components/MiniCard/MiniCard';

import styles from './RandomGallery.module.scss';

export const RandomGallery = () => {
  const [result, setResult] = useState<ArtWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSearch = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      const data = await getArtworks(page, limit);
      setResult(data.works);
    } catch (error) {
      console.error('Fetching error:', error);
      return <h3>Sorry, something happened :(</h3>;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const page = Math.floor(Math.random() * 1000);
    const limit: number = 9;
    onSearch(page, limit);
  }, []);

  return (
    <section className={styles.section}>
      <h4 className={styles.heading}>Here some more</h4>
      <h2 className={styles.heading}>Other works for you</h2>
      {isLoading ? (
        <p className={styles.loading}> Loading... </p>
      ) : (
        <>
          <section className={styles.mainSide}>
            {result.map((card: ArtWork) => (
              <MiniCard key={card.id} card={card} />
            ))}
          </section>
        </>
      )}
    </section>
  );
};
