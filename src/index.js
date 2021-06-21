import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom';
import { auth } from './firebase/firebase-utils';
import ExplorePage from './ExplorePage';
import FullBlog from './FullBlog'
import UploadBlog from './UploadBlog'
import Profile from './Profile'

ReactDOM.render(
    <Router>
      <App/>
    </Router>,
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
            <Route path="/upload" exact render={() => <UploadBlog user={user}/>} />
            <Route path="/profile" exact render={() => <Profile user={user}/>} />
            <Route path="/:id" exact render={() => <FullBlog user={user}/>} />
        </Switch>
    )
}

export default App;
