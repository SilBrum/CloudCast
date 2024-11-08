# **CloudCast**

CloudCast is a weather forecasting web application that provides real-time weather information for various cities.


![homepage](https://github.com/user-attachments/assets/33dbd3a7-1aa8-4ac1-857b-e3c85710a706)




The app features a dynamic interface, allowing users to search for city-specific weather and view detailed forecasts including temperature, humidity, air quality, along with hourly and 5-day forecasts and a dynamic real-time heat map.



![weatherinfo1](https://github.com/user-attachments/assets/1ce7d865-7cdb-4337-9ef5-fe32f1955f60)
![Forecast](https://github.com/user-attachments/assets/8ef6fe3c-b338-4ad8-b2b9-1410dc47f83a)
![heatmap](https://github.com/user-attachments/assets/6cdd6db2-d2e6-4b92-9dcc-99a2a1dd00dc)


## Features

    Real-time Weather Information: Fetches current weather details for any city.
    Hourly and 5-Day Forecasts: Displays detailed weather forecasts for the next few hours and days.
    Unit Toggle: Users can switch between Celsius and Fahrenheit.
    Dynamic Backgrounds: Background changes based on the current weather.
    Responsive Design: Adjusts to different screen sizes.

## Technologies Used

    React: For building the user interface.
    Vite: Development server for fast and efficient builds.
    Axios: For making API requests.
    React Router: For client-side routing.
    Bootstrap: For styling and responsive design.
    Tailwind CSS: For custom styling.
    Chart.js & React-Chartjs-2: For rendering weather charts.
    Leaflet & React-Leaflet: For displaying maps.

```
  CloudCast/
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable components (Navbar, SearchBar, WeatherCard, etc.)
│   ├── pages/                # Main pages (Home, CityWeather)
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point
│   └── styles/               # CSS files
├── .env                      # Environment variables (API keys)
├── package.json              # Project metadata and dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # Project documentation
```

## Installation and Setup
### Prerequisites

    Node.js and npm installed.

## Steps

Clone the repository:

```

git clone https://github.com/SilBrum/CloudCast.git
cd CloudCast

```

### Install Dependencies:

```
npm install
```

### Set Up Environment Variables:
Create a .env file in the root directory with your OpenWeatherMap API key:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

### Run the Application:

```
npm run dev
```

### Build for Production:

```
npm run build
```

### Deploy (Optional):
```
    npm run deploy
```

### External Libraries

    Axios: Handles API requests.
    React Router: Manages navigation.
    Bootstrap: Simplifies responsive design.
    Tailwind CSS: Provides utility-first CSS for styling.
    Chart.js: Visualizes weather data with charts.
    React-Leaflet: Integrates Leaflet maps.

### Code Organization

    App.jsx: Main entry point for the application, manages routing.
    Home.jsx & CityWeather.jsx: Main pages for displaying weather details.
    components/: Contains reusable components like Navbar, SearchBar, and WeatherCard.
    styles/: Houses all the CSS files for custom styles.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.


### License

This project is licensed under the MIT License. See the LICENSE file for details.

