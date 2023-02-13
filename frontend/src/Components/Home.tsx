import { Button, Card } from "flowbite-react";
import CSS from 'csstype';
import { useNavigate } from "react-router-dom";

const divMainHomeStyles: CSS.Properties = {
    height: '40vh'
}

const divHomeStyles: CSS.Properties ={
    float: 'left',
    width:'50%',
    height: '100%'
};

const buttonStyles: CSS.Properties = {
    width: '80%',
    margin: '1% auto'
}

const Home: React.FC = () => {
    // const todo = useContext(TodoListContext);
    const navigate = useNavigate();
    // const nextTaskToDo: ITask = todo.todoList.sort((a, b) => Number(a.date) - Number(b.date))[0];



    return (
        <div style={divMainHomeStyles}>
            <div style={divHomeStyles}>
                <Card style={{height: '100%'}}>
                    <Button style={buttonStyles} color="gray" onClick={() => navigate('/list')}>
                        Show tasks
                    </Button>
                    <Button style={buttonStyles} color="gray" onClick={() => navigate('/timeline')}>
                        Show timeline
                    </Button>
                    <Button style={buttonStyles} color="gray" onClick={() => navigate('/calendar')}>
                        Show calendar
                    </Button>
                    <Button style={buttonStyles} onClick={() => navigate('/create')}>
                        Create task
                    </Button>
                </Card>
            </div>
            <div style={divHomeStyles}>
                <Card style={{height: '100%'}}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Next task to do 
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    {/* {nextTaskToDo.taskName} before {showFullDate(nextTaskToDo.date)} */}
                    </p>
                </Card>
            </div>
        </div>
    );
}
export default Home;