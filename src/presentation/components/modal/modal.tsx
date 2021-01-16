import React from 'react'
import ReactDOM from 'react-dom'

const Modal: React.FC = ({ children }) => {
  const modalRoot = document.getElementById('modal')
  const el = document.createElement('div')

  React.useEffect(() => {
    modalRoot?.appendChild(el)
    return () => {
      modalRoot?.removeChild(el)
    }
  }, [el, modalRoot])

  return ReactDOM.createPortal(children, el)
}

export default Modal
