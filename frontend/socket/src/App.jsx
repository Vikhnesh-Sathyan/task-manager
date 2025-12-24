import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [status, setStatus] = useState("Waiting for update...");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setStatus(data);
      setLogs((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const updateStatus = (newStatus) => {
    socket.emit("message", newStatus);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Live Service Tracking (Socket.IO)</h2>

      <h3>Current Status: {status}</h3>

      <button onClick={() => updateStatus("Accepted")}>Accepted</button>
      <button onClick={() => updateStatus("On the way")}>On the way</button>
      <button onClick={() => updateStatus("Completed")}>Completed</button>

      <hr />

      <h4>Status History</h4>
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
}

export default App;
