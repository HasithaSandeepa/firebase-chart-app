# Firebase Sensor Data Visualization

## Description

This project is a React application built with Vite to visualize temperature and humidity data captured from sensors in a polytunnel environment. The data is stored in Firebase Realtime Database and displayed using Chart.js in two separate line charts.

## Features

- Real-time data fetching from Firebase.
- Dual line charts for temperature and humidity trends.
- Variance visualization for identifying fluctuations.
- Responsive and interactive UI built with React and Chart.js.

## Technologies Used

- React with Vite
- Firebase Realtime Database
- Chart.js
- JavaScript (ES6)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repository-name>.git
   ```
2. Navigate to the project directory:
   ```bash
   cd firebase-chart-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

Replace the Firebase configuration in `LineChart.jsx` with your project-specific credentials:

```javascript
const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<AUTH_DOMAIN>",
  databaseURL: "<DATABASE_URL>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGING_SENDER_ID>",
  appId: "<APP_ID>",
};
```

## Usage

- The application automatically fetches and updates sensor data.
- View trends and variances in temperature and humidity through intuitive line charts.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

[Your Name] - University of Ruhuna - Faculty of Technology

## Contributions

Contributions are welcome. Feel free to fork the repository and submit pull requests.
