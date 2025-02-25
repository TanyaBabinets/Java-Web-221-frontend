import { useContext, useState } from 'react';
import AppContext from '../../AppContext';
import { useNavigate } from 'react-router-dom';

export default function Signin() {    
    const [email, setEmail] = useState("user@i.ua");
    const [password, setPassword] = useState("123");
    const {setAccessToken, setUser, request} = useContext(AppContext);
    const navigate = useNavigate();

    const sendForm = () => {
        // rfc7617
        let data = email + ':' + password;
        let credentials = btoa(data);
        request('/user', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + credentials,
          },
        }).then( data => {
          setUser(data.user);
          setAccessToken(data.accessToken);
            navigate('/profile');
        }).catch( console.log );
    }

    return <form>
        <input 
            type='email'
            value={email} 
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail" />
          <br/>
          <input 
            type='password'
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="*********" />
          <br/>
          <button type='button' onClick={sendForm}>Вхід</button>
          
    </form>;
}