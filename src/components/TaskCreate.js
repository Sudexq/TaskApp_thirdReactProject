import { useState } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate }) {
  //TaskCreate({onCreate}) onCreate bizim propsumuz ve bu fonksiyon bunu döndürüyor
  const [title, setTitle] = useState(task ? task.title : ""); //task varsa task.title ı yaz yoksa boş döndür
  const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : "");

  //<input value={title} onChange={handleChange} className="task-input" />
  const handleTitleChange = (event) => {
    setTitle(event.target.value); //inputa girilen değer event.target.value da tutuluyor
  };

  //<textarea value={taskDesc} onChange={handleTaskChange} className="task-input" rows={5}/>
  const handleTaskChange = (event) => {
    setTaskDesc(event.target.value);
  };

  //butona tıklandığında
  const handleSubmitChange = (event) => {
    event.preventDefault(); //butona tıkladığımızda sayfanın yeniden yüklenmesini engeller
    if (taskFormUpdate) {
      onUpdate(task.id, title, taskDesc);
    } else {
      onCreate(title, taskDesc); //bizim propsumuz
    } 
    setTitle(""); //submit edildikten sonra kutunun içini boşaltıyoruz
    setTaskDesc(""); //submit edildikten sonra kutunun içini boşaltıyoruz
  };

  return (
    <div>
      {taskFormUpdate ? (
        <div className="task-update">
          <h3>Lütfen Taskı Düzenleyiniz</h3>
          <form className="task-form">
            <label className="task-label">Başlığı Düzenleyiniz</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="task-input"
            />
            <label className="task-label">Taskı Düzenleyiniz!</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />{" "}
            {/* uzun bir text olduğu için textarea kullanıyoruz ve areanın boyutunu rows{5} ile ayralıyoruz */}
            <button
              onClick={handleSubmitChange}
              className="task-button update-button"
            >
              Düzenle
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create">
          <h3>Lütfen Task Ekleyiniz</h3>
          <form className="task-form">
            <label className="task-label">Başlık</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="task-input"
            />
            <label className="task-label">Task Giriniz!</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />{" "}
            {/* uzun bir text olduğu için textarea kullanıyoruz ve areanın boyutunu rows{5} ile ayralıyoruz */}
            <button onClick={handleSubmitChange} className="task-button">
              Oluştur
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;
