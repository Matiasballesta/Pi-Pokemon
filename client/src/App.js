import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Componentes/Landing/LandingPage';
import Home from './Componentes/Home/Home';
import Details from './Componentes/Details/Details';
import Create from './Componentes/Create/Create';
import Notfound from './Componentes/Notfound/Notfound';
import Loading from './Componentes/Loading/Loading';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/loading' component={Loading}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/:id' component={Details}/>
      <Route exact path='/create' component={Create}/>
      <Route exact path='*' component={Notfound}/>
      
    </Switch>
    </BrowserRouter>
  )
}

export default App;
