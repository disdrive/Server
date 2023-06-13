# Server

## API Endpoints

| URI             | Method  | request                                               | response(success)    　　          |
| --------------- | ------- | ----------------------------------------------------- | -------------------------------- |
| `/test`         | GET     | N/A    　　                                              | `send('API is working!')`        |
| `/auth/login`   | POST    | `body({userId, password})`                            | `json({ success: true, token })` |
| `/file`         | GET     | `headers['authorization']` `query({accoundId, key})`  | `download(filePath)`             |
| `/file`         | POST    | `headers['authorization']` `multipart/form-data`      | `send()`                         |

