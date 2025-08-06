import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, handleSelectImage }) => {
  const list = images.map(
    ({ description, id, urls: { small, regular }, likes }) => {
      const handleClick = () =>
        handleSelectImage({ src: regular, likes, description });

      return (
        <li key={id} className={css.card}>
          <ImageCard
            src={small}
            alt={description || 'picture'}
            onClick={handleClick}
          />
        </li>
      );
    }
  );

  return <ul className={css.list}>{list}</ul>;
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      description: PropTypes.string,
      urls: PropTypes.shape({
        regular: PropTypes.string.isRequired,
        small: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
