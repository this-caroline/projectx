import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import Post from './pages/Post';
import Logout from './pages/Logout';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route  path="/" exact render={props=> (<Login{...props}/>)}/>
      <Route  path="/List" exact render={props=> (<List{...props}/>)}/>
      <Route  path="/Post" exact render={props=> (<Post{...props}/>)}/>
      <Route  path="/Logout" exact render={props=> (<Logout{...props}/>)}/>
    </Switch>
  </BrowserRouter>
  );
}
export default App;
