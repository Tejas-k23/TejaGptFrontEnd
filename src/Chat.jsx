import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Mycontext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChat, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!prevChat?.length) return;

    // ✅ get the last assistant message
    const lastMessage = prevChat[prevChat.length - 1];
    if (!lastMessage || lastMessage.role !== "assistant") return;

    const lastReply = lastMessage.content || ""; // ✅ renamed
    const content = lastReply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChat, reply]); // ✅ added reply too

  return (
    <>
      {newChat && <h1>Start a New chat!</h1>}

      <div className="chats">
        {prevChat.slice(0, -1).map((chat, idx) => (
          <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {prevChat.length > 0 && (
         <>
         {
          latestReply === null ? (
            <div className="getGpt" key={"non-typing"}>
               <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChat[prevChat.length - 1].content}</ReactMarkdown>
            </div>
          ):(
               <div className="getGpt" key={"typing"}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
               </div>
          )

         }
         
         </>
        
        )}
        
      </div>
      
    </>
  );
}

export default Chat;
