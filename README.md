# Workout Checklist App 💪

A Next.js workout tracking application with automatic daily checkbox reset.

## Features

- ✅ Add and track daily workouts
- ✅ Check off workouts as you complete them
- 🔄 **Automatic daily reset** - All checkboxes reset each new day
- 💾 Data persists in browser localStorage
- 🎨 Beautiful, modern UI
- 📱 Responsive design
- ⚡ Built with Next.js 14 (App Router)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Add Workouts**: Enter a workout name and click "Add Workout"
2. **Track Progress**: Check the box when you complete a workout
3. **Daily Reset**: When you open the app on a new day, all checkboxes automatically reset to unchecked
4. **Persistent Storage**: Your workouts are saved in your browser's localStorage

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **CSS3** - Styling with Flexbox, Gradients, Transitions
- **localStorage** - Client-side data persistence

## Project Structure

```
Workout-Checklist-app/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Main page component
│   └── globals.css        # Global styles
├── components/
│   ├── WorkoutForm.js     # Form component
│   ├── WorkoutList.js     # List container
│   └── WorkoutItem.js     # Individual workout item
├── package.json
└── README.md
```

## Learn More

This app demonstrates:
- Next.js App Router architecture
- React Server Components vs Client Components
- useState and useEffect hooks
- localStorage for persistence
- Date handling for daily resets
- Component composition and props
- Event handling in React/Next.js

## Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build ready to deploy.

## Deployment

Deploy to Vercel (recommended for Next.js):
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy automatically!

Or deploy to any platform that supports Node.js.
