import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom'
import App from './App';

import {Switch, Route} from 'react-router-dom';
import { auth } from './firebase/firebase-utils';

import ExplorePage from './ExplorePage';
import FullBlog from './FullBlog'
import UploadBlog from './UploadBlog'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


function App() {
    const [user, setuser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setuser(user)
        })
    });
    return (
        <Switch>
            <Route path='/' exact render={() => <ExplorePage user={user}/>} />
            <Route path="/upload" exact component={UploadBlog} />
            <Route path="/:id" exact render={() => <FullBlog user={user}/>} />
        </Switch>
    )
}

export default App;