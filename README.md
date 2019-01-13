# kindle-infodisplay

A small website used to display current weather, forecast & upcoming birthdays on a Kindle Paperwhite as described in [my blogpost](https://jaroz.ink/blog/infodisplay/).

**Warning:** This code was neither written to be easily adapted/customized nor for a "modern" browser as you know it. The Kindle Paperwhite's "Beta Browser" comes with several limitations, which is why there are some ugly passages in the source.

That said, I tried to keep it simple and lightweight. Also, I'm rather a devops guy than a frontend developer, so there's nothing too fancy around here.

## Setup

Edit the `js/config.js` to contain your OpenWeatherMap API token, birthday dates and other desired changes.

Afterwards, fire up a webserver somewhere (on a Raspberry Pi, e.g.) and let it serve your code, like so:

`docker run --name kindle-infodisplay -p 80:80 -v [PATH/TO/CODE]:/usr/share/nginx/html:ro nginx`

> You need a webserver because the Kindle Beta Browser does not support the `file:///` protocol. Otherwise it would be possible to put the source files on the Kindle itself, of course.
