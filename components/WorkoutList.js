// ============================================
// WORKOUT LIST COMPONENT
// ============================================
// This component displays all the workouts for the current day
// It acts as a container that holds multiple WorkoutItem components

'use client' // This component needs browser features

import WorkoutItem from './WorkoutItem' // Import the single workout item component

// This function receives 3 props from the parent:
// workouts: The array of workout objects to display
// onToggle: Function to handle checkbox clicks
// onDelete: Function to handle delete button clicks
export default function WorkoutList({ workouts, onToggle, onDelete }) {
  
  // If there are no workouts yet, show a helpful message
  if (workouts.length === 0) {
    return (
      <ul id="workout-list">
        <li style={{ textAlign: 'center', color: '#999' }}>
          No workouts yet. Add one above!
        </li>
      </ul>
    )
  }

  // If we have workouts, display them
  return (
    <ul id="workout-list">
      {/* Loop through each workout and create a WorkoutItem */}
      {workouts.map((workout, index) => (
        <WorkoutItem
          key={`${workout.name}-${index}`} // React needs unique keys for lists
          workout={workout} // Pass the whole workout object
          index={index} // Pass the position in the array
          onToggle={onToggle} // Pass the function to toggle checkbox
          onDelete={onDelete} // Pass the function to delete
        />
      ))}
    </ul>
  )
}

// What .map() does:
// Takes: [workout1, workout2, workout3]
// Creates: [<WorkoutItem data={workout1} />, <WorkoutItem data={workout2} />, <WorkoutItem data={workout3} />]
