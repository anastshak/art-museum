import { ArtWork } from '@/types/types';
import { Card } from '@/components/Card/Card';

import styles from './CardsList.module.scss';

type Props = {
  cards: ArtWork[];
};

export default function CardList({ cards }: Props) {
  if (cards.length === 0) {
    return <h1 className={styles.noResult}>No characters found</h1>;
  }

  return (
    <>
      <main className={styles.cardList}>
        {cards.map((card: ArtWork) => (
          <Card key={card.id} card={card} />
        ))}
      </main>
    </>
  );
}
