// ============================================
// STARTUP MODAL COMPONENT
// ============================================
// Shows a popup with "TRAIN HARD [USER NAME]" when the app first loads
// User can close it by clicking the button or clicking outside

'use client'

// This function receives two props from the parent:
// onClose: Function to hide the modal
// userName: The user's name to display
export default function StartupModal({ onClose, userName }) {
  
  // This is what shows on screen
  return (
    <div className="startup-modal-overlay" onClick={onClose}>
      <div className="startup-modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="startup-title">TRAIN HARD {userName.toUpperCase()}</h1>
        <button className="startup-button" onClick={onClose}>
          Let&apos;s Go! 💪
        </button>
      </div>
    </div>
  )
}

// How it works:
// 1. Overlay covers entire screen with dark background
// 2. White modal sits on top in center
// 3. Clicking overlay or button calls onClose()
// 4. Parent hides modal by setting showStartup to false
// 5. Modal disappears, user sees the app
// stopPropagation() prevents clicks inside the modal from closing it
