require('../src/less/datetime-picker.less')
require('./app.less')

var moment = require('moment')
var React = require('react')
var ReactDOM = require('react-dom')
var DatetimePicker = require('../src/datetime-picker')
var packageJson = require('../package.json')

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      m: moment(),
    }
  },

  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}
        </h1>
        <h2>
          {packageJson.description}
        </h2>
        <form>
          <div className="input">
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <DatetimePicker
            moment={this.state.m}
            onChange={this.handleChange}
            type="datetime"
            onDone={this.handleDone}
          />
        </form>
      </div>
    )
  },

  handleChange(m) {
    this.setState({ m })
  },

  handleDone() {
    console.log('saved', this.state.m.format('llll'))
  },
})

ReactDOM.render(<App />, document.getElementById('app'))
