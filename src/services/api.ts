import { ArtWorkCards } from '@/types/types';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export async function getArtworks(search: string = '', page: number = 1, limit: number = 12): Promise<ArtWorkCards> {
  return fetch(`${BASE_URL}?search?q=${search}&page=${page}&limit=${limit}`)
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
