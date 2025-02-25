import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home    from './views/Home/Home';
import Profile from './views/Profile/Profile';
import Signin  from './views/Signin/Signin';
import Signup  from './views/Signup/Signup';
import './style.css'
import AppContext from './AppContext';



function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  return <AppContext.Provider value={{user, setUser, request, accessToken, setAccessToken}}> 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  </AppContext.Provider>;
}

const request = (url, conf) => new Promise( (resolve, reject) => {
  const backHost = "http://localhost:8082/javaweb221";
  ///если в контексте есть токен, то 
  if (accessToken && accessToken.accessTokenId) { 
    if (!conf) { 
      conf = {};
    }
    if (!conf.header) { 
      conf.headers = {}
    }
    if (!conf.header["Authorization"]) {
      conf.headers["Authorization"] = "Bearer " + accessToken.accessTokenId;
    }

  }
  fetch(backHost + url, conf)
  .then( r=> r.json() )
  .then( j => {
    if( j.status < 300 ) {
      resolve( j.data );
    }
    else {
      reject( j );
    }
  })
  .catch( reject );
});

export default App
