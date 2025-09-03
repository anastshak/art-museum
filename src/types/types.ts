export type ArtWork = {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  is_on_view: boolean;
  date_display: string;
  artist_display: string;
  dimensions: string;
  credit_line: string;
  on_loan_display: string;
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
