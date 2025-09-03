import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getArtwork } from '@/services/api';
import { ArtWork } from '@/types/types';
import noImage from '@/assets/noImage.svg';
import { Bookmark } from '@/components/Bookmark/Bookmark';

import styles from './MainArtwork.module.scss';

export const MainArtwork = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [cardInfo, setCardInfo] = useState<ArtWork>();

  const imageURL = `https://www.artic.edu/iiif/2/${cardInfo?.image_id}/full/843,/0/default.jpg`;
  const image = cardInfo?.image_id ? imageURL : noImage;

  const repository = cardInfo?.on_loan_display ? cardInfo.on_loan_display : 'Private collections';

  const onSearch = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await getArtwork(id);
      setCardInfo(result.data);
    } catch (error) {
      console.error('Fetching error:', error);
      return <h3>Sorry, something happened :(</h3>;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      onSearch(id);
    }
  }, [id]);

  return (
    <section className={styles.main}>
      {isLoading ? (
        <p className={styles.loading}> Loading... </p>
      ) : (
        <>
          <div className={styles.imgBlock}>
            <img className={styles.image} src={image} alt={cardInfo?.title} />
            <div className={styles.mark}>
              <Bookmark id={cardInfo?.id || 0} />
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.info}>
              <h3>{cardInfo?.title}</h3>
              <h4>{cardInfo?.artist_title}</h4>
              <h5>{cardInfo?.date_display}</h5>
            </div>
            <div className={styles.overview}>
              <h3>Overview</h3>
              <h6>
                <span>Artist nationality: </span> {cardInfo?.artist_display}
              </h6>
              <h6>
                <span>Sheet Dimensions: </span> {cardInfo?.dimensions}
              </h6>
              <h6>
                <span>Credit Line: </span> {cardInfo?.credit_line}
              </h6>
              <h6>
                <span>Repository: </span>
                {repository}
              </h6>
              <h6>{cardInfo?.is_on_view ? 'Public' : 'Private'}</h6>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
