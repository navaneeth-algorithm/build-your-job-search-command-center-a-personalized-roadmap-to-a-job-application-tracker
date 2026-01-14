import { useEffect } from 'react'

function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Auto-close after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`notification notification-${type}`} role="alert">
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ℹ'}
        </span>
        <span className="notification-message">{message}</span>
        <button
          className="notification-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Notification
