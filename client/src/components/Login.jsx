import { useState } from "react";

export default function Login({ onSubmit }) {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting login with username:", username);
    onSubmit({ username });
  };

  return (
    <>
      <h1>Login</h1>
      <p>What should people call you?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        {/* <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        /> */}
        <button type="submit">Login</button>
      </form>
    </>
  );
}
