import ErrorBoundary from "./ErrorBoundary";
import useWebSocket from "react-use-websocket";
import { useEffect, useRef, useState, useCallback } from "react";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";

const renderCursors = (users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];
    // if cursor sent normalized coords (rx/ry), convert later in outer scope
    const rx = user?.state?.cursor?.rx;
    const ry = user?.state?.cursor?.ry;
    const x = user?.state?.cursor?.x ?? null;
    const y = user?.state?.cursor?.y ?? null;
    return { uuid, rx, ry, x, y };
  });
};

const renderUsersList = (users) => {
  return (
    <ul>
      {Object.keys(users).map((uuid) => {
        return <li key={uuid}>{JSON.stringify(users[uuid])}</li>;
      })}
    </ul>
  );
};

export default function Home({ username }) {
  const WS_URL = "ws://localhost:8000";

  // maintain a local users map so we can merge incremental updates
  const [usersMap, setUsersMap] = useState({});
  const [myUuid, setMyUuid] = useState(null);

  // Build explicit URL with username to ensure server receives it reliably
  const wsUrlWithUser = `${WS_URL}?username=${encodeURIComponent(username)}`;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsUrlWithUser, {
    onError: (error) => console.error("🕸️🚨 WS error:", error),
    onClose: () => console.warn("🕸️⛓️‍💥 WS connection closed."),
  });

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Ensure we always send a consistent message shape: { cursor: { x,y } }
  useEffect(() => {
    if (!sendJsonMessage) return;
    sendJsonMessageThrottled.current = throttle((payload) => {
      sendJsonMessage(payload);
    }, THROTTLE);

    // initialize cursor to center (rx:0.5, ry:0.5)
    sendJsonMessage({ cursor: { rx: 0.5, ry: 0.5 } });

    const onMove = (e) => {
      const { clientX, clientY } = e;
      const rx = clientX / window.innerWidth;
      const ry = clientY / window.innerHeight;
      if (sendJsonMessageThrottled.current)
        sendJsonMessageThrottled.current({ cursor: { rx, ry } });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (
        sendJsonMessageThrottled.current &&
        sendJsonMessageThrottled.current.cancel
      )
        sendJsonMessageThrottled.current.cancel();
    };
  }, [sendJsonMessage]);

  // Process incoming server messages (either an aggregated users map or a single userState update)
  useEffect(() => {
    if (!lastJsonMessage) return;

    // If server sends { type: 'users', users: { ... } }
    if (lastJsonMessage.type === "users" && lastJsonMessage.users) {
      setUsersMap(lastJsonMessage.users);
      // update container size on full snapshot (in case client resized before snapshot)
      setContainerSize({ width: window.innerWidth, height: window.innerHeight });
      return;
    }

    // If server sends welcome with assigned uuid
    if (lastJsonMessage.type === "welcome" && lastJsonMessage.uuid) {
      setMyUuid(lastJsonMessage.uuid);
      return;
    }

    // If server sends a single user update: { type: 'userState', uuid, username, state }
    if (lastJsonMessage.type === "userState") {
      const { uuid, username: uname, state } = lastJsonMessage;
      setUsersMap((prev) => ({
        ...prev,
        [uuid]: { username: uname || prev[uuid]?.username, state },
      }));
      return;
    }

    // Backwards compatibility: if server sent a raw users object
    if (typeof lastJsonMessage === "object" && !lastJsonMessage.type) {
      setUsersMap(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  if (Object.keys(usersMap).length > 0) {
    return (
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {renderUsersList(usersMap)}
        {renderCursors(usersMap)
          .filter((r) => r && r.uuid !== myUuid)
          .map((r) => {
            const x = r.x != null ? r.x : (r.rx || 0) * containerSize.width;
            const y = r.y != null ? r.y : (r.ry || 0) * containerSize.height;
            return <Cursor key={r.uuid} userId={r.uuid} point={[x, y]} />;
          })}
      </div>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>
      <ErrorBoundary fallback={<p>Fail to load username.</p>}>
        <p>Welcome, {username}!</p>
      </ErrorBoundary>
    </div>
  );
}
