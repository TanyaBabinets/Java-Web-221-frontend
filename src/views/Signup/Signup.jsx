import { useState } from 'react';
///import './style.css'

export default function Signup() {

  const [timestamp, setTimestamp] = useState("--");
  const [name, setName] = useState("user1");
  const [login, setLogin] = useState("userlogin1");
  const [email, setEmail] = useState("user1@i.ua");
  const [phone, setPhone] = useState("111222");
  const [regdate, setRegdate] = useState("");
  const [password, setPassword] = useState("123");
  const [age, setAge] = useState("22");
  const [city, setCity] = useState("Odessa");

  const loadTimestamp = () => {
    fetch("http://localhost:8082/javaweb221/home")
      .then(r => r.json())
      .then(j => setTimestamp(j.message));
  
  }
    const sendForm = () => {
      const data = {
        name,
        login,
        email,
        phone,
        regdate,
        password,
        age,
        city
      };
      fetch(
        "http://localhost:8082/javaweb221/home", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      )
        .then(r => r.json())
        .then(console.log);

      console.log(data);
    }

    return (
      <>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name" />
        <br />
        <input
          type='text'
          value={login}
          onChange={e => setLogin(e.target.value)}
          placeholder="Enter your login" />
        <br />
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter tour E-mail" />
        <br />

        <input
          type='date'
          value={regdate}
          onChange={e => setRegdate(e.target.value)}
          placeholder="Registration date" />
        <br />

        <input
          type='text'
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Your phone" />
        <br />

        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="*********" />
        <br />
        <input
          type='number'
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Your age" />
        <br />
        <input
          type='text'
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Your city" />
        <br />

        <button onClick={sendForm}>Register</button>
        <p>{timestamp}</p>
      </>
    );
  }

