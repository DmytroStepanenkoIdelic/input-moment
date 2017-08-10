# yet-another-datetime-picker
React datetime picker powered by [momentjs](http://momentjs.com)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker.

The icons are from [ionicons](http://ionicons.com/).

### Demo
http://noahsug.github.io/input-moment

### Usage
``` javascript
<DatetimePicker
  moment={this.state.moment}
  onChange={this.handleChange}
  onDone={this.handleDone}
  theme={{
    primaryColor="#1385e5", // default
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

Note: If you change the theme's primaryColor, you should also add CSS rules to change the following:
 * .u-slider-time .value { background-color: `<yourPrimaryColor>` }
 * .u-slider-time .handle::after { border-color: `<yourPrimaryColor>` }

## This repo is forked from [moment-input](https://www.npmjs.com/package/input-moment) with the following changes
- Specify type="time" or type="date" to have a date-only or time-only input.
- Theming support allows customization of colors and icons.
- Buttons to move forward or backwards between years.
- Fixed package / build issues.

### Installation
``` sh
npm i yet-another-datetime-picker --save
```

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Development
- npm install
- npm run build
- npm start
- http://localhost:8888/example

### License
ISC
