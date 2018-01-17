require('../src/less/datetime-picker.less')
require('./app.less')

var moment = require('moment')
var React = require('react')
var ReactDOM = require('react-dom')
var DatetimePicker = require('../src/datetime-picker')
var packageJson = require('../package.json')

var App = React.createClass({
  displayName: 'App',

  selectionTypes: [{
    value: 'single',
    label: 'Single Date'
  }, {
    value: 'start',
    label: 'Start Date'
  }, {
    value: 'end',
    label: 'End Date'
  }],

  getInitialState() {
    return {
      m: moment(),
      rangeType: 'single',
      range: null
    }
  },

  render() {
    console.log(this.state.m, this.state.range);
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
          <div className="input">
            {this.selectionTypes.map(selectionType => (
              <label>
                <input
                  type="radio"
                  value={selectionType.value}
                  checked={this.state.rangeType == selectionType.value}
                  onChange={this.handleRangeChange}
                />
                <span>{selectionType.label}</span>
              </label>
            ))}
          </div>
          <DatetimePicker
            moment={this.state.m}
            range={this.state.range}
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

  handleRangeChange(evt) {
    const rangeType = evt.target.value;
    if (rangeType == 'single') {
      this.setState({
        rangeType,
        range: null
      })
    } else {
      if (this.state.rangeType == 'single') {
        this.setState({
          rangeType,
          range: {
            type: rangeType,
            other: null
          }
        })
      } else {
        this.setState({
          rangeType,
          range: {
            type: rangeType,
            other: this.state.m
          },
          m: this.state.range.other || this.state.m.clone()
        })
      }
    }
  },

  handleDone() {
    console.log('saved', this.state.m.format('llll'))
  },
})

ReactDOM.render(<App />, document.getElementById('app'))
