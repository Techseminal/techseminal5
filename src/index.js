import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import { Switch, Route } from 'react-router-dom';
import { auth, firestore } from './firebase/firebase-utils';
import ExplorePage from './ExplorePage';
import FullBlog from './FullBlog'
import UploadBlog from './UploadBlog'
import Profile from './Profile'
import Notifications from './Notifications'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);


function App() {
  const [user, setuser] = useState(null);
  const [saved, setsaved] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setuser(user)
    })
  });
  useEffect(() => {
    if (user) {
      firestore.collection('Users').doc(user.uid).onSnapshot(doc => {
        setsaved(doc.data().saved)
      })
    }
  }, [user])
  return (
    <Switch>
      <Route path='/' exact render={() => <ExplorePage user={user} saved={saved} />} />
      <Route path="/notifications" exact render={() => <Notifications user={user}/>}/>
      <Route path="/upload" exact render={() => <UploadBlog user={user}/>}/>
      <Route path="/profile" exact render={() => <Profile user={user} saved={saved}/>}/>
      <Route path="/:id" exact render={() => <FullBlog user={user} saved={saved} />} />
    </Switch>
  )
}


export default App;
