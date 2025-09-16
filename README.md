<br/>

<div align="center"><a href="https://nba-dashboard-hyeonahc.vercel.app" target="_blank"><img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f3c0.svg" width="120px"></div>

<br/>

<div align="center">

![last commit](https://img.shields.io/github/last-commit/hyeonahc/nba-dashboard?color=green)
![most language](https://img.shields.io/github/languages/top/hyeonahc/nba-dashboard)
[![release](https://img.shields.io/badge/release-v0.1.0-yellow)](https://github.com/hyeonahc/nba-dashboard/releases/tag/v0.1.0)

</div>

<br/>

# NBA Dashboard

- [✨ Project Summary](#-project-summary)
- [🛠 Tech Stack](#-tech-stack)
- [🌐 Integrated APIs](#-integrated-apis)
- [🚀 Technical Highlights](#-technical-highlights)
- [🎯 Design Decisions](#-design-decisions)
- [🚧 Future Improvements](#-future-improvements)

<br />

## ✨ Project Summary

A lightweight NBA dashboard that surfaces upcoming games, recent results, conference standings, latest news, and trending videos with a clean, mobile-first UI.

🔗 [Visit the live website on Vercel](https://nba-dashboard-hyeonahc.vercel.app)

<br/>

## 🛠 Tech Stack

**React + TypeScript + Vite**

- **React Query**: server-state management, caching, retries
- **Axios**: simplified HTTP client with interceptors for cleaner API handling
- **Tailwind CSS**: utility-first styling for responsive design

<br />

## 🌐 Integrated APIs

### Why I Chose These APIs

- **[Ball Don’t Lie](https://www.balldontlie.io/)**: Simple, free, and fast for prototyping schedules & results
- **[API-Basketball](https://www.api-basketball.com/)**: Richer standings data with win%, conference splits, and detailed stats
- **[YouTube Data v3](https://developers.google.com/youtube/v3)**: Reliable source for trending and recent NBA video content
- **[NBA Latest News (RapidAPI)](https://rapidapi.com/savey03/api/nba-latest-news)**: Quick access to NBA headlines for up-to-date context
- **[Pexels](https://www.pexels.com/api/)**: High-quality basketball images to supplement news articles (since News API doesn’t provide thumbnails)

This mix showcases different data shapes (lists, leaderboards, media cards) and rate-limit handling strategies.

<br />

## 🚀 Technical Highlights

- **Smart Caching & Rate Limits**: Handles multiple APIs with different quotas (5/min, 100/day) using type-safe caching, stale-while-revalidate, and fallback to stale data.
- **AI-Driven Image Selection**: Analyzes article titles → generates context-aware search terms for Pexels, ensuring relevant and optimized images.
- **Advanced UI/UX**: Smooth animations (skeletons, spinners, hover effects), responsive 3-column grid, and NBA-inspired gradient design.
- **Robust Data Pipeline**: Multi-season fallback for standings, NBA-specific ranking logic (win% → wins → point diff), and error recovery.

<br/>

## 🎯 Design Decisions

1. **Visual Hierarchy & Branding**

   - Orange, basketball-inspired theme
   - Clean card-based layout
   - 3-column structure for organized data display

2. **Responsive & Accessible**

   - Mobile-first design
   - Touch-friendly, scalable typography
   - Accessibility support (alt text, keyboard nav, focus states)

3. **Visual Effects & Interactions**
   - Gradients, shadows, smooth animations
   - Clear loading states with skeletons & spinners

<br/>

## 🚧 Future Improvements

- Add testing coverage
- Complete pages: Games / Teams / Players / Statistics
- Introduce global state management (Redux/Zustand)
- Enhance interactivity: filtering, sorting, personalization
  - e.g., season dropdown for user-driven data display
