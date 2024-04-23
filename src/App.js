import { useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  //task yapma işlemi için
  const createTask = (title, taskDesc) => {
    const newTasks = [
      ...tasks, //spread (...) operatoru ile var olan tasklarmızı yazdık
      {
        id: Math.round(Math.random() * 999999), //her bir task id ye de sahip olacak. id, title ve taskDesc e sahip olacak
        title: title, //bunu sadece title olarak da yazabiliriz çünkü key ve value değeri aynı. key:value
        taskDesc: taskDesc, //aynı şekilde bu da
      },
    ];
    setTasks(newTasks); //taskımızın elemanlarını set ettik
  };

  //taskı silme işlemi için
  const deleteTaskById = (id) => { //sil butonuna tıkladığımız taskın id si buraya çekilir
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id; //tasks dizisinin filter yöntemi kullanılarak, verilen id değerine sahip task hariç diğer tüm tasklar filtrelenir
    });
    setTasks(afterDeletingTasks); //afterDeletingTasks dizisi, orijinal tasks dizisinin güncellenmiş hali olarak ayarlanır
  };

  const EditTaskById=(id, updatedTitle, updatedTaskDesc)=>{
    const updatedTasks= tasks.map((task)=>{
      if(task.id===id){
        return{id, title:updatedTitle, taskDesc:updatedTaskDesc}
      }
      else{
        return task;
      }
    })
    setTasks(updatedTasks);
  };
 //ana component
  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>GÖREVLER</h1>
      <TaskList onDelete={deleteTaskById} listTasks={tasks} onUpdate={EditTaskById} />
      {/* listTasks={tasks} listTasks propdur efenim ve tasks, bizim createTask fonksiyonunda her bir taska atadğımız id, title, taskDesc dir. */}
    </div>
  );
}

export default App;
