const cx = require('classnames')
const blacklist = require('blacklist')
const React = require('react')
const Calendar = require('./calendar')
const Time = require('./time')
const themer = require('./themer')

var Tabs = {
  DATE: 0,
  TIME: 1,
}

module.exports = React.createClass({
  displayName: 'DatetimePicker',

  getInitialState() {
    return {
      tab: this.props.type === 'time' ? Tabs.TIME : Tabs.DATE,
    }
  },

  render() {
    const theme = themer.getTheme(this.props.theme)

    var tab = this.state.tab
    var m = this.props.moment
    var dateOnly = this.props.type === 'date'
    var timeOnly = this.props.type === 'time'
    var props = blacklist(
      this.props,
      'className',
      'moment',
      'prevMonthIcon',
      'nextMonthIcon',
      'doneIcon',
      'dateIcon',
      'timeIcon',
      'type',
      'onDone'
    )
    props.className = cx('m-datetime-picker', this.props.className)
    return (
      <div {...props} tabIndex="-1">
        {dateOnly || timeOnly
          ? null
          : <div className="options">
              <button
                type="button"
                style={theme.style('button')}
                className={cx('im-btn', { 'is-active': tab === Tabs.DATE })}
                onClick={this.handleClickTab.bind(null, 0)}
              >
                <i className={theme.class('dateIcon')} />Date
              </button>
              <button
                type="button"
                style={theme.style('button')}
                className={cx('im-btn', { 'is-active': tab === Tabs.TIME })}
                onClick={this.handleClickTab.bind(null, 1)}
              >
                <i className={theme.class('timeIcon')} />Time
              </button>
            </div>}

        <div className="tabs">
          <Calendar
            className={cx('tab', { 'is-active': tab === Tabs.DATE })}
            moment={m}
            onChange={this.props.onChange}
            theme={this.props.theme}
          />
          <Time
            className={cx('tab', { 'is-active': tab === Tabs.TIME })}
            moment={m}
            onChange={this.props.onChange}
          />
        </div>

        <button
          type="button"
          className="btn-done im-btn"
          style={theme.style('button')}
          onClick={this.handleDone}
        >
          <i className={theme.class('doneIcon')} />Done
        </button>
      </div>
    )
  },

  handleClickTab(tab, e) {
    this.setState({ tab: tab })
  },

  handleDone(e) {
    if (this.props.onDone) this.props.onDone()
  },
})
