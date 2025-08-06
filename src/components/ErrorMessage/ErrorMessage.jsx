import PropTypes from 'prop-types';
import css from './ErrorMessage.module.css';

const ErrorMessage = ({ text }) => {
  return <p className={css.text}>{text}</p>;
};

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorMessage;
