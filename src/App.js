import React, { useEffect, useState } from "react";
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:4001';

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    socket.on('hello', data => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <p>
      {response}
    </p>
  );
}

export default App;