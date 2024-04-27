import { useEffect, useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  //task yapma işlemi için
  const createTask = async (title, taskDesc) => {
    //await i kullanabilmek için methoda async yazıyoruz
    const response = await axios.post("http://localhost:3004/tasks", {
      //isteği await ile atıyoruz
      title, //key ve value değeri aynı
      taskDesc, //key ve value değeri aynı olduğu için bi tane yazdım
    });
    const newTasks = [
      ...tasks, //spread (...) operatoru ile var olan tasklarmızı yazdık
      response.data,
      /*
       {
         id: Math.round(Math.random() * 999999), //her bir task id ye de sahip olacak. id, title ve taskDesc e sahip olacak
         title: title, //bunu sadece title olarak da yazabiliriz çünkü key ve value değeri aynı. key:value
         taskDesc: taskDesc, //aynı şekilde bu da
       },
       //bu kodu da kullanabiliriz ama response.data yı kullanmak daha doğru olur
      */
    ];
    setTasks(newTasks); //taskımızın elemanlarını set ettik
  };

  const fetchTask = async () => {
    const response = await axios.get("http://localhost:3004/tasks");
    setTasks(response.data);
  };

  useEffect(() => { //useEffect, React bileşeninin render edilmesinden hemen sonra veya
    fetchTask();    //bileşenin yeniden render edilmesinden hemen önce belirli bir eylemi gerçekleştirmek için kullanılır. 
  }, []);           //fetchTask işlevi çağrılarak bileşenin yüklenmesi sırasında ilk kez veri alınmaya çalışılıyor.

  //taskı silme işlemi için
  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3004/tasks/${id}`)

    //sil butonuna tıkladığımız taskın id si buraya çekilir
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id; //tasks dizisinin filter yöntemi kullanılarak, verilen id değerine sahip task hariç diğer tüm tasklar filtrelenir
    });
    setTasks(afterDeletingTasks); //afterDeletingTasks dizisi, orijinal tasks dizisinin güncellenmiş hali olarak ayarlanır
  };

  const EditTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3004/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    })
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };
  //ana component
  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>GÖREVLER</h1>
      <TaskList
        onDelete={deleteTaskById}
        listTasks={tasks}
        onUpdate={EditTaskById}
      />
      {/* listTasks={tasks} listTasks propdur efenim ve tasks, bizim createTask fonksiyonunda her bir taska atadğımız id, title, taskDesc dir. */}
    </div>
  );
}

export default App;
