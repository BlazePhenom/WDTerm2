# WDTerm2


# Fitness Tracker

## Overview

The **Fitness Tracker** is a web-based application designed to help users track their workouts, log meals, get AI-powered meal suggestions, and visualize progress. It features a dark mode toggle, gamification elements with badges, and reminders through notifications.

## Features

- **Workout Logging:** Users can log exercises with duration.
- **Meal Planning:** Add meals manually to track diet.
- **Progress Visualization:** Displays workouts in a bar chart.
- **Gamification:** Unlock badges based on achievements.
- **Reminders & Notifications:** Enable notifications for workout and meal tracking.
- **Dark Mode:** Toggle between light and dark themes.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **External Libraries:** Chart.js (for progress visualization)
- **API Integration:** Nutritionix API (for meal suggestions)

## Installation & Usage

### 1. Clone the Repository

```sh
 git clone https://github.com/your-username/fitness-tracker.git
 cd fitness-tracker
```

### 2. Open the Project

Simply open `index.html` in a web browser.

## How It Works

1. **Logging Workouts:** Enter exercise name and duration to add it to the list.
2. **Adding Meals:** Enter a meal name and add it to the meal tracker.
3. **AI Meal Suggestions:** Input a food item and get nutrition details using the Nutritionix API.
4. **Progress Tracking:** View a bar chart displaying weekly workout stats.
5. **Unlocking Badges:** Earn achievements based on logged workouts and meals.
6. **Enabling Notifications:** Click the enable notifications button for reminders.
7. **Dark Mode Toggle:** Switch between light and dark themes for better UI experience.


## API Configuration

The project uses Nutritionix API for meal suggestions.

```js
const appId = "04523221";
const apiKey = "37743d116badc60b33eae19a2d993aa9";
```

## Acknowledgements

I would like to extend my humble thanks to-:

- **Nutritionix API** for providing meal data.
- **Chart.js** for enabling data visualization.

