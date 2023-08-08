# Server

## API Endpoints

| URI             | Method | request                                              | response(success)                    |
| --------------- | ------ | ---------------------------------------------------- | ------------------------------------ |
| `v1/test`       | GET    | N/A 　　                                             | `send('API is working!')`            |
| `v1/auth/login` | POST   | `body({userId, password})`                           | `json({ success: true, token: "" })` |
| `v1/file`       | GET    | `headers['authorization']` `query({accoundId, key})` | `download(filePath)`                 |
| `v1/file`       | POST   | `headers['authorization']` `multipart/form-data`     | `send()`                             |

## Source code dependent relationship visualization

![dependency-graph](https://github.com/disdrive/Server/assets/90281553/14506656-7601-40ca-a152-69e5e93639e2)
