import { useFavStorageContext } from '@/hooks/useFavStorageProvider';
import styles from './MainFavorites.module.scss';
import { getArtwork } from '@/services/api';
import { useEffect, useState } from 'react';
import { ArtWork } from '@/types/types';
import { MiniCard } from '../MiniCard/MiniCard';
import bookmark from '@/assets/bookmark.svg';

export const MainFavorites = () => {
  const favStorageContext = useFavStorageContext();
  const ids = favStorageContext.getAll();
  const [result, setResult] = useState<ArtWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = async () => {
    try {
      setIsLoading(true);

      const res = await Promise.all(
        ids.map(async (id) => {
          const arr = await getArtwork(id.toString());
          return arr.data;
        }),
      );
      setResult(res);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <>
      <section className={styles.main}>
        <div className={styles.heading}>
          <h1>Here Are Your </h1>
          <h2>
            <img src={bookmark} alt="bookmark icon" />
            <span>Favorites</span>
          </h2>
          <h4 className={styles.heading}>Saved by you</h4>
          <h3 className={styles.heading}>Your favorites list</h3>
        </div>
        {isLoading ? (
          <p className={styles.loading}> Loading... </p>
        ) : (
          <>
            {result.length > 0 ? (
              <div className={styles.searchResult}>
                {result.map((card: ArtWork) => (
                  <MiniCard key={card.id} card={card} />
                ))}
              </div>
            ) : (
              <h2 className={styles.noResult}>There is nothing in your favorites...</h2>
            )}
          </>
        )}
      </section>
    </>
  );
};
