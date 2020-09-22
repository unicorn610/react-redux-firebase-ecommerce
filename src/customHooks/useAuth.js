import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = props => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  return currentUser;
};

export default useAuth;
