import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./Mycontext";
import { v1 as uuidv1 } from "uuid";

import server from "./environment";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setThreadId,
    setPrevChat,
  } = useContext(MyContext);

  // Fetch all threads
  const getAllThreads = async () => {
    try {
      console.log("sending req to /api/thread");
      const response = await fetch(`${server}/api/thread`);
      const res = await response.json();
      console.log(res);

      const filterData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filterData);
    } catch (err) {
      console.error("Error fetching threads:", err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  // Create a new chat
  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setThreadId(uuidv1());
    setPrevChat([]);
  };

  // Change current thread
  const changeThread = async (newThreadId) => {
    setThreadId(newThreadId);
    try {
      const response = await fetch(`${server}/api/thread/${newThreadId}`);
      const res = await response.json();
      setPrevChat(res);
      setReply(null);
    } catch (err) {
      console.error("Error changing thread:", err);
    }
  };

  // Delete a thread
  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`${server}/api/thread/${threadId}`, {
        method: "DELETE",
      });
      await response.json();

      // Update thread list
      setAllThreads((prev) => prev.filter((thread) => thread.threadId !== threadId));

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.error("Error deleting thread:", err);
    }
  };

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="/blacklogo.png" alt="logo" className="logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li
            key={thread.threadId || idx}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlight" : ""}
          >
            {thread.title}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Tejas K &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;
