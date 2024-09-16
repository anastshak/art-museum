import styles from './Gallery.module.scss';

import { getArtworks } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import { ArtWork } from '@/types/types';
import CardList from '@/components/CardsList/CardsList';

export const Gallery = () => {
  const [result, setResult] = useState<ArtWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = useCallback(
    async (searchQuery: string, page: number = 1, limit: number = 3) => {
      setPage(page);
      setSearchParams({ search: searchQuery, page: page.toString(), limit: limit.toString() });
      try {
        setIsLoading(true);
        const data = await getArtworks(searchQuery, page, limit);
        // console.log(data);
        setResult(data.works);
        // setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchParams],
  );

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const currPage = parseInt(searchParams.get('page') || '1', 10);

    if (page > 0) {
      setPage(currPage);
      onSearch(searchQuery, currPage);
    }
  }, [searchParams, onSearch, page]);

  return (
    <section className={styles.section}>
      <h4 className={styles.heading}>Topics for you</h4>
      <h2 className={styles.heading}>Our special gallery</h2>
      {isLoading ? (
        <Loader data-testid="loader" />
      ) : (
        <>
          <section className={styles.mainSide}>
            <CardList cards={result} />
          </section>
        </>
      )}
    </section>
  );
};
