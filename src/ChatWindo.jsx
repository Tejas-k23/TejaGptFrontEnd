import "./ChatWindo.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./Mycontext.jsx";
import { useContext,useState,useEffect } from "react";
import {HashLoader} from "react-spinners";
import server from "./environment.js";

function ChatWindo(){
    const {prompt,setPrompt,reply,setReply,currThreadId,setPrevChat}=useContext(MyContext);
    const [loading, setLoading]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const getReply=async()=>{
  setLoading(true);
  Secret();
       const options = {
        method:"POST",
       headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            messages: prompt,
            threadId:currThreadId
        })
       };
       try{
        const reply= await fetch(`${server}/api/chat`,options);
        const res= await reply.json();
        setReply(res.reply);
        

       }catch(err){
        console.log(err)
    }
    setLoading(false);}

    useEffect(()=>{
        if(prompt&&reply){
            setPrevChat(prevChat=>([...prevChat,{
                role:"user",
                content:prompt
            },
        {
            role:"assistant",
            content:reply
        }]))
        }
        setPrompt("");
    },
[reply]);
const dropdown=()=>{
    setIsOpen(!isOpen);
}
const Secret=()=>{
    if(prompt!="##teja"){
        return;
    }else{
        setReply("goood job");
    }
}

    return(
        <div className="ChatWindow">
            <div className="navbar">
<span>TejaGpt <i className="fa-solid fa-angle-down"></i></span>
<div className="userIcon">
   <div className="userIcondiv" onClick={dropdown} ><i className="fa-solid fa-user"></i></div>
</div>
            </div>
            {
                isOpen && <div className="dropdown">
                    <div className="dropdownItem"><i className="fa-solid fa-gear"></i> Setting</div>
                    <div className="dropdownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade</div>
                    <div className="dropdownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</div>
                </div>
            }
            <Chat></Chat>
            <HashLoader color="#fff" loading={loading}></HashLoader>
            <div className="ChatInput">
                <div className="inputBox">
                    <input
  placeholder="Ask Anything"
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && prompt.trim()) {
      getReply();
    }
  }}
/>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="Info">TejaGpt can make mistake.check important info. see cookies preference.</p>
            </div>
        </div>
    )

}
export default ChatWindo;