TIMEZONE = 'Europe/Berlin'
LOCALE = 'de'
API_KEY = ''
API_BASE = "http://api.openweathermap.org/data/2.5"
CITY = "Berlin,de"
PARAMS = "?q=" + CITY + "&units=metric&lang=" + LOCALE + "&appid=" + API_KEY
WEATHER_URL = API_BASE + "/weather" + PARAMS
FORECAST_URL = API_BASE + "/forecast" + PARAMS
BIRTHDAYS = [
    {
        "month": 1,
        "day": 5,
        "name": "Test"
    }
]
