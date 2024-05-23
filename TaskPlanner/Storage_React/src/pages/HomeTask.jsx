import { useState } from "react";
import './homeTask.css';
import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";

export const HomeTask = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <TaskForm selectedTask={selectedTask} setUpdateTrigger={setUpdateTrigger} />
                </div>
                <div>
                    <TaskList setSelectTask={setSelectedTask} updateTrigger={updateTrigger} />
                </div>
            </div>
        </>
    );
};
