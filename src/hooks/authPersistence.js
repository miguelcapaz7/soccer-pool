import { auth } from '../firebase';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';

const authPersistence = () => {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('Session persistence set to local');
    })
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });
};

export default authPersistence;