// ============================================
// WORKOUT FORM COMPONENT
// ============================================
// This component shows the input field and "Add Workout" button
// It lets users type in a workout name and add it to the list

'use client' // This component needs browser features

import { useState } from 'react' // useState lets us store what the user types

// This function receives a prop called "onAdd" from the parent
// onAdd is a function that we'll call when the form is submitted
export default function WorkoutForm({ onAdd }) {
  
  // State to store what the user types in the input field
  // workoutName = current text in the input
  // setWorkoutName = function to update the text
  const [workoutName, setWorkoutName] = useState('') // Start with empty string

  // This function runs when the form is submitted
  // (when user clicks "Add Workout" or presses Enter)
  const handleSubmit = (e) => {
    // Prevent the form from refreshing the page (default behavior)
    e.preventDefault()
    
    // Remove extra spaces from beginning and end
    // Example: "  Push-ups  " becomes "Push-ups"
    const trimmedName = workoutName.trim()
    
    // Only add if there's actually text (not empty)
    if (trimmedName) {
      // Call the parent's function to add this workout
      onAdd(trimmedName)
      
      // Clear the input field for next workout
      setWorkoutName('')
    }
  }

  // This is what shows on screen
  return (
    <form id="workout-form" onSubmit={handleSubmit}>
      {/* Input field where user types the workout name */}
      <input 
        type="text" 
        id="workout-input"
        placeholder="Enter workout name (e.g., Push-ups, Running, etc.)"
        value={workoutName} // The input shows this value
        onChange={(e) => setWorkoutName(e.target.value)} // When user types, update state
        required // Browser won't let them submit if empty
      />
      
      {/* Button to submit the form */}
      <button type="submit">Add Workout</button>
    </form>
  )
}
