// ============================================
// DAY TABS COMPONENT
// ============================================
// Shows tabs for each day of the week (Mon, Tue, Wed, etc.)
// Lets users switch between days to see different workouts

'use client' // This component needs browser features

// This function receives 3 props:
// days: Array of day names ['Monday', 'Tuesday', ...]
// selectedDay: Which day is currently active ('Monday', etc.)
// onSelectDay: Function to change the selected day
export default function DayTabs({ days, selectedDay, onSelectDay }) {
  
  // This is what shows on screen
  return (
    <div className="day-tabs">
      {/* Loop through each day and create a button for it */}
      {days.map((day) => (
        <button
          key={day} // React needs unique key for each item in list
          className={`day-tab ${selectedDay === day ? 'active' : ''}`}
          // If this day is the selected day, add 'active' class (makes it purple)
          onClick={() => onSelectDay(day)}
          // When clicked, call parent's function to change selected day
        >
          {/* Show first 3 letters of day name (Monday -> Mon) */}
          {day.substring(0, 3)}
        </button>
      ))}
    </div>
  )
}

// How it works:
// 1. User clicks a day tab
// 2. Calls onSelectDay('Tuesday')
// 3. Parent (page.js) updates selectedDay state
// 4. Parent loads workouts for Tuesday
// 5. Screen updates to show Tuesday's workouts
