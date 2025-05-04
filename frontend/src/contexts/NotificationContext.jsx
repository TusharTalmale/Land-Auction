import { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';

export const NotificationContext = createContext();

export default function NotificationProvider(props) {
  const [notifications, setNotifications] = useState([])
  const { currentUser } = useContext(UserContext);

  useEffect(async () => {
    if(currentUser) {
      await fetchMyNotifications()
    }
  }, [currentUser])

  const fetchMyNotifications = async () => {
    let res = await fetch('/rest/notification/me')
    res = await res.json()
    setNotifications(res)
  }

  const deleteNotification = async (notificationId) => {
    await fetch(`/rest/notification/delete/${notificationId}`, {
      method: 'DELETE'
    })
    setNotifications(notifications.filter(n => n.id !== notificationId))
  }

  const deleteNotifications = async (notificationIds) => {
    notificationIds = JSON.stringify(notificationIds).replace("[", "").replace("]", "")
    await fetch(`/rest/notification/deleteAll/${notificationIds}`, {
      method: 'DELETE'
    })
    setNotifications([])
  }

  const values = {
    notifications,
    setNotifications,
    fetchMyNotifications,
    deleteNotification,
    deleteNotifications
  }

  return (
    <NotificationContext.Provider value={values}>
      {props.children}
    </NotificationContext.Provider>
  )
}
