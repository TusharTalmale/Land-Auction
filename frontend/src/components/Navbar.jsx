

import Alert from '@mui/material/Alert';
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LoginTemplate } from "../components/LoginForm";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { NotificationContext } from "../contexts/NotificationContext";
import { socket } from "../socket";
import logo from "../images/Logo1.png";
import { Link } from 'react-router-dom/cjs/react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const history = useHistory();
  const iconRef = useRef()

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { notifications, setNotifications, deleteNotification, deleteNotifications } = useContext(NotificationContext)
  const [toggleToast, setToggleToast] = useState(false)
  const [toastLogin, setToastLogin] = useState()

  const logout = () => {
    fetch("/logout");
    setCurrentUser("")
    history.push("/");
    setToggleToast(true);
    setToastLogin(p => !p);
    setTimeout(() => {
      setToggleToast(false)
    }, 2500)
    setToastLogin('');
  };

  const pathTo = (e) => {
    history.push(`/${e.target.name}`);
  }

  const handleNotification = async (n) => {
     await deleteNotification(n.id);

    if(n.messageId) history.push(`/conversation/${n.itemId}/${n.correctUserId || n.userId}`)
    else  history.push(`/auction-details/${n.itemId}`);
  }

  const clearAll = async () => {
    await deleteNotifications(notifications.map(n => n.id))
  }

  socket.on("notification", (n, t, u) => {
    if (n.userId == currentUser.id) {
      let list = []
      for (let i = 0; i < notifications.length; i++) {
        list.push(notifications[i])
      }
      n.title = t
      n.correctUserId=u
      list.push(n)
      setNotifications(list)
    }
  })

  const removeCallback = () => {
    iconRef.current.click()
  }

  const pagesArray = ["Create", "Buying", "Selling", "Messages", "About"];

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed w-screen top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="LAWA Logo" className="h-16 mt-3 rounded-full" />
            <button
                onClick={pathTo}
                id="logo"
                className="font-logo text-3xl text-white hover:text-indigo-200 transition-colors duration-200"
              >
               LAWA
              </button>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {currentUser && pagesArray.map((page) => (
                  <button
                    key={page}
                    name={page}
                    onClick={pathTo}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-500 hover:bg-opacity-50 transition-colors duration-200"
                  >
                    {page}
                  </button>
                ))}
                {currentUser && currentUser.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 hover:bg-opacity-75 transition-colors duration-200 flex items-center"
                      >
                        {/* <CogIcon className="h-5 w-5 mr-1" aria-hidden="true" /> */}
                        Admin
                      </Link>
                    )}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
            {currentUser && (
              <Menu as="div" className="relative">
                <div className="relative">
                  <Menu.Button className="p-1 rounded-full text-white hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white transition-colors duration-200">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-bold text-white">
                        {notifications.length}
                      </span>
                    )}
                  </Menu.Button>
                </div>
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((n) => (
                          <Menu.Item key={n.id}>
                            {({ active }) => (
                              <div
                                onClick={() => handleNotification(n)}
                                className={`block px-4 py-3 text-sm cursor-pointer ${
                                  active ? 'bg-indigo-50' : ''
                                }`}
                              >
                                <div className="font-semibold text-gray-900">{n?.title}</div>
                                <div className={`mt-1 ${
                                  n.messageId ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {n.messageId 
                                    ? "New message!" 
                                    : n.highestBid 
                                      ? `New bid: ${n.highestBid} kr` 
                                      : "New bid!"}
                                </div>
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                        <div className="border-t border-gray-200">
                          <button
                            onClick={clearAll}
                            className="block w-full px-4 py-2 text-sm text-center text-indigo-600 hover:bg-indigo-50"
                          >
                            Clear all notifications
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No new notifications
                      </div>
                    )}
                  </div>
                </Menu.Items>
              </Menu>
            )}

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <div id="iconRef" ref={iconRef}>
                    <UserCircleIcon 
                      id="userCircleIcon" 
                      className="h-8 w-8 text-white hover:text-indigo-200 transition-colors duration-200" 
                      aria-hidden="true" 
                    />
                  </div>
                </Menu.Button>
              </div>
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                {currentUser ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-200" name = "me" onClick={(e)=> history.push(`/me`)}>
                      <p className="text-sm font-medium text-gray-900">{currentUser.username}</p>
                      <p className="text-xs font-medium text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    {pagesArray.map((page, i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <button
                            name={page}
                            onClick={pathTo}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                     {currentUser.role === 'ADMIN' && (
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link
                                        to="/admin"
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                        active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                                        } flex items-center`}
                                    >
                                        {/* <CogIcon className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" /> */}
                                        Admin Panel
                                    </Link>
                                    )}
                                </Menu.Item>
                            )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                          }`}
                        >
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item>
                    <LoginTemplate 
                      callback={removeCallback} 
                      setCurrentUser={setCurrentUser} 
                      toggleToast={setToggleToast} 
                      toastLogin={setToastLogin} 
                    />
                  </Menu.Item>
                )}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      {toggleToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs">
          <Alert 
            variant="filled" 
            severity="success" 
            onClose={() => setToggleToast(false)}
            className="shadow-lg"
          >
            {toastLogin ? "You have been logged in successfully!" : "You have been logged out successfully!"}
          </Alert>
        </div>
      )}
    </Disclosure>
  );
}