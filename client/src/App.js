import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import NewsState from './context/news/NewsState';

import Categories from './components/layout/Categories';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import News from './components/news/News';
import NewsItem from './components/news/NewsItem';
import SuggestNews from './components/news/SuggestNews';

function App() {
  return (
    <NewsState>
      <Router>
        <Navbar />
        <div className='container'>
          <Categories />
          <div className='news-grid'>
            <Sidebar />
            <div>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route
                  exact
                  path='/(sports|entertainment|business|health|science|technology)/'
                  component={News}
                />
                <Route
                  exact
                  path='/news/:id'
                  render={props => <NewsItem props={NewsItem} />}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
          <SuggestNews />
        </div>
      </Router>
    </NewsState>
  );
}

export default App;
