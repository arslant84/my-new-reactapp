import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './SearchBar.module.css';

const schema = z.object({
  query: z.string().min(2, 'Введите минимум 2 символа'),
});

const SearchBar = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    onSearch(data.query);
    reset();
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Search for images..."
        className={styles.input}
        {...register('query')}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
      {errors.query && <span className={styles.error}>{errors.query.message}</span>}
    </form>
  );
};

export default SearchBar; 