var cx = require('classnames')
var blacklist = require('blacklist')
var React = require('react')
var Calendar = require('./calendar')
var Time = require('./time')

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

  getDefaultProps() {
    return {
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right',
      doneIcon: 'ion-checkmark',
      dateIcon: 'ion-calendar',
      timeIcon: 'ion-clock',
    }
  },

  render() {
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
                className={cx('im-btn', { 'is-active': tab === Tabs.DATE })}
                onClick={this.handleClickTab.bind(null, 0)}
              >
                <i className={this.props.dateIcon} />Date
              </button>
              <button
                type="button"
                className={cx('im-btn', { 'is-active': tab === Tabs.TIME })}
                onClick={this.handleClickTab.bind(null, 1)}
              >
                <i className={this.props.timeIcon} />Time
              </button>
            </div>}

        <div className="tabs">
          <Calendar
            className={cx('tab', { 'is-active': tab === Tabs.DATE })}
            moment={m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
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
          onClick={this.handleDone}
        >
          <i className={this.props.doneIcon} />Done
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
