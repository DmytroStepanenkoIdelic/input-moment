# yet-another-datetime-picker
React datetime picker powered by [momentjs](http://momentjs.com)

The design is from https://dribbble.com/shots/1439965-Due-Date-and-Time-Picker.

The icon is from [ionicons](http://ionicons.com/).

### Installation
``` sh
npm i input-moment --save
```

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Demo
http://noahsug.github.io/input-moment

### Usage
``` javascript
<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  onSave={this.handleSave}
  prevMonthIcon="ion-ios-arrow-left" // default
  nextMonthIcon="ion-ios-arrow-right" // default
  type="datetime" // default, other values are "date" or "type"
/>
```
Check [app.js](https://github.com/noahsug/input-moment/blob/master/example/app.js) for a working example.

## This is a forked repo, with the following changes
- New prop: type="time" or type="date" or type="datetime", to have a date-only or time-only input.
- Arrows to move forward or backwards between years.
- Removed save button.
- Made it more clear which date is selected.
- Fixed package / build issues.

### Development
- npm install
- npm start
- http://localhost:8888

### License
ISC
