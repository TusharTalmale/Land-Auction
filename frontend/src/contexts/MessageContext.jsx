import { createContext, useState } from 'react'

export const MessageContext = createContext();

export default function MessageProvider(props) {
  const [messages, setMessages] = useState([])
  const [messagesList, setMessagesList] = useState([]);

  const fetchMessages = async (itemId, userId) => {
    
    try {
      let res = await fetch(`/rest/conversation/${itemId}/${userId}`)
      console.log('before res ',res);
        res = await res.json();
        console.log('After res ',res);
        setMessages(res);
      
    } catch (e) {
      console.log(e);
      
    }
  
  }

  const fetchMessagesList = async () => {
    try {
      let res = await fetch(`/rest/conversation/my-messages`);
      res = await res.json();
      setMessagesList(res);
    } catch (e) {
      console.log(e);
    }
  };




  const values = {
    messages,
    messagesList,
    setMessages,
    fetchMessages,
    fetchMessagesList
  }


  return (
    <MessageContext.Provider value={values}>
      {props.children}
    </MessageContext.Provider>
  )
}