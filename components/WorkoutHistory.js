// ============================================
// WORKOUT HISTORY PAGE COMPONENT
// ============================================
// This component displays workout history with charts
// It shows weekly, monthly, and yearly workout statistics
// Uses Recharts library for beautiful data visualization

'use client' // This component needs browser features

import { useState, useEffect } from 'react' // useState: manage chart tabs, useEffect: load data
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts' // Recharts components for charts

// This function receives props from the parent:
// workoutsData: All workout data from localStorage
export default function WorkoutHistory({ workoutsData }) {
  
  // ============================================
  // STATE - Track which chart tab is active
  // ============================================
  const [activeChart, setActiveChart] = useState('weekly') // Start with weekly view
  const [chartData, setChartData] = useState({}) // Store processed chart data

  // ============================================
  // CHART TABS - Define our chart options
  // ============================================
  const chartTabs = [
    { id: 'weekly', label: '📅 Weekly', description: 'Workouts by day of week' },
    { id: 'monthly', label: '📆 Monthly', description: 'Workouts by month' },
    { id: 'yearly', label: '🗓️ Yearly', description: 'Workouts by year' }
  ]

  // ============================================
  // DATA PROCESSING FUNCTIONS
  // ============================================
  // These functions take raw workout data and convert it into chart-friendly format

  // Process weekly data - count workouts by day of week
  const processWeeklyData = (data) => {
    // Days of the week in order
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    // Create data structure for chart
    const weeklyStats = days.map(day => ({
      day: day.substring(0, 3), // Short form: Mon, Tue, Wed, etc.
      fullDay: day, // Full name for tooltip
      workouts: 0, // Start with 0 workouts
      completed: 0 // Start with 0 completed
    }))

    // Count workouts for each day
    Object.keys(data).forEach(day => {
      if (data[day] && Array.isArray(data[day])) {
        const dayIndex = days.indexOf(day)
        if (dayIndex !== -1) {
          // Count total workouts
          weeklyStats[dayIndex].workouts = data[day].length
          
          // Count completed workouts (checked: true)
          weeklyStats[dayIndex].completed = data[day].filter(workout => workout.checked).length
        }
      }
    })

    return weeklyStats
  }

  // Process monthly data - count workouts by month
  const processMonthlyData = (data) => {
    const monthlyStats = {} // Will store { "2024-01": { workouts: 5, completed: 3 }, ... }

    // Loop through all days and their workouts
    Object.keys(data).forEach(day => {
      if (data[day] && Array.isArray(data[day])) {
        data[day].forEach(workout => {
          // Get the date when workout was added
          const workoutDate = new Date(workout.dateAdded)
          const monthKey = `${workoutDate.getFullYear()}-${String(workoutDate.getMonth() + 1).padStart(2, '0')}`
          
          // Initialize month if it doesn't exist
          if (!monthlyStats[monthKey]) {
            monthlyStats[monthKey] = {
              month: monthKey,
              displayMonth: workoutDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              workouts: 0,
              completed: 0
            }
          }
          
          // Count workouts
          monthlyStats[monthKey].workouts++
          
          // Count completed workouts
          if (workout.checked) {
            monthlyStats[monthKey].completed++
          }
        })
      }
    })

    // Convert to array and sort by month
    return Object.values(monthlyStats).sort((a, b) => a.month.localeCompare(b.month))
  }

  // Process yearly data - count workouts by year
  const processYearlyData = (data) => {
    const yearlyStats = {} // Will store { "2024": { workouts: 50, completed: 30 }, ... }

    // Loop through all days and their workouts
    Object.keys(data).forEach(day => {
      if (data[day] && Array.isArray(data[day])) {
        data[day].forEach(workout => {
          // Get the year when workout was added
          const workoutDate = new Date(workout.dateAdded)
          const yearKey = workoutDate.getFullYear().toString()
          
          // Initialize year if it doesn't exist
          if (!yearlyStats[yearKey]) {
            yearlyStats[yearKey] = {
              year: yearKey,
              workouts: 0,
              completed: 0
            }
          }
          
          // Count workouts
          yearlyStats[yearKey].workouts++
          
          // Count completed workouts
          if (workout.checked) {
            yearlyStats[yearKey].completed++
          }
        })
      }
    })

    // Convert to array and sort by year
    return Object.values(yearlyStats).sort((a, b) => a.year.localeCompare(b.year))
  }

  // ============================================
  // USEEFFECT - Process data when workoutsData changes
  // ============================================
  useEffect(() => {
    if (workoutsData && Object.keys(workoutsData).length > 0) {
      // Process all chart data
      const processedData = {
        weekly: processWeeklyData(workoutsData),
        monthly: processMonthlyData(workoutsData),
        yearly: processYearlyData(workoutsData)
      }
      
      // Update state with processed data
      setChartData(processedData)
    } else {
      // No data available - set empty data
      setChartData({
        weekly: [],
        monthly: [],
        yearly: []
      })
    }
  }, [workoutsData]) // Re-run when workoutsData changes

  // ============================================
  // CUSTOM TOOLTIP COMPONENT
  // ============================================
  // This creates a custom tooltip that shows when you hover over chart bars
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload // Get the data for this bar
      
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.fullDay || data.displayMonth || data.year}</p>
          <p className="tooltip-item">
            <span className="tooltip-color" style={{ backgroundColor: '#8884d8' }}></span>
            Total Workouts: {data.workouts}
          </p>
          <p className="tooltip-item">
            <span className="tooltip-color" style={{ backgroundColor: '#82ca9d' }}></span>
            Completed: {data.completed}
          </p>
          <p className="tooltip-item">
            <span className="tooltip-color" style={{ backgroundColor: '#ffc658' }}></span>
            Completion Rate: {data.workouts > 0 ? Math.round((data.completed / data.workouts) * 100) : 0}%
          </p>
        </div>
      )
    }
    return null
  }

  // ============================================
  // RENDER - What shows on screen
  // ============================================
  return (
    <div className="history-page">
      {/* Page header */}
      <header className="history-header">
        <h1>📊 Workout History</h1>
        <p className="history-subtitle">Track your fitness progress over time</p>
      </header>

      {/* Chart tabs */}
      <div className="chart-tabs">
        {chartTabs.map((tab) => (
          <button
            key={tab.id}
            className={`chart-tab ${activeChart === tab.id ? 'active' : ''}`}
            onClick={() => setActiveChart(tab.id)}
          >
            <span className="tab-icon">{tab.label.split(' ')[0]}</span>
            <span className="tab-label">{tab.label.split(' ')[1]}</span>
            <span className="tab-description">{tab.description}</span>
          </button>
        ))}
      </div>

      {/* Chart container */}
      <div className="chart-container">
        {/* Show message if no data */}
        {(!chartData[activeChart] || chartData[activeChart].length === 0) ? (
          <div className="no-data-message">
            <h3>📈 No Data Yet</h3>
            <p>Start adding workouts to see your progress!</p>
            <p className="data-tip">💡 Complete workouts by checking them off to see completion rates</p>
          </div>
        ) : (
          /* Chart with data */
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData[activeChart]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* Grid lines for easier reading */}
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              
              {/* X-axis (horizontal) - shows days/months/years */}
              <XAxis 
                dataKey={activeChart === 'weekly' ? 'day' : activeChart === 'monthly' ? 'displayMonth' : 'year'}
                stroke="#666"
                fontSize={12}
              />
              
              {/* Y-axis (vertical) - shows workout counts */}
              <YAxis 
                stroke="#666"
                fontSize={12}
                allowDecimals={false} // No decimal numbers for workout counts
              />
              
              {/* Tooltip that appears on hover */}
              <Tooltip content={<CustomTooltip />} />
              
              {/* Bar for total workouts */}
              <Bar 
                dataKey="workouts" 
                fill="#8884d8" 
                name="Total Workouts"
                radius={[4, 4, 0, 0]} // Rounded top corners
              />
              
              {/* Bar for completed workouts */}
              <Bar 
                dataKey="completed" 
                fill="#82ca9d" 
                name="Completed"
                radius={[4, 4, 0, 0]} // Rounded top corners
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#8884d8' }}></span>
          <span className="legend-label">Total Workouts</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#82ca9d' }}></span>
          <span className="legend-label">Completed Workouts</span>
        </div>
      </div>

      {/* Summary statistics */}
      {chartData[activeChart] && chartData[activeChart].length > 0 && (
        <div className="summary-stats">
          <h3>📈 Summary</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">
                {chartData[activeChart].reduce((sum, item) => sum + item.workouts, 0)}
              </span>
              <span className="stat-label">Total Workouts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {chartData[activeChart].reduce((sum, item) => sum + item.completed, 0)}
              </span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {(() => {
                  const total = chartData[activeChart].reduce((sum, item) => sum + item.workouts, 0)
                  const completed = chartData[activeChart].reduce((sum, item) => sum + item.completed, 0)
                  return total > 0 ? Math.round((completed / total) * 100) : 0
                })()}%
              </span>
              <span className="stat-label">Completion Rate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================
// HOW THIS COMPONENT WORKS:
// ============================================
// 1. Receives all workout data from parent component
// 2. Processes raw data into chart-friendly format for weekly/monthly/yearly views
// 3. Uses Recharts library to create beautiful bar charts
// 4. Shows two bars per data point: total workouts and completed workouts
// 5. Includes interactive tooltips and summary statistics
// 6. Handles empty data gracefully with helpful messages
//
// DATA FLOW:
// Raw workout data → Processing functions → Chart data → Recharts visualization
