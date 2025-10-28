// ============================================
// SIDEBAR COMPONENT - Navigation Menu
// ============================================
// This component creates a sidebar with navigation tabs
// It allows users to switch between the main workout page and history page

'use client' // This component needs browser features

import { useState } from 'react' // useState: manage which tab is active

// This function receives props from the parent:
// currentPage: Which page is currently active ('main' or 'history')
// onPageChange: Function to tell parent which page to show
export default function Sidebar({ currentPage, onPageChange }) {
  
  // ============================================
  // STATE - Track which tab is active
  // ============================================
  // We don't actually need local state here since the parent manages it
  // But we could add hover effects or animations later
  
  // ============================================
  // NAVIGATION ITEMS - Define our menu options
  // ============================================
  const navItems = [
    {
      id: 'main', // Unique identifier
      label: '🏠 Workouts', // Text shown to user
      icon: '💪' // Emoji icon
    },
    {
      id: 'history',
      label: '📊 History',
      icon: '📈'
    }
  ]

  // ============================================
  // HANDLE CLICK - When user clicks a tab
  // ============================================
  const handleNavClick = (pageId) => {
    // Tell the parent component to switch to this page
    onPageChange(pageId)
  }

  // ============================================
  // RENDER - What shows on screen
  // ============================================
  return (
    <aside className="sidebar">
      {/* Sidebar header with app title */}
      <div className="sidebar-header">
        <h2>💪 Workout Tracker</h2>
        <p className="sidebar-subtitle">Your Fitness Journey</p>
      </div>

      {/* Navigation menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {/* Loop through each navigation item */}
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              {/* Each navigation button */}
              <button
                className={`nav-button ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                aria-label={`Go to ${item.label}`} // Accessibility for screen readers
              >
                {/* Icon and text */}
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar footer with additional info */}
      <div className="sidebar-footer">
        <p className="footer-text">
          Track your progress and stay motivated! 🚀
        </p>
      </div>
    </aside>
  )
}

// ============================================
// HOW THIS COMPONENT WORKS:
// ============================================
// 1. Parent component passes currentPage ('main' or 'history')
// 2. Parent also passes onPageChange function
// 3. When user clicks a tab, we call onPageChange with the new page ID
// 4. Parent updates its state and shows the correct page
// 5. The 'active' class highlights the current page tab
//
// This creates a clean separation of concerns:
// - Sidebar handles navigation UI
// - Parent handles page switching logic
// - Each page component handles its own content
