import { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindo from "./ChatWindo.jsx";
import { MyContext } from "./Mycontext";
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState(null);
const [currThreadId, setThreadId] = useState(uuidv1());
 const [prevChat,setPrevChat]=useState([]);
  const [newChat,setNewChat]=useState(true);
  const[allThreads,setAllThreads]=useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,setThreadId,
    prevChat,setPrevChat,
    newChat,setNewChat,
    allThreads,setAllThreads
  }; // put state/functions here

  return (
    <div className="App">
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindo />
      </MyContext.Provider>
    </div>
  );
}

export default App;
