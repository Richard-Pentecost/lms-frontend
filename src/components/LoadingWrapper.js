import Spinner from '../components/Spinner';

const LoadingWrapper = ({ children, loading }) => (
  loading ? <Spinner /> : children
);

export default LoadingWrapper;
