import { useState } from 'react';
import classNames from 'classnames';
import { useFavStorageContext } from '@/hooks/useFavStorageProvider';
import bookmark from '@/assets/bookmark.svg';
import bookmarkFill from '@/assets/bookmark-fill.svg';

import styles from './Bookmark.module.scss';

interface Props {
  id: number;
}

export const Bookmark = ({ id }: Props) => {
  const favStorageContext = useFavStorageContext();
  const [isFav, setToFav] = useState<boolean>(favStorageContext.check(id));

  const handleClick = (id: number) => {
    setToFav(!isFav);
    if (isFav) {
      favStorageContext.remove(id);
    } else {
      favStorageContext.save(id);
    }
  };

  return (
    <div
      className={classNames(styles.icon, isFav ? styles.active : '')}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleClick(id);
      }}
    >
      {isFav ? <img src={bookmarkFill} alt="bookmark filled icon" /> : <img src={bookmark} alt="bookmark icon" />}
    </div>
  );
};
