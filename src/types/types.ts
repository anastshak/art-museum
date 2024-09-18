export type ArtWork = {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  is_on_view: boolean;
};

export interface ArtWorkInfo {
  data: ArtWork;
}
export interface ArtWorkCards {
  works: ArtWork[];
}

export interface Data {
  works: ArtWork[];
  totalPages: number;
}
