import bookmark from '@/assets/bookmark.svg';

import styles from './Bookmark.module.scss';

export const Bookmark = () => {
  return (
    <div className={styles.icon}>
      <img src={bookmark} alt="bookmark icon" />
    </div>
  );
};
