import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/index.css';
import 'semantic-ui-css/semantic.min.css';
import Homepage from './components/Homepage';
import Browse from './components/Browse';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import MyProfile from './components/MyProfile';
import registerServiceWorker from './registerServiceWorker';


const Root = () =>{
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ Homepage } />
        <Route path='/browse' component={ Browse } />
        <Route path='/about'  component={ About } />
        <Route path='/login'  component={ Login } />
        <Route path='/signup' component={ Signup } />
        <Route path='/profile' component={ MyProfile } />
      </Switch>
    </BrowserRouter>
  )
}



render(<Root/>, document.getElementById('root'));
registerServiceWorker();
