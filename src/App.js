import React from 'react';
import { Router, Route, Switch } from "react-router";
import { Link } from 'react-router-dom'
import './styles/global.scss';
import history from './history'

import BookApp from './pages/BookApp.jsx'
import { About } from './pages/About.jsx'
import BookDetails from './pages/BookDetails.jsx'
import BookEdit from './pages/BookEdit.jsx'
import Home from './pages/Home.jsx' 




function App() {
  return (

    <Router history={history}>
      <div className="App">
        <header className="App-header">
          <div className="header-nav flex align-center space-between">
            <h1 className="logo">the bookshelf</h1>
            <div className="nav-links flex space-around">
              <Link to="/about">About</Link> |
              <Link to="/book">Store</Link>
            </div>
          </div>
        </header>
        <section className="main">
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/book"><BookApp></BookApp></Route>
            <Route path="/about"><About /></Route>
            <Route exact path="/book/:id" component={BookDetails}></Route>
            <Route path="/edit/:id?" component={BookEdit}></Route>

          </Switch>
        </section>
      </div>
    </Router>

  );
}

export default App;
