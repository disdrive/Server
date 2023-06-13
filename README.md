# Server

## API Endpoints

| URI             | Method  | request                                               | response(success)    　　           |
| --------------- | ------- | ----------------------------------------------------- | -------------------------------- |
| `/test`         | GET     | N/A    　　                                              | `send('API is working!')`        |
| `/auth/login`   | POST    | `body({userId, password})`                            | `json({ success: true, token })` |
| `/file`         | GET     | `headers['authorization']` `query({accoundId, key})`  | `download(filePath)`             |
| `/file`         | POST    | `headers['authorization']` `multipart/form-data`      | `send()`                         |

## Source code dependent relationship visualization

![](https://github.com/disdrive/Server/assets/90281553/f37cdae4-fbe4-47c1-a41a-f9a75e150d42)
