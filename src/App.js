import RoutesAPP from './routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="app">
      <RoutesAPP />
      <ToastContainer autoClose={4000}></ToastContainer>
    </div>
  );
}

export default App;
