
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import User from './components/User';
import { Provider } from 'react-redux';
import appStore from './components/utils/appStore';


function App() {
  return (
    <Provider store={appStore}>
    <div className="App flex flex-row bg-slate-950">
      <Router>
      <div>
      <NavBar/>
      </div>
      <div className='ml-24'>
      <Header/>  
      <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/user" element={<User />} />
      </Routes>
      </div>
      </Router>
     </div>
    </Provider>
  );
}

export default App;
