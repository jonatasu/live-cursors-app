import ErrorBoundary from "./components/ErrorBoundary";
import useWebSocket from "react-use-websocket";
import { useEffect, useRef } from "react";
import throttle from "lodash.throttle";

export default function Home({ username }) {
  const WS_URL = "ws://localhost:8000";

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000,
    reconnectAttempts: 5,
    onError: (error) => console.error("🕸️🚨 WS error:", error),
    onReconnect: () => console.log("🕸️  WS reconnected."),
    onOpen: () => console.info("🕸️✅ WS connection established."),
    onClose: () => console.warn("🕸️⛓️‍💥 WS connection closed."),
    // onMessage: (message) => console.info("🕸️👍 WS message received:", message),
  });

  const THROTTLE = 50;
  const throttledSendMessage = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      throttledSendMessage.current({
        cursor: { type: "mousemove", clientX, clientY },
      });
    });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <ErrorBoundary fallback={<p>Fail to load username.</p>}>
        <p>Welcome, {username}!</p>
      </ErrorBoundary>
    </div>
  );
}
