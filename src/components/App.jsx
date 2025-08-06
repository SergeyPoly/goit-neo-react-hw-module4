import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { PulseLoader as Loader } from 'react-spinners';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import { fetchImagesWithQuery } from '../unsplash-api';
import './App.css';

const notifyEmptySearch = () =>
  toast.error('Please enter text to start search');
const notifyFetchError = e => toast.error(`Error fetching data: ${e}`);

function App() {
  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
  });
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      const { query, page } = searchParams;
      if (query) {
        try {
          setError(false);
          setLoading(true);
          const data = await fetchImagesWithQuery({ ...searchParams });
          setImages(prev =>
            page === 1 ? data.results : [...prev, ...data.results]
          );
          setTotal(data.total);
        } catch (error) {
          notifyFetchError(error.message);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchImages();
  }, [searchParams]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const { query } = form.elements;
    const trimedQuery = query.value.trim();

    if (!trimedQuery) {
      notifyEmptySearch();
      return;
    }

    if (trimedQuery.toLowerCase() !== searchParams.query.toLowerCase()) {
      setImages([]);
      setTotal(0);
      setSearchParams({ query: trimedQuery, page: 1 });
    }
  };

  const handleLoadMore = () => {
    setSearchParams(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const handleSelectImage = imageData => {
    setSelectedImageData(imageData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImageData(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error ? (
        <ErrorMessage text="Whoops, something went wrong! Please try again!" />
      ) : (
        <ImageGallery images={images} handleSelectImage={handleSelectImage} />
      )}
      <Loader
        loading={loading}
        cssOverride={{ margin: '20px auto', textAlign: 'center' }}
        aria-label="Loading Spinner"
      />
      {images.length > 0 && images.length < total && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
      <ImageModal
        isOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        selectedImageData={selectedImageData}
      />
    </>
  );
}

export default App;
