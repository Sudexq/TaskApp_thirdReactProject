import { useState } from "react";
import TaskCreate from "./TaskCreate";

//taskların gözterildiği component
function TaskShow({ task, onDelete,onUpdate }) {
  const [showEdit, setShowEdit] = useState(false); //showEdit i false ile başlatıyoruz
  const handleDeleteClick = () => {
    onDelete(task.id);
  };
  const handleUpdateClick = () => {
    setShowEdit(!showEdit); //güncelleme butonuna tıklandığında setShowEdit i true yapıyoruz
  };

  const handleSubmit =(id, updatedTitle, updatedTaskDesc)=>{
    setShowEdit(false); 
    onUpdate(id, updatedTitle, updatedTaskDesc);
  };

  return (
    <div className="task-show">
      {showEdit ? ( //showEdit eğer true ise
        <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit} />
      ) : (
        //eğer true değilse
        <div>
          <h3 className="TaskShow-title">Göreviniz</h3>
          <p>{task.title}</p>
          <h3 className="TaskShow-title">Yapılacaklar</h3>
          <p>{task.taskDesc}</p>
          <div className="taskShow-button">
            <button
              onClick={handleDeleteClick}
              className="taskShow-buttonDelete"
            >
              Sil
            </button>
            <button
              onClick={handleUpdateClick}
              className="taskShow-buttonUpdate"
            >
              Güncelle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskShow;
