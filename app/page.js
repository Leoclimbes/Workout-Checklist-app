// ============================================
// MAIN PAGE COMPONENT - The Brain of Your App
// ============================================
// This is the main page where everything happens!
// It manages all the state (data) and coordinates all components

'use client' // This tells Next.js: "This component needs to run in the browser"

// ============================================
// IMPORTS - Bring in other files we need
// ============================================
import { useState, useEffect } from 'react' // useState: store changing data, useEffect: run code at specific times
import WorkoutForm from '../components/WorkoutForm' // The form to add workouts
import WorkoutList from '../components/WorkoutList' // Displays the list of workouts
import DayTabs from '../components/DayTabs' // Monday-Sunday tabs at the top
import StartupModal from '../components/StartupModal' // "Train Hard [USER]" popup
import NameInputModal from '../components/NameInputModal' // First-time name input
import Legend from '../components/Legend' // Notes section at bottom
import Sidebar from '../components/Sidebar' // Navigation sidebar
import WorkoutHistory from '../components/WorkoutHistory' // History page with charts
import '../app/globals.css' // Load all the styling

// ============================================
// MAIN COMPONENT FUNCTION
// ============================================
export default function Home() {
  
  // ============================================
  // STATE - Data that can change
  // ============================================
  // useState creates a variable and a function to update it
  // When you update state, React automatically re-renders the screen!
  
  // workouts: The list of workout objects for the current day
  // setWorkouts: Function to update the workouts list
  const [workouts, setWorkouts] = useState([]) // Start with empty array
  
  // status: Temporary success/error messages (like "Added successfully!")
  const [status, setStatus] = useState('') // Start with empty string
  
  // selectedDay: Which day tab is currently active ("Monday", "Tuesday", etc.)
  const [selectedDay, setSelectedDay] = useState('') // Will be set when page loads
  
  // showStartup: Should the "Train Hard [USER]" popup show?
  const [showStartup, setShowStartup] = useState(true) // Start with true (show it)
  
  // userName: The user's name (saved in localStorage)
  const [userName, setUserName] = useState('') // Start with empty string
  
  // showNameInput: Should we show the name input modal?
  const [showNameInput, setShowNameInput] = useState(false) // Start with false

  // currentPage: Which page is currently active ('main' or 'history')
  const [currentPage, setCurrentPage] = useState('main') // Start with main workout page

  // ============================================
  // STORAGE KEYS - Names for localStorage
  // ============================================
  // localStorage is like a tiny database in your browser
  // We need keys (like folder names) to organize the data
  const WORKOUTS_KEY = 'workouts' // Key for storing workout data
  const LAST_DATE_KEY = 'lastDate' // Key for storing the last date we opened the app
  const USERNAME_KEY = 'userName' // Key for storing user's name

  // Days of the week array
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // ============================================
  // USEEFFECT - Run code when page first loads
  // ============================================
  // This runs once when the component first appears on screen
  useEffect(() => {
    // Check if user has a saved name
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem(USERNAME_KEY)
      
      if (!savedName) {
        // No name saved - show name input modal
        setShowNameInput(true)
        setShowStartup(false) // Don't show startup modal yet
      } else {
        // Name exists - load it and show startup modal
        setUserName(savedName)
      }
    }
    
    // Get today's day name ("Monday", "Tuesday", etc.)
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    
    // Set the selected day to today
    setSelectedDay(today)
    
    // Check if it's a new day (to reset checkboxes)
    checkAndResetDaily()
    
    // Load any saved workouts from localStorage
    loadWorkouts()
  }, []) // Empty array means: "Run only once on first load"

  // ============================================
  // DAILY RESET FUNCTION
  // ============================================
  // Checks if it's a new day and resets all checkboxes if needed
  const checkAndResetDaily = () => {
    // Get today's date as a string (e.g., "Mon Oct 27 2025")
    const today = new Date().toDateString()
    
    // Get the last date we saw from localStorage (might be null first time)
    const lastDate = typeof window !== 'undefined' ? localStorage.getItem(LAST_DATE_KEY) : null
    
    // If there's no lastDate (first time using app) OR dates are different (new day)
    if (!lastDate || lastDate !== today) {
      console.log('New day detected! Resetting checkboxes...')
      
      // Get all workouts from storage (organized by day)
      const savedWorkouts = getWorkoutsFromStorage()
      
      // If we have workouts stored
      if (savedWorkouts && Object.keys(savedWorkouts).length > 0) {
        // Create a copy of workouts with all checkboxes set to false
        const resetWorkouts = {}
        
        // Loop through each day (Monday, Tuesday, etc.)
        Object.keys(savedWorkouts).forEach(day => {
          // For each workout in that day, set checked to false
          resetWorkouts[day] = savedWorkouts[day].map(workout => ({
            ...workout, // Keep all properties (name, dateAdded, etc.)
            checked: false // But set checked to false (unchecked)
          }))
        })
        
        // Save the reset workouts back to storage
        saveWorkoutsToStorage(resetWorkouts)
        
        // Reload workouts to update the screen
        loadWorkouts()
      }
      
      // Save today's date so we can check again tomorrow
      if (typeof window !== 'undefined') {
        localStorage.setItem(LAST_DATE_KEY, today)
      }
    }
  }

  // ============================================
  // LOCAL STORAGE FUNCTIONS
  // ============================================
  // Helper functions to save and load data
  
  // Get workouts from localStorage (browser's permanent storage)
  const getWorkoutsFromStorage = () => {
    // localStorage only works in browser, not during server-side rendering
    if (typeof window === 'undefined') return {}
    
    // Get the workouts string from storage
    const workoutsJSON = localStorage.getItem(WORKOUTS_KEY)
    
    // If workouts exist, convert from string to object
    // If not, return empty object
    return workoutsJSON ? JSON.parse(workoutsJSON) : {}
  }

  // Save workouts to localStorage
  const saveWorkoutsToStorage = (workoutsData) => {
    // localStorage only works in browser
    if (typeof window === 'undefined') return
    
    // Convert workouts object to string and save
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workoutsData))
  }

  // ============================================
  // LOAD WORKOUTS FOR CURRENT DAY
  // ============================================
  const loadWorkouts = () => {
    // If no day is selected yet, don't do anything
    if (!selectedDay) return
    
    // Get all workouts from storage (all days)
    const savedWorkouts = getWorkoutsFromStorage()
    
    // If this day has workouts, load them
    // Otherwise, show empty array (no workouts)
    if (savedWorkouts[selectedDay]) {
      setWorkouts(savedWorkouts[selectedDay])
    } else {
      setWorkouts([])
    }
  }

  // ============================================
  // USEEFFECT - Load workouts when day changes
  // ============================================
  // Watch the selectedDay variable - when it changes, load workouts for that day
  useEffect(() => {
    loadWorkouts()
  }, [selectedDay]) // Re-run when selectedDay changes

  // ============================================
  // CRUD OPERATIONS (Create, Read, Update, Delete)
  // ============================================

  // CREATE - Add a new workout
  const addWorkout = (workoutName) => {
    // Create a new workout object
    const newWorkout = {
      name: workoutName, // The name user entered
      checked: false, // Always start as unchecked
      dateAdded: new Date().toISOString() // Timestamp of when added
    }
    
    // Get all workouts from storage
    const allWorkouts = getWorkoutsFromStorage()
    
    // Get workouts for the currently selected day, or empty array if none
    const dayWorkouts = allWorkouts[selectedDay] || []
    
    // Add the new workout to the day's list
    const updatedDayWorkouts = [...dayWorkouts, newWorkout]
    
    // Save the updated list for this day
    allWorkouts[selectedDay] = updatedDayWorkouts
    
    // Save everything back to storage
    saveWorkoutsToStorage(allWorkouts)
    
    // Update the state so screen refreshes
    setWorkouts(updatedDayWorkouts)
    
    // Show a success message
    updateStatus(`"${workoutName}" added successfully!`)
  }

  // UPDATE - Toggle checkbox (checked/unchecked)
  const toggleWorkout = (index) => {
    // Get all workouts from storage
    const allWorkouts = getWorkoutsFromStorage()
    
    // Get workouts for current day
    const dayWorkouts = allWorkouts[selectedDay] || []
    
    // Create a copy of the day's workouts
    const updatedDayWorkouts = [...dayWorkouts]
    
    // Toggle the checked status of the specific workout
    updatedDayWorkouts[index].checked = !updatedDayWorkouts[index].checked
    
    // Save back to storage
    allWorkouts[selectedDay] = updatedDayWorkouts
    saveWorkoutsToStorage(allWorkouts)
    
    // Update state to refresh screen
    setWorkouts(updatedDayWorkouts)
  }

  // DELETE - Remove a workout
  const deleteWorkout = (index) => {
    // Get all workouts from storage
    const allWorkouts = getWorkoutsFromStorage()
    
    // Get workouts for current day
    const dayWorkouts = allWorkouts[selectedDay] || []
    
    // Create new array without the deleted workout
    // filter keeps items where the condition is true
    const updatedDayWorkouts = dayWorkouts.filter((_, i) => i !== index)
    
    // Save back to storage
    allWorkouts[selectedDay] = updatedDayWorkouts
    saveWorkoutsToStorage(allWorkouts)
    
    // Update state to refresh screen
    setWorkouts(updatedDayWorkouts)
    
    // Show confirmation message
    updateStatus('Workout deleted!')
  }

  // DELETE ALL - Clear all workouts for current day
  const clearAllWorkouts = () => {
    // Ask user for confirmation
    if (window.confirm('Are you sure you want to delete all workouts for this day?')) {
      // Get all workouts
      const allWorkouts = getWorkoutsFromStorage()
      
      // Empty the array for current day
      allWorkouts[selectedDay] = []
      
      // Save to storage
      saveWorkoutsToStorage(allWorkouts)
      
      // Clear the workouts state
      setWorkouts([])
      
      // Show confirmation
      updateStatus('All workouts cleared!')
    }
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  // Show a temporary status message
  const updateStatus = (message) => {
    // Set the status text
    setStatus(message)
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      setStatus('')
    }, 3000)
  }

  // Save user's name and close name input modal
  const handleSaveName = (name) => {
    // Save name to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(USERNAME_KEY, name)
    }
    
    // Update state
    setUserName(name)
    
    // Hide name input modal
    setShowNameInput(false)
    
    // Show startup modal with their name
    setShowStartup(true)
  }
  
  // Close the startup modal
  const handleCloseStartup = () => {
    setShowStartup(false)
  }

  // Handle page navigation from sidebar
  const handlePageChange = (pageId) => {
    setCurrentPage(pageId)
  }

  // Get all workout data for history page
  const getAllWorkoutsData = () => {
    return getWorkoutsFromStorage()
  }

  // ============================================
  // RENDER - What actually shows on screen
  // ============================================
  return (
    <div className="app-container">
      {/* Sidebar navigation */}
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />

      {/* Main content area */}
      <main className="main-content">
        {/* If showNameInput is true, show the name input modal */}
        {showNameInput && <NameInputModal onSave={handleSaveName} />}
        
        {/* If showStartup is true, show the startup modal with user's name */}
        {showStartup && <StartupModal onClose={handleCloseStartup} userName={userName} />}

        {/* Show main workout page or history page based on currentPage */}
        {currentPage === 'main' ? (
          /* MAIN WORKOUT PAGE */
          <div className="workout-page">
            {/* Header section with title */}
            <header>
              <h1>💪 Workout Checklist</h1>
              <p className="subtitle">Track your daily workouts</p>
            </header>

            {/* Day tabs (Mon, Tue, Wed, etc.) */}
            <DayTabs 
              days={days} // Pass the days array
              selectedDay={selectedDay} // Pass which day is selected
              onSelectDay={setSelectedDay} // Pass the function to change selected day
            />

            {/* Form to add new workouts */}
            <WorkoutForm onAdd={addWorkout} />

            {/* List of workouts for the current day */}
            <WorkoutList 
              workouts={workouts} // Pass the workouts array
              onToggle={toggleWorkout} // Pass function to handle checkbox click
              onDelete={deleteWorkout} // Pass function to handle delete button
            />

            {/* Legend section at bottom (notes for each day) */}
            <Legend day={selectedDay} />

            {/* Footer with clear button */}
            <footer>
              <button className="clear-btn" onClick={clearAllWorkouts}>
                Clear All Workouts
              </button>
              {/* Show status message if there is one */}
              {status && <p className="status-text">{status}</p>}
            </footer>
          </div>
        ) : (
          /* HISTORY PAGE */
          <WorkoutHistory workoutsData={getAllWorkoutsData()} />
        )}
      </main>
    </div>
  )
}
