import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  return (
    <header className={css.header}>
      <form onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
