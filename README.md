# EduNexa - Interactive Learning Platform

A modern React-based learning platform built with Vite and Supabase.

## Features

- Interactive quiz system
- User authentication and profiles
- Leaderboard functionality
- Modern, responsive UI
- Real-time data with Supabase

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: CSS3
- **Backend**: Supabase
- **Deployment**: Vercel

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

### Prerequisites
- Vercel account
- Supabase project set up

### Steps

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In your Vercel project settings, add these environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

4. **Deploy**
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"
   - Your app will be live at the provided URL

### Environment Variables

Make sure to set these in your Vercel project settings:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── data/          # Static data and questions
├── App.jsx        # Main app component
└── main.jsx       # Entry point
```

## License

MIT
