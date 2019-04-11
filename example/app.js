require('../src/less/datetime-picker.less')
require('./app.less')

var moment = require('moment')
var React = require('react')
var ReactDOM = require('react-dom')
var DatetimePicker = require('../src/datetime-picker')
var packageJson = require('../package.json')

class App extends React.Component {
  displayName = 'App';

  selectionTypes = [{
    value: 'single',
    label: 'Single Date'
  }, {
    value: 'start',
    label: 'Start Date'
  }, {
    value: 'end',
    label: 'End Date'
  }, {
    value: 'range',
    label: 'In Range'
  }];

  state = {
    date: moment(),
    rangeType: 'single',
    range: null
  };

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
            <input type="text" value={this.state.date.format('llll')} readOnly />
          </div>
          <DatetimePicker
            moment={this.state.date}
            range={this.state.range}
            onChange={this.handleChange}
            type="datetime"
            onDone={this.handleDone}
          />
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
        </form>
      </div>
    )
  }

  handleChange = (date) => {
    this.setState({ date })
  }

  handleRangeChange(evt) {
    const rangeType = evt.target.value;
    this.setState({rangeType});
    if (rangeType == 'single') {
      this.setState({range: null});
    } else if (rangeType == 'range') {
      if (this.state.rangeType == 'start') {
        this.setState({
          range: {
            start: this.state.date.clone(),
            end: this.state.range.end
          }
        });
      } else if (this.state.rangeType == 'end') {
        this.setState({
          range: {
            start: this.state.range.start,
            end: this.state.date.clone()
          }
        });
      }
    } else {
      if (this.state.rangeType == 'single') {
        this.setState({range: {}});
      } else if (this.state.rangeType == 'end') {
        this.setState({
          range: {end: this.state.date.clone()},
          date: this.state.range.start
        });
      } else if (this.state.rangeType == 'start') {
        this.setState({
          range: {start: this.state.date.clone()},
          date: this.state.range.end
        });
      } else if (rangeType == 'start') {
        this.setState({
          range: {end: this.state.range.end}
        });
      } else if (rangeType == 'end') {
        this.setState({
          range: {start: this.state.range.start}
        });
      }
    }
  }

  handleDone = () => {
    console.log('saved', this.state.date.format('llll'))
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
