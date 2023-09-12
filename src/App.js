import { useState } from 'react';
import './App.css';

function App() {
  const [returnedData, setReturnedData] = useState(['Helloo!'])
  const [user, setUser] = useState({Username: '', Password: ''})

  const setInput = (e) => {
    const {name, value} = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const fetchData = async () => {
    console.log(user);
    const newData = await fetch('/api', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: user.Username
      })
    })
    .then(res => res.json());
    console.log(newData)
    setReturnedData(newData[0])
  }

  const createUser = async () => {
    const newData = await fetch('/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...user
      })
    })
    .then(res => res.json());
    console.log(newData)
    setReturnedData(newData[0])
  }

  return (
    <div className="App">
      <input type='text' name="Username" placeholder='Username' onChange={setInput} ></input>
      <input type='password' name='Password' placeholder='Password' onChange={setInput} ></input>
      <button onClick={() => fetchData()}>Click</button>
      <button onClick={() => createUser()}>Create</button>
      <p>Userid: {returnedData.userid}</p>
      <p>Username: {returnedData.username }</p>
      <p>Password: {returnedData.password}</p>
    </div>
  );
}

export default App;
