import express, { Request, Response } from "express";

const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

interface ITask {
    id : number;
    taskName: string;
    completed: boolean;
    date: Date;
}

let data: ITask[] = [{
    "id": 1,
    "taskName": "Give dog a bath",
    "completed": true,
    "date": new Date("2023-02-10")
  }, {
   "id": 2,
   "taskName": "Turn off the lights",
   "completed": false,
   "date": new Date("2023-02-15")
  }, {
   "id": 3,
   "taskName": "Eat chili",
   "completed": false,
   "date": new Date("2023-02-20")
  }, {
   "id": 4,
   "taskName": "Hug mom",
   "completed": true,
   "date": new Date("2023-02-25")
  }
 ]

let dataToCreate: ITask;


//Fetch all
app.get('/api/tasks', (req: Request, res: Response) => res.send(data))

//Fetch by id
app.get('/api/task/:id', (req: Request, res: Response) => res.send(data.find(t => t.id === Number(req.params.id))))

//Create task
app.post('/api/task', jsonParser, (req: Request, res: Response) => {
    dataToCreate = {
        id: req.body.id,
        taskName: req.body.taskName,
        completed: req.body.completed,
        date: req.body.date
    }
    data.push(dataToCreate);
    res.send("Task successfully created")})

//Update task
app.put('/api/task/:id', jsonParser, (req: Request, res: Response) => {
    dataToCreate = {
        id: req.body.id,
        taskName: req.body.taskName,
        completed: req.body.completed,
        date: req.body.date
    }
    data[data.findIndex(t => t.id === Number(req.params.id))] = dataToCreate; 
    res.send("Task successfully updated")})

//Delete task
app.delete('/api/task/:id', (req: Request, res: Response) => {data = data.filter(t => t.id !== Number(req.params.id)); res.send("Task successfully deleted")})



export default app;
