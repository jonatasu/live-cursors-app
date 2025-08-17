import { useState } from "react";
// import './App.css'
import Login from "./components/Login";
import Home from "./Home";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [username, setUsername] = useState("");

  const handleSubmit = ({ username }) => {
    if (username) {
      setUsername(username);
    }
  };

  return !!username ? (
    <ErrorBoundary fallback={<p>Fail to render Home.</p>}>
      <Home username={username} />
    </ErrorBoundary>
  ) : (
    <ErrorBoundary fallback={<p>Fail to render Login.</p>}>
      <Login onSubmit={handleSubmit} />
    </ErrorBoundary>
  );
}

export default App;
