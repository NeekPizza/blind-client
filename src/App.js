import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:4001';

function App() {
  const [response, setResponse] = useState('');
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    socket.on('hello', (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  const submitName = (event) => {
    event.preventDefault();
    setPlayerName(event.target[0].value);
  };

  return (
    <React.Fragment>
      <p>server response: {response}</p>
      <p>name: {playerName || 'None submitted yet'}</p>
      {!playerName && (
        <div>
          <form onSubmit={submitName}>
            <div>
              <label htmlFor="name">Enter your name: </label>
              <input id="name" type="text" name="name" />
            </div>
            <div>
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
