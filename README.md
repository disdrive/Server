# Server

## API Endpoints

| URI             | Method  | request                                               | response(success)    　　           |
| --------------- | ------- | ----------------------------------------------------- | -------------------------------- |
| `v1/test`         | GET     | N/A    　　                                              | `send('API is working!')`        |
| `v1/auth/login`   | POST    | `body({userId, password})`                            | `json({ success: true, token })` |
| `v1/file`         | GET     | `headers['authorization']` `query({accoundId, key})`  | `download(filePath)`             |
| `v1/file`         | POST    | `headers['authorization']` `multipart/form-data`      | `send()`                         |

## Source code dependent relationship visualization

![](https://github.com/disdrive/Server/assets/90281553/f37cdae4-fbe4-47c1-a41a-f9a75e150d42)
