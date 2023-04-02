import React from 'react'

const Message = ({ message }) => {
  if (message.msg === null) {
    return null
  }
  return <div className={`message ${message.code}`}>{message.msg}</div>
}

export default Message
