import ErrorBoundary from "./components/ErrorBoundary";

export default function Home({ username }) {
  return (
    <div>
      <h1>Home Page</h1>
      <ErrorBoundary fallback={<p>Fail to load username.</p>}>
        <p>Welcome, {username}!</p>
      </ErrorBoundary>
    </div>
  );
}
