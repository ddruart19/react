import express, { Request, Response } from "express";

const app = express()

const data = [{
    "id": 1,
    "taskName": "Give dog a bath",
    "deadline": 15,
    "completed": true,
    "date": "2023-02-05"
  }, {
   "id": 2,
   "taskName": "Turn off the lights",
   "deadline": 4,
   "completed": false,
   "date": "2023-02-10"
  }, {
   "id": 3,
   "taskName": "Eat chili",
   "deadline": 42,
   "completed": false,
   "date": "2023-02-19"
  }, {
   "id": 4,
   "taskName": "Hug mom",
   "deadline": 2,
   "completed": true,
   "date": "2023-02-25"
  }
 ]

app.get('/', (req: Request, res: Response) => res.send('Hello World from app.ts!YYYY'))

//FetchAll
app.get('/tasks', (req: Request, res: Response) => res.send(data))


export default app;
