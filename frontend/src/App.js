import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import Post from './pages/Post';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route  path="/" exact render={props=> (<Login{...props}/>)}/>
      <Route  path="/List" exact render={props=> (<List{...props}/>)}/>
      <Route  path="/Post" exact render={props=> (<Post{...props}/>)}/>
    </Switch>
  </BrowserRouter>
  );
}
export default App;
