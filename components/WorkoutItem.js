// ============================================
// WORKOUT ITEM COMPONENT
// ============================================
// This component represents a single workout in the list
// Shows: checkbox, workout name, and delete button

'use client' // This component needs browser features

// This function receives 3 props from the parent:
// workout: The workout object containing name, checked, etc.
// index: Which position in the array (0, 1, 2, etc.)
// onToggle: Function to flip the checkbox
// onDelete: Function to remove this workout
export default function WorkoutItem({ workout, index, onToggle, onDelete }) {
  
  // Handler function for when checkbox is clicked
  const handleToggle = () => {
    // Call the parent's toggle function with this workout's index
    onToggle(index)
  }

  // Handler function for when delete button is clicked
  const handleDelete = () => {
    // Call the parent's delete function with this workout's index
    onDelete(index)
  }

  // What shows on screen for each workout item
  return (
    <li>
      {/* Checkbox to mark workout as complete/incomplete */}
      <input
        type="checkbox"
        checked={workout.checked} // Checked or unchecked based on state
        onChange={handleToggle} // Run handleToggle when clicked
      />
      
      {/* The workout name (will have line-through if checked) */}
      <span className={workout.checked ? 'workout-text checked' : 'workout-text'}>
        {workout.name}
      </span>
      {/* If checked, add "checked" class for styling (shows strikethrough) */}
      
      {/* Button to delete this specific workout */}
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </li>
  )
}
