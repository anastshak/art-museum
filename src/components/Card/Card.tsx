import noImage from '@/assets/noImage.svg';
import { ArtWork } from '@/types/types';
import { Bookmark } from '@/components/Bookmark/Bookmark';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

interface Props {
  card: ArtWork;
}

export const Card = ({ card }: Props) => {
  const imageURL = `https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`;
  const image = card.image_id ? imageURL : noImage;

  return (
    <Link to={`/artwork/${card.id}`}>
      <div className={styles.card}>
        <div className={styles.imgBlock}>
          <img src={image} alt={card.title} />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.infoBoxArt}>
            <h3 className={styles.title}>{card.title}</h3>
            <h4 className={styles.artist}>{card.artist_title}</h4>
            <h5 className={styles.isOnView}>{card.is_on_view ? 'Public' : 'Private'}</h5>
          </div>
          <Bookmark />
        </div>
      </div>
    </Link>
  );
};
