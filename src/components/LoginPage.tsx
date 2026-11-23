import React from 'react';
import LibraryButton from './LibraryButton';

function LoginPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function checkLogin() {
    alert('Username : ' + username + 'Password : ' + password);
  }

  return (
    <div>
      <label>Username:</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Please enter your name" />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <div>
        <LibraryButton onClick={checkLogin} />
      </div>
    </div>
  );
}

export default LoginPage;