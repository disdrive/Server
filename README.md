# Server

## API Endpoints

| URI             | Method | request                                           | response(success)                    |
| --------------- | ------ | ------------------------------------------------- | ------------------------------------ |
| `v1/test`       | GET    | N/A 　　                                          | `send('API is working!')`            |
| `v1/auth/login` | POST   | `body({userId, password})`                        | `json({ success: true, token: "" })` |
| `v1/file`       | GET    | `headers['authorization']` `query({userid, key})` | `download(filePath)`                 |
| `v1/file`       | POST   | `headers['authorization']` `multipart/form-data`  | `send()`                             |

## Source code dependent relationship visualization

![dependency-graph](https://raw.githubusercontent.com/disdrive/Server/main/dependency-graph.svg?token=GHSAT0AAAAAACJCCKJ7PHI3NL772JAAYV72ZJSQAMA)
