import { Timeline } from "flowbite-react";
import { ITask } from "../Interfaces";

interface Props{
    task: ITask;
}


const TimelineItem: React.FC<{task: ITask}> = ({task}: Props) => {
    return (
        <>
            <Timeline.Item>
                <Timeline.Content>
                    <Timeline.Time>
                        {task.date.toDateString()}
                    </Timeline.Time>
                    <Timeline.Title>
                        {task.taskName}
                    </Timeline.Title>
                </Timeline.Content>
            </Timeline.Item>
        </>
    );
}

export default TimelineItem;