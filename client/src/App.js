import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import LandingPage from './Componentes/Landing/LandingPage';
import Home from './Componentes/Home/Home';
import Details from './Componentes/Details/Details';
import Create from './Componentes/Create/Create';
import Loading from './Componentes/Loading/Loading';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/loading' element={<Loading/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/home/:id' element={<Details/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='*' element={<Navigate to="/home"/>}/>
    </Routes>
  )
}

export default App;
