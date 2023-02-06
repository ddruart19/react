import express, { Request, Response } from "express";

const app = express()

interface ITask {
    id : number;
    taskName: string;
    completed: boolean;
    date: string;
}

const data: ITask[] = [{
    "id": 1,
    "taskName": "Give dog a bath",
    "completed": true,
    "date": "2023-02-05"
  }, {
   "id": 2,
   "taskName": "Turn off the lights",
   "completed": false,
   "date": "2023-02-10"
  }, {
   "id": 3,
   "taskName": "Eat chili",
   "completed": false,
   "date": "2023-02-19"
  }, {
   "id": 4,
   "taskName": "Hug mom",
   "completed": true,
   "date": "2023-02-25"
  }
 ]

const dataToCreate: ITask = {
    "id": 5,
    "taskName": "Do a REST API",
    "completed": false,
    "date": "2023-02-25"
}

const dataToUpdate: ITask = {
    "id": 5,
    "taskName": "Do a good REST API",
    "completed": false,
    "date": "2023-02-20"
}

//Fetch all
app.get('/api/tasks', (req: Request, res: Response) => res.send(data))

//Fetch by id
app.get('/api/task/:id', (req: Request, res: Response) => res.send(data.find(t => t.id === Number(req.params.id))))

//Create task
app.post('/api/task', (req: Request, res: Response) => {data.push(dataToCreate); res.send("Task successfully added")})

//Update task
app.put('/api/task/:id', (req: Request, res: Response) => {data[data.findIndex(t => t.id === Number(req.params.id))] = dataToUpdate; res.send("Task successfully updated")})



export default app;
