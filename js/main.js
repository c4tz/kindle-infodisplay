var lastMinute = 0
var lastDay = 0

function info() {
    date = moment()

    minute = date.minutes()
    if (minute != lastMinute) {
        $('#time').text(date.format('HH:mm'))
    }
    lastMinute = minute

    day = date.date()
    if (day != lastDay) {
        $('#date').text(date.format('LL'))
        printBirthdays(date)
    }
    lastDay = day
}

function printBirthdays(today) {
    $('#birthdaytitle, #birthdays').hide()
    $('#birthdays').empty()
    today.hours(0)
    today.minutes(0)
    today.seconds(0)
    occuringBirthday = false
    for (i = 0; i < BIRTHDAYS.length; i++) {
        birthday = BIRTHDAYS[i]
        name = birthday['name']
        day = birthday['day']
        month = birthday['month']
        d = 'days'
        silvester = moment(today.year() + '-12-31')
        bday = moment(today.year() + '-' + month + '-' + day, "YYYY-M-D")
        if (!bday.isBetween(today.clone().subtract(3, d), silvester, d, '[]')) {
            bday.add(1, 'years')
        }
        if (bday.isBetween(
            today.clone().subtract(3, d), today.clone().add(7, d), d, '[]')
        ) {
            text = name + ' (' + day + '.' + month + '.)'
            appendElement('birthdays', 'p', text)
            occuringBirthday = true
        }
    }  
    if (occuringBirthday) {
        $('#birthdaytitle, #birthdays').show()
    }
}

function appendElement(id, tag, text) {
    // doesn't work in Kindle's "Beta Browser": 
    // $('#birthdays').append('<p>test</p>')
    e = document.createElement(tag)
    e.innerHTML = text
    document.getElementById(id).appendChild(e);
}

function weather() {

    // current weather
    $.getJSON(WEATHER_URL, function(data) {
        temp = data['main']['temp']
        weather = data['weather'][0]
        wind = data['wind']

        weatherLabel = Math.round(temp) + '\xB0C, ' + weather['description']
        windLabel = Math.round(wind['speed'] * (3600/1000)) + ' km/h'

        $('#weather-icon').removeClass()
        $('#weather-icon').addClass("wi")
        $('#weather-icon').addClass("wi-owm-" + weather['id'])
        $('#weather-label').text(weatherLabel)

        $('#wind-icon').addClass("wi")
        $('#wind-icon').addClass("wi-wind")
        $('#wind-icon').addClass("from-" + wind['deg'] + "-deg")
        $('#wind-label').text(windLabel)
    })
    
    // forecast
    $.getJSON(FORECAST_URL, function(data) {
        forecast = data.list
        $('#forecast').empty()
        forecast = forecast.filter(function (entry) {
            return moment().utc().format('X') < entry.dt
        })
        for (i = 0; i < 3; i++) {
            f = forecast[i]
            weather = f['weather'][0]['description']
            temp = Math.round(f['main']['temp']) + '\xB0C'
            label = temp + ', ' + weather
            icon = "wi wi-owm-" + f['weather'][0]['id']
            time = date = moment(f['dt_txt']+'Z').hours() + ' Uhr'
            // template literals also don't work
            div = '<b><p>' + time + '</p></b>' + 
            '<i class="' + icon + '"></i>' +
            '<p>'+ label + '</p>'
            appendElement('forecast', 'div', div)
        }
    })
}

$(function() {
    moment.locale(LOCALE)
    moment.tz.setDefault(TIMEZONE)
    weather()
    info()
    setInterval(weather, 10 * 60 * 1000)
    setInterval(info, 10 * 1000)
})
