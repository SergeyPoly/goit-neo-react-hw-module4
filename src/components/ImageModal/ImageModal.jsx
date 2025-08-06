import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import css from './ImageModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '0',
    padding: '0',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const ImageModal = ({ isOpen, handleCloseModal, selectedImageData }) => {
  const content = selectedImageData ? (
    <div className={css.container}>
      <div className={css.image}>
        <img
          src={selectedImageData.src}
          alt={selectedImageData.description || 'picture'}
        />
      </div>
      <div className={css.text}>
        <p>{selectedImageData.description || 'Just some picture'}</p>
        <p className={css.likes}>{`Likes: ${selectedImageData.likes}`}</p>
      </div>
    </div>
  ) : (
    <div className={css.text}>
      <p>No content</p>
    </div>
  );

  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleCloseModal}
    >
      {content}
    </ReactModal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  selectedImageData: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      description: PropTypes.string,
    }),
    PropTypes.oneOf([null]),
  ]),
};

export default ImageModal;
