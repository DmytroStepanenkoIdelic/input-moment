# yet-another-datetime-picker
React datetime picker powered by [momentjs](http://momentjs.com)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker

The icons are from [ionicons](http://ionicons.com/)

### Demo
http://noahsug.github.io/input-moment

### Usage
``` javascript
<DatetimePicker
  moment={this.state.moment}
  range={{
    start: this.state.startRange, // optional
    end: this.state.endRange // optional
  }}
  onChange={this.handleChange}
  onDone={this.handleDone}
  theme={{
    colorPrimary="#1385e5", // default
    colorSecondary="#e77213", // default
    colorGray="#999999", // default
    colorError="#e71313", // default
    iconPrevMonth="ion-ios-arrow-left", // default
    iconNextMonth="ion-ios-arrow-right", // default
    iconDone: 'ion-checkmark',  // default
    iconDate: 'ion-calendar',  // default
    iconTime: 'ion-clock',  // default
  }}
  type="datetime" // default, other values are "date" or "type"
/>
```
Check [app.js](https://github.com/noahsug/input-moment/blob/master/example/app.js) for a working example.

## This repo is forked from [moment-input](https://www.npmjs.com/package/input-moment) with the following changes
- Specify type="time" or type="date" to have a date-only or time-only input.
- Theming support allows customization of colors and icons.
- Buttons to move forward or backwards between years.
- Fixed package / build issues.
- Date range added which highlights the days in the range specified

### Installation
``` sh
npm i yet-another-datetime-picker --save
```

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Development
- npm install
- npm start
- http://localhost:8888/example

### License
ISC
