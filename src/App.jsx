import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
// import './App.css'
import Navbar from "./components/Navbar.jsx"
function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinish,setshowfinish]=useState(true);


useEffect(()=>{
         let todostring=localStorage.getItem("todos");
         if(todostring){
          let todos=JSON.parse(todostring)
          settodos(todos);
         }
},[])

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
},[todos])

  const handlechange = (e) => {
    settodo(e.target.value);
  }

  const handleadd = () => {
    settodos([...todos, {id: uuidv4(), todo, isCompleted:false}])
    settodo("")
  }

  const handlecheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex((item)=>{
           return item.id===id;
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    settodos(newtodos)
  }

const handledelete=(e,id)=>{
let newtodos=todos.filter((item)=>{
return item.id!==id;
})
settodos(newtodos);
}

 const handleedit=(e,id)=>{
      let index=todos.filter((item)=>{
return item.id===id;
})
settodo(index[0].todo)

let newtodos=todos.filter((item)=>{
return item.id!==id;
})
settodos(newtodos);
 }

 const handleshowfinish=()=>{
setshowfinish(!showfinish);
 }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-white min-h-[90vh] md:w-[35%]">
        <h1 className="text-2xl font-bold text-center">TaskManager</h1>
        <p className="font-semibold text-center">Manage your task at one place</p>
        <h1 className="font-semibold ">Add todo</h1>
        <div className="button">
          <input className="w-[99%] bg-blue-200 rounded-xl px-5 py-1 outline-none" onChange={handlechange} value={todo} type="text" placeholder="What do you want to do?" />
          <button className="w-[99%] bg-blue-900 rounded-xl my-2 py-1 outline-none text-white font-bold hover:bg-blue-950" onClick={handleadd} disabled={todo.length<=1}>Save</button>
        </div>
        <input type="checkbox" onChange={handleshowfinish} checked={showfinish}/>
        <label> Show finished tasks</label>
        <h1 className="font-semibold my-4">Yours todos</h1>
        <div className="todos w-[70%] h-[55vh] overflow-auto">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => (showfinish || !item.isCompleted) &&(
            <div key={item.id} className="flex justify-between items-center gap-8 my-2">

              <div className="flex gap-4 min-w-0">
                <input name={item.id} type="checkbox" onChange={handlecheckbox} checked={item.isCompleted} id=""/>

                <div className={`break-all ${item.isCompleted ? "line-through" : "" }`}>
                  {item.todo}
                </div>
              </div>

              <div className="button2 flex gap-4">
                <button className="font-semibold bg-blue-900 text-white rounded px-2 hover:bg-blue-950" onClick={(e)=>{handleedit(e,item.id)}}>
                  Edit
                </button>

                <button className="font-semibold bg-blue-900 text-white rounded px-2 hover:bg-blue-950" onClick={(e)=>{handledelete(e, item.id)}}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
