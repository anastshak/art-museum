import { ArtWorkCards, ArtWorkInfo, Data } from '@/types/types';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export async function getArtworks(page: number = 1, limit: number = 12): Promise<Data> {
  return fetch(`${BASE_URL}?page=${page}&limit=${limit}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => ({
      works: result.data,
      totalPages: result.pagination.total_pages,
    }))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}

export async function searchArtworks(search: string = ''): Promise<ArtWorkCards> {
  return fetch(`${BASE_URL}/search?q=${search}&size=3`)
    .then((response) => {
      return response.json();
    })
    .then((result) => ({
      works: result.data,
    }))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}

const FIELDS = [
  'id',
  'image_id',
  'title',
  'artist_title',
  'is_on_view',
  'date_display',
  'artist_display',
  'credit_line',
  'on_loan_display',
  'dimensions',
];

export async function getArtwork(id: string): Promise<ArtWorkInfo> {
  return fetch(`${BASE_URL}/${id}?fields=${FIELDS}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => ({
      data: result.data,
    }))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}
