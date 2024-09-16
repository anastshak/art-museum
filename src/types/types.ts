export type ArtWork = {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  is_on_view: boolean;
};

export interface ArtWorkCards {
  works: ArtWork[];
  totalPages: number;
}
