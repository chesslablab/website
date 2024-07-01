# API Connection

The ChesslaBlab website is also connected to the [PHP Chess API](https://github.com/chesslablab/chess-api), a REST-like API that provides chess functionality over an HTTP connection.

While the WebSocket server can handle multiple concurrent connections based on real-time commands, the API endpoints may take a little longer to execute — for example, a file download or a database query.
