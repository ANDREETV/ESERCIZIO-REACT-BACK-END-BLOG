

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import NewBlog from './components/NewProduct';
import Dettaglio from './components/Dettaglio';
import ErrorPage from './components/ErrorPage';
import NewUser from './components/Register';
import Login from './components/Login';
// import FooterHome from './components/Footer';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Header />
        <Routes>
            <Route index element={<Home />}  />
            <Route path='/new' element={<NewBlog/> } />
            <Route path='/dettaglio/:id' element={<Dettaglio /> } />
            <Route path='/register' element={<NewUser /> } />
            <Route path='/login' element={<Login /> } />
            <Route path='*' element={<ErrorPage /> } />
        </Routes>
        {/* <FooterHome /> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
