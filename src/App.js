import {Routes, Route} from "react-router-dom"
import './App.css';
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Member from "./Pages/Member";

function App() {
  return (
    <Routes>
     <Route path="/" element={<Registration/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/member" element={<Member/>}/>
    </Routes>
  );
}

export default App;
