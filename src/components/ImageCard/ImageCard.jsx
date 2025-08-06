import PropTypes from 'prop-types';
import css from './ImageCard.module.css';

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img src={src} alt={alt} />
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
