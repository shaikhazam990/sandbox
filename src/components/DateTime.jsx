import React, { useState, useEffect } from 'react'

const DateTime = () => {
  const [dateTime, setDateTime] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
      const dayName = days[now.getDay()]
      const date = now.getDate()
      const month = months[now.getMonth()]
      const hours = now.getHours() % 12 || 12
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const period = now.getHours() >= 12 ? 'PM' : 'AM'
      
      const formatted = `${dayName} ${date} ${month} ${hours}:${minutes} ${period}`
      setDateTime(formatted)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div>{dateTime}</div>
  )
}

export default DateTime