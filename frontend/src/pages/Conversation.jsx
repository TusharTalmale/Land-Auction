import { MessageContext } from "../contexts/MessageContext";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams,useHistory } from "react-router-dom";
import { socket } from "../socket";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";

export const Conversation = () => {
  const { itemId, userId } = useParams();
  const { messages, fetchMessages } = useContext(MessageContext);
  const { currentUser } = useContext(UserContext);
  const [textMsg, setTextMsg] = useState("");
  const [savedTextMsg, setSavedTextMsg] = useState("");

  


  const messagesEndRef = useRef(null);

   
  const history= useHistory()

  const goItemDetails = () => {
      history.push(`/auction-details/${itemId}`);
    };

  

  useEffect(() => {
    if (itemId && userId) fetchMessages(itemId, userId);
  }, [itemId, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    let msgOb = {
      senderId: null, // me sending to userId, done in backend
      receiverId: userId, // userId is the receiver in the url
      messageContent: savedTextMsg||textMsg,
      timestamp: null,
      itemId: itemId,
    };

    let res = await fetch("/rest/conversation", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(msgOb),
    });

    res = await res.json();
    if (res.status==500){
     document.getElementById("inputMsg").placeholder= "Resending..."
     setSavedTextMsg(msgOb.messageContent)
     setTimeout(()=>handleSendMessage(e),500)

    }
    else {
    document.getElementById("inputMsg").placeholder ="Type here...";
    setSavedTextMsg("");
    }
    // let tempArr = [];
    // arrayMessages.messages.map((m) => {
    //   tempArr.push(m);
    // });
    // tempArr.push(res);
    // setArrayMessages((p) => ({ ...p, messages: tempArr }));
    setTextMsg("");
  };

  const cbFetchMessages =useCallback(()=>{
     fetchMessages(itemId, userId);

  },[itemId,userId])

  useEffect(async () => {
    let currentUser2 = await fetch("/api/whoami");
    currentUser2 = await currentUser2.json();
    socket.on("messageUp", (obj) => {
      if (
        (currentUser2.id == obj.senderId ||
        currentUser2.id == obj.receiverId) &&
        obj.itemId == itemId
      ) {
        try {
          cbFetchMessages();
        } catch (e) {
          console.log("error in conversation", e);
        }
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const inputChange=(e) => {
      setTextMsg(e.target.value);
    };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="topCard z-10 w-full  bg-myAw fixed border-b-2 border-myGr-dark">
        <div className="text-xl flex items-center justify-around py-2 text-center font-bold ">
          <ArrowCircleLeftIcon onClick={()=>{history.push("/Messages");}} className="h-9 w-9 mb-1 text-myPr-dark " />
          <div onClick={goItemDetails}> {messages.title}</div>
        </div>
        <div >
          <div className="what text-sm font-bold px-9 "> Chatting with: <span className="text-myPr-dark">{ messages.username}</span></div>
        </div>
      </div>
      <div className="mb-16 pt-20">
        {messages.messages?.map((m) => (
          <div className=" m-2 p-1 rounded-lg w-7/12" key={(`${m.id}-${currentUser?.id}`)} style={ currentUser.id == m.receiverId ? { textAlign: "left" } : { textAlign: "right", marginLeft: "38%"} } >
            <div className="text-xs opacity-50">  {new Date(m.timestamp).toLocaleTimeString()} </div>
            <div className="break-words"  style={ currentUser.id == m.receiverId? {backgroundColor:"wheat", padding: "10px",  borderRadius: "18px 18px 18px 0px"}:
             {backgroundColor: "#6acf9d",   padding: "10px",  borderRadius: "18px 18px 0px 18px"  }}>
              {m.messageContent}
            </div>
          </div>
        ))}
      </div>
      <div ref={messagesEndRef} />
      <form className="w-full fixed bottom-0  flex flex-row" onSubmit={handleSendMessage}>
        <input required id="inputMsg"  className="border-4 w-10/12 text-left" type="text"  placeholder="type here..." value={textMsg} onChange={inputChange} />
        <button className="w-2/12 py-2 bg-myGr-light" type="submit" name="send">
          send
        </button>
      </form>
    </div>
  );
};
