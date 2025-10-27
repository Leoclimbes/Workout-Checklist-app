// ============================================
// LEGEND COMPONENT
// ============================================
// Shows an editable notes/legend section at the bottom
// Each day has its own separate legend that gets saved

'use client' // This component needs browser features

import { useState, useEffect } from 'react' // useState: store legend text, useEffect: load saved legend

// This function receives one prop:
// day: Which day this legend is for ('Monday', 'Tuesday', etc.)
export default function Legend({ day }) {
  
  // State to store the legend text
  const [legend, setLegend] = useState('') // Start with empty string
  
  // State to track if we're in editing mode
  const [isEditing, setIsEditing] = useState(false) // Start with false (not editing)

  // Load the legend when the day changes
  useEffect(() => {
    // Get the saved legend for this specific day from localStorage
    // Key will be like 'legend-Monday', 'legend-Tuesday', etc.
    const savedLegend = localStorage.getItem(`legend-${day}`)
    
    // If there's a saved legend, load it
    // Otherwise, keep it empty
    if (savedLegend) {
      setLegend(savedLegend)
    } else {
      setLegend('')
    }
  }, [day]) // Re-run whenever 'day' changes

  // Save the legend to localStorage
  const saveLegend = () => {
    // Save legend text under a key like 'legend-Monday'
    localStorage.setItem(`legend-${day}`, legend)
    
    // Exit editing mode to show the text
    setIsEditing(false)
  }

  // This is what shows on screen
  return (
    <div className="legend-section">
      {/* Header with title and edit button */}
      <div className="legend-header">
        <h3>📝 Legend</h3>
        
        {/* If we're in editing mode, show Save and Cancel buttons */}
        {isEditing ? (
          <div className="legend-buttons">
            <button onClick={saveLegend} className="save-btn">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        ) : (
          /* Otherwise, show Edit button */
          <button onClick={() => setIsEditing(true)} className="edit-legend-btn">
            Edit
          </button>
        )}
      </div>

      {/* If editing, show textarea to type */}
      {isEditing ? (
        <textarea
          value={legend} // Show current legend text
          onChange={(e) => setLegend(e.target.value)} // Update when user types
          placeholder="Add your workout legend here... (e.g., descriptions, notes, instructions)"
          rows="6" // Make it 6 lines tall
          className="legend-textarea"
        />
      ) : (
        /* Otherwise, display the saved legend text */
        <div className="legend-display">
          {legend || <span className="legend-placeholder">Click Edit to add a legend</span>}
          {/* If legend is empty, show placeholder message */}
        </div>
      )}
    </div>
  )
}

// How it works:
// 1. Component receives 'day' prop (e.g., 'Monday')
// 2. Loads saved legend from localStorage under key 'legend-Monday'
// 3. User clicks Edit → Shows textarea
// 4. User types and clicks Save → Saves to localStorage
// 5. User clicks Cancel → Discards changes, exits edit mode
// 6. Each day has its own separate legend!
