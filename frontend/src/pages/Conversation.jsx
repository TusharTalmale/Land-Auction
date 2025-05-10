import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { MessageContext } from "../contexts/MessageContext";
import { UserContext } from "../contexts/UserContext";
import { useParams, useHistory } from "react-router-dom";
import { socket } from "../socket";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { format } from 'date-fns';

export const Conversation = () => {
  const history = useHistory();
  const { itemId, userId } = useParams();
  const { messages, setMessages } = useContext(MessageContext);
  const { currentUser } = useContext(UserContext);
  const [textMsg, setTextMsg] = useState("");
  const [sendername , setSendername] = useState("");

  const [contenttitle , setContenttitle] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesContainerRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());
  const lastMessageRef = useRef(null);

  const fetchConversation = useCallback(async () => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/rest/conversation/${itemId}/${userId}`, {
        credentials: 'include',
        signal: abortControllerRef.current.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('text/html') !== -1) {
        const text = await response.text();
        throw new Error('Server returned HTML error page');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data?.messages) {
        throw new Error('Invalid response format');
      }
      
      setMessages(data.messages);
      setSendername(data.username);
      setContenttitle(data.title);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load conversation');
      }
    } finally {
      if (!abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  }, [itemId, userId, setMessages]);

  useEffect(() => {
    if (itemId && userId) {
      fetchConversation();
    }
    return () => abortControllerRef.current.abort();
  }, [itemId, userId, fetchConversation]);

  const scrollToLastMessage = useCallback(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, []);

  // Initial scroll to last message on load
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToLastMessage, 100);
    }
  }, [messages.length, scrollToLastMessage]);

  // Handle new messages with scroll
  useEffect(() => {
    if (!currentUser) return;
    
    const handleNewMessage = (newMessage) => {
      if (
        (currentUser.id === newMessage.senderId || 
         currentUser.id === newMessage.receiverId) &&
        newMessage.itemId?.toString() === itemId
      ) {
        setMessages(prev => [...prev, newMessage]);
        setTimeout(scrollToLastMessage, 50);
      }
    };

    socket.on("messageUp", handleNewMessage);
    return () => socket.off("messageUp", handleNewMessage);
  }, [currentUser, itemId, setMessages, scrollToLastMessage]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!textMsg.trim()) return;

    try {
      const response = await fetch("/rest/conversation", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          receiverId: userId,
          messageContent: textMsg,
          itemId: itemId
        }),
        credentials: 'include'
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('text/html') !== -1) {
        const text = await response.text();
        throw new Error('Server returned HTML error page');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setTextMsg("");
      setError(null);
    } catch (err) {
      console.error('Send message error:', err);
      setError(err.message || 'Failed to send message');
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading conversation...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-2">Error: {error}</div>
        <button
          onClick={fetchConversation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen  bg-gray-100 " >
      {/* Header */}
      {/* <header className="bg-white p-3 border-b flex items-center fixed top-16 left-0 right-0 z-40 h-16  md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto">      <button  */}
  <header className="bg-white p-3 border-b border-gray-200 shadow-sm flex  top-16 left-0 right-0 z-40 h-16 md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto">
    <button 
      onClick={() => history.push("/Messages")}
      className="mr-4 focus:outline-none hover:bg-gray-100 p-1 rounded-full transition-colors"
    >
      <ArrowCircleLeftIcon className="h-8 w-8 text-blue-500 hover:text-blue-600" />
    </button>

    <div className="flex-1 min-w-0">
      <h1 className="font-semibold text-lg truncate">Conversation</h1>
      <p className="text-sm text-gray-600 truncate">
        Chatting with {sendername}
      </p>
    </div>
    <button 
      onClick={() => history.push(`/auction-details/${itemId}`)}
      className="ml-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
    >
      {contenttitle}
    </button>
  </header>

      {/* Messages */}
      <main 
        ref={messagesContainerRef}
        className="flex-1  bg-white overflow-y-auto pt-32 pb-20 px-4  md:w-1/2 lg:w-1/2 md:mx-auto  lg:mx-auto"      >
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const isLast = index === messages.length - 1;
            return (
              <div
                key={`msg-${message.id}-${message.timestamp}`}
                ref={isLast ? lastMessageRef : null}
                className={`flex mb-4 ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] xl:w-1/2 lg:w-1/3 p-3 rounded-lg ${
                    message.senderId === currentUser?.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-green-200 border border-gray-200'
                  }`}
                >
                  <p className="break-words">{message.messageContent}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {format(new Date(message.timestamp), 'h:mm a')}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No messages yet. Start the conversation!
          </div>
        )}
      </main>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t sticky bottom-0  md:w-1/3 lg:w-1/2 lg:mx-auto ">
        <div className="flex gap-2">
          <input
            id="inputMsg"
            type="text"
            value={textMsg}
            onChange={(e) => setTextMsg(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        <button
  type="submit"
  className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors shadow-md hover:shadow-lg disabled:shadow-none gap-2"
  disabled={!textMsg.trim()}
>
  <span>Send</span>
</button>
        </div>
      </form>
    </div>
  );
};