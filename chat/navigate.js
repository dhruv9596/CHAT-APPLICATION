/* Import Redux */
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {loadUser} from './src/store/actions/authActions';
import {handleDispatchMsg} from './src/store/actions/chatAction';

const Navigate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(handleDispatchMsg());
  }, []);
}

export default Navigate;