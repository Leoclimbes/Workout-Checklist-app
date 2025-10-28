// ============================================
// ROOT LAYOUT COMPONENT
// ============================================
// This component wraps around ALL pages in your app
// It provides the basic HTML structure and metadata
// Think of it as the frame that holds your pictures

// Export metadata for SEO and browser tab
export const metadata = {
  title: 'Workout Checklist', // This shows in the browser tab
  description: 'Track your daily workouts with automatic daily reset', // Used by search engines
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no', // iPhone optimization
}

// This is the main layout function
// It receives { children } - whatever you put inside this component
export default function RootLayout({ children }) {
  
  // This is what shows on screen
  return (
    // <html> is the root element - contains everything
    <html lang="en"> {/* lang="en" tells screen readers this is English */}
      {/* <body> contains all visible content */}
      <body>
        {/* {children} is where your actual page content goes */}
        {/* When you use <RootLayout>, anything you put inside becomes {children} */}
        {children}
        
        {/* Example: <RootLayout><MyPage /></RootLayout> */}
        {/* MyPage becomes {children} and renders here */}
      </body>
    </html>
  )
}

// How this works in Next.js:
// 1. Next.js automatically wraps all pages with this layout
// 2. app/page.js becomes {children}
// 3. Your page.js content renders where {children} is
// 4. This provides consistent HTML structure for every page
