import { useContext, useEffect } from "react";
import { MessageContext } from "../contexts/MessageContext";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { socket } from "../socket";

export const MessagesPage = () => {
  const history = useHistory();
  const { messagesList, fetchMessagesList } = useContext(MessageContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchMessagesList();
  }, []);

  const handleGoConversation = (m) => {
    if (currentUser.id !== m.senderId)
      history.push(`/conversation/${m.itemId}/${m.senderId}`);
    else
      history.push(`/conversation/${m.itemId}/${m.receiverId}`);
  };

  useEffect(() => {
    const fetchUserAndListen = async () => {
      let currentUser2 = await fetch("/api/whoami");
      currentUser2 = await currentUser2.json();
      socket.on("messageUp", (obj) => {
        if (currentUser2.id === obj.receiverId) {
          try {
            fetchMessagesList();
          } catch (e) {
            console.log("error in messages", e);
          }
        }
      });
    };

    fetchUserAndListen();
    return () => {
      socket.disconnect();
    };
  }, []);

  // Grouping messages by itemId
  const groupedMessages = messagesList.reduce((acc, msg) => {
    if (!acc[msg.itemId]) acc[msg.itemId] = { title: msg.title, messages: [] };
    acc[msg.itemId].messages.push(msg);
    return acc;
  }, {});

  return (
    <div className="h-screen  py-8   bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
{/* Header */}
<div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm text-center p-4 max-w-3xl mx-auto">
  <h1 className="text-2xl md:text-2xl font-bold text-gray-800 relative inline-block">
    Messages
    {/* Gradient underline with curve */}
    <span className="absolute left-1/2 -bottom-1 w-3/4 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full transform -translate-x-1/2"></span>
  </h1>
</div>


      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1 p-4 space-y-6 w-full max-w-3xl mx-auto">
      {Object.entries(groupedMessages).map(([itemId, group]) => (
          <div key={itemId} className="bg-white rounded-xl shadow-md p-4 space-y-4">
            <div className="text-xl font-semibold text-indigo-700 border-b pb-2">{group.title}</div>

            <div className="space-y-3">
              {group.messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleGoConversation(m)}
                  className="flex justify-between items-center hover:bg-purple-50 transition rounded-lg p-3 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={`/uploads/${m.imagePath}_img1.jpg`}
                      alt="user"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">@{m.username}</div>
                      <div className="text-sm text-gray-700 truncate max-w-[250px]">{m.messageContent}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {new Date(m.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
