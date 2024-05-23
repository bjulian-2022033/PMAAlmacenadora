import React, { useState, useEffect } from 'react';
import { getTasksRequest } from '../service/api';

export const TaskList = ({ setSelectTask, updateTrigger }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksResponse = await getTasksRequest();
                console.log("Respuesta de tareas:", tasksResponse);
                if (tasksResponse.data && Array.isArray(tasksResponse.data.ListaDeTareas)) {
                    setTasks(tasksResponse.data.ListaDeTareas);
                } else {
                    console.error("Error al obtener Tareas:", tasksResponse);
                }
            } catch (error) {
                console.error("Error al obtener tareas:", error);
            }
        };
        fetchData();
    }, [updateTrigger]); // Actualizar cuando updateTrigger cambie

    const handleRowClick = (task) => {
        setSelectTask(task);
    };

    return (
        <div className="table-container">
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Nombre de la Tarea</th>
                        <th>Descripción</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Cierre</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} onClick={() => handleRowClick(task)}>
                            <td>{task.name}</td>
                            <td>{task.surname}</td>
                            <td>{task.taskName}</td>
                            <td>{task.taskDescription}</td>
                            <td>{new Date(task.entryDate).toLocaleDateString()}</td>
                            <td>{new Date(task.departureDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
