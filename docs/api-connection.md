# API Connection

The ChesslaBlab website is also connected to the [PHP Chess API](https://github.com/chesslablab/chess-api) which is a REST-like API that provides chess functionality over an HTTP connection.

While the WebSocket server can handle multiple concurrent connections based on real-time commands, the API endpoints may take a little longer to execute — for example, a file download or a database query.

The environment variables required for the API can be found in the [assets/env.example.js](https://github.com/chesslablab/website/blob/main/assets/env.example.js) file.

```js

try {
  const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/opening`, {
    method: 'GET',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    }
  });
  const json = await res.json();
  // ...
} catch (error) {
  // ...
} finally {
  // ...
}
```

As a rule of thumb, the API requests are made synchronously like in the example above. The `await` operator is used to wait for the promise to be resolved inside a `try...catch...finally` statement. The `try`, `catch` and `finally` blocks are used to handle errors.
