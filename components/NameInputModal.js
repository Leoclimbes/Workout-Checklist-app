// ============================================
// NAME INPUT MODAL COMPONENT
// ============================================
// Shows on first visit to ask for user's name
// Once name is saved, never shows again

'use client'

import { useState } from 'react'

export default function NameInputModal({ onSave }) {
  // State to store what user types
  const [name, setName] = useState('')

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page refresh
    
    // Get trimmed name (remove extra spaces)
    const trimmedName = name.trim()
    
    // If user entered a name, save it
    if (trimmedName) {
      onSave(trimmedName)
    }
  }

  // This is what shows on screen
  return (
    <div className="startup-modal-overlay">
      <div className="startup-modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="startup-title">Welcome! 👋</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#666' }}>
          What&apos;s your name?
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1.2rem',
              border: '2px solid #e0e0e0',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              outline: 'none',
            }}
            autoFocus
            required
          />
          <button
            type="submit"
            className="startup-button"
            style={{ width: '100%' }}
          >
            Let&apos;s Start! 💪
          </button>
        </form>
      </div>
    </div>
  )
}

// How it works:
// 1. Shows on first visit (when no name is stored)
// 2. User types their name and submits
// 3. Name is saved to localStorage
// 4. Modal closes, shows the startup modal with their name
// 5. Never shows again once name is saved

