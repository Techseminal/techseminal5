import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ExplorePage from './ExplorePage';
import FullBlog from './FullBlog'
import UploadBlog from './UploadBlog'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' exact component={ExplorePage} />
        <Route path="/upload" exact component={UploadBlog} />
        <Route path="/:id" exact component={FullBlog} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
