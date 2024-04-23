import TaskShow from "./TaskShow";

function TaskList({listTasks, onDelete, onUpdate}) {
    return ( <div className="task-list">
        {listTasks.map((eachTask, index)=>{ //burda listTasks bizim tasks arrrayimizdir ve map() ile içinde geziniyrouz herbir task için eachTask vr indexi için index
            return(
                //herbir task için key hatası almamak için key e indexi atıyoruz ve TaskShow da tasklarımızı görüntüleyeceğiz
                <TaskShow key={index} task={eachTask} onDelete={onDelete} onUpdate={onUpdate}/>
            )
        })}
    </div> );
}

export default TaskList;