import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import searchImg from '@/assets/search.svg';
import { createValidationSchema, FormInput } from '@/utils/validationSchema';
import { useDebounce } from '@/hooks/useDebounce';
import { getArtwork, searchArtworks } from '@/services/api';
import { ArtWork } from '@/types/types';
import { MiniCard } from '../MiniCard/MiniCard';

import styles from './SearchBar.module.scss';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('search') || '');
  const [result, setResult] = useState<ArtWork[]>([]);

  const schema = createValidationSchema();
  const debouncedQuery: string = useDebounce(inputValue);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onChange', resolver: yupResolver(schema) });

  const fetchSearchResults = async (searchQuery: string) => {
    try {
      const data = await searchArtworks(searchQuery);
      const res: ArtWork[] = [];
      data.works.map(async (el) => {
        try {
          const arr = await getArtwork(el.id.toString());
          res.push(arr.data);
        } catch (error) {
          console.error('Search error:', error);
        }
      });
      setResult(res);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults(debouncedQuery);
  }, [debouncedQuery]);

  const onSubmit = (data: FormInput) => {
    searchParams.set('search', data.search);
    setSearchParams(searchParams);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
  };

  return (
    <>
      <form className={styles.searchBar} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('search')}
          className={styles.input}
          type="text"
          name="search"
          placeholder="Search art, artist, work..."
          value={inputValue}
          onChange={handleInputChange}
        />

        <button type="submit" className={styles.submit}>
          <img className={styles.icon} src={searchImg} alt="searchImg" />
        </button>
      </form>

      {errors.search && <p className={styles.error}>{errors.search.message}</p>}

      {inputValue && result.length > 0 && (
        <section className={styles.searchResult}>
          {result.map((card: ArtWork) => (
            <MiniCard key={card.id} card={card} />
          ))}
        </section>
      )}
    </>
  );
};
