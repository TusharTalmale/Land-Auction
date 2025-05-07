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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

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

      // First check if response is HTML (error page)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('text/html') !== -1) {
        const text = await response.text();
        throw new Error('Server returned HTML error page');
      }

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        } catch {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      if (!data?.messages) {
        throw new Error('Invalid response format');
      }
      
      setMessages(data.messages);
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

  useEffect(() => {
    if (!currentUser) return;
    const handleNewMessage = (newMessage) => {
      if (!currentUser) return;
      if (
        (currentUser?.id === newMessage.senderId || 
         currentUser?.id === newMessage.receiverId) &&
        newMessage.itemId?.toString() === itemId
      ) {
        setMessages(prev => [...prev, newMessage]);
      }
    };

    socket.on("messageUp", handleNewMessage);
    return () => socket.off("messageUp", handleNewMessage);
  }, [currentUser?.id, itemId, setMessages]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

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

      // Check for HTML error response
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 border-b flex items-center sticky top-0 z-10">
        <button 
          onClick={() => history.push("/Messages")}
          className="mr-4 focus:outline-none"
        >
          <ArrowCircleLeftIcon className="h-8 w-8 text-blue-500" />
        </button>
        <div>
          <h1 className="font-semibold text-lg">Conversation</h1>
          <p className="text-sm text-gray-600">
            Chatting with User {userId}
          </p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={`msg-${message.id}-${message.timestamp}`}
              className={`flex mb-4 ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg ${
                  message.senderId === currentUser?.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className="break-words">{message.messageContent}</p>
                <p className="text-xs mt-1 opacity-70">
                  {format(new Date(message.timestamp), 'h:mm a')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No messages yet. Start the conversation!
          </div>
        )}
        {/* <div ref={messagesEndRef} /> */}
      </main>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="bg-white p-4 border-t sticky bottom-0">
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
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
            disabled={!textMsg.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};