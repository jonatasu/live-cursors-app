import { useState } from "react";

export default function Login({ onSubmit }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username);
    console.log("🚀 ~ handleSubmit ~ username:", username);
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
        <button type="submit">Login</button>
      </form>
    </>
  );
}
