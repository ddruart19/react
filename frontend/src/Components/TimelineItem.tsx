import { Timeline } from "flowbite-react";
import { showFullDate } from "../functions";
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
                        {showFullDate(task.date)}
                    </Timeline.Time>
                    <Timeline.Title>
                        {task.name}
                    </Timeline.Title>
                </Timeline.Content>
            </Timeline.Item>
        </>
    );
}

export default TimelineItem;