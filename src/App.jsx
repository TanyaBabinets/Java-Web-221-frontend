import { useState } from 'react'

import './App.css'
import './style.css'

function App() {

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [emails, setEmails] = useState([""]);
  const [phones, setPhones] = useState([""]);
  const [regdate, setRegdate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);

  const addEmail = () => {
    setEmails([...emails, ""])
  }
  const addPhone = () => {
    setPhones([...phones, ""])
  }
  const emailChange = (e, index) => {
    const updateEmails = [...emails];
    updateEmails[index] = e.target.value;
    setEmails(updateEmails);
  }


  const phoneChange = (e, index) => {
    const updatePhones = [...phones];
    updatePhones[index] = e.target.value;
    setPhones(updatePhones);
  }
  //проверка одного емейла
  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //проверка массива
  const checkEmails = (emails) => {
    const errors = emails.map((email, index) => {
      if (!checkEmail(email)) {
        return `Email ${index + 1} has wrong format`;
      }
      return null;
    });
    return errors.filter(error => error !== null);
  }


  const checkPassword = () => {
    const passwordRegex = /^(?=.*[A-Z]).{5,}$/; // Не менее 5 символов, 1 заглавная буква
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 5 characters long and contain at least one capital letter."
      );
      return false;
    }
    if (password !== passwordC) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };



  const sendForm = () => {
    const emailErrors = checkEmails(emails);
    if (emailErrors.length > 0) {
      setEmailErrors(emailErrors);
      return;
    }
    if (!checkPassword()) {
      return;
    }

    const data = {
      name, login, emails: emails.join(", "), phones: phones.join(", "), regdate, password, city
    };
    console.log(data);
    fetch("http://localhost:8081/javaweb221/home", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    )
      .then(r => r.json())
      .then(j => {
        console.log(j);
      });
  }
  return (
    <>
      <input value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name" />
      <br />
      <input value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="Enter your login" />
      <br />



      {emails.map((email, index) => (
        <div>
          <input key={index} type='email'
            value={email}
            className="input-email"
            onChange={(e) => emailChange(e, index)}
            placeholder="Enter your email" />
          {emailErrors[index] &&
            (
              <p style={{ color: "red" }}>{emailErrors[index]}</p>
            )}

        </div>
      ))}

      <br />
      <button onClick={addEmail}>Add additional email</button>

      <br />
      {phones.map((phone, index) => (
        <input key={index} type='text'
          value={phone}
          className="input-email"
          onChange={(e) => phoneChange(e, index)}
          placeholder="Enter your phone" />
      ))}
      <br />
      <button onClick={addPhone}>Add additional Phone</button>
      <br />
      <input type='date' value={regdate}
        onChange={e => setRegdate(e.target.value)}
        placeholder="Registration date" />
      <br />
      <input type='password' value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password" />
      <br />
      <input type='password' value={passwordC}
        onChange={e => setPasswordC(e.target.value)}
        placeholder="Confirm your password" />
      <br />
      <input type='text' value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter your city" />
      <br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={sendForm}>Register</button>


    </>
  )
}

export default App
