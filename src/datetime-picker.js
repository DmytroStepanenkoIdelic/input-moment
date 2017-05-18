var cx = require('classnames');
var blacklist = require('blacklist');
var React = require('react');
var Calendar = require('./calendar');
var Time = require('./time');

var Tabs = {
  DATE: 0,
  TIME: 1
};

module.exports = React.createClass({
  displayName: 'DatetimePicker',

  getInitialState() {
    return {
      tab: this.props.type === 'time' ? Tabs.TIME : Tabs.DATE
    };
  },

  getDefaultProps() {
    return {
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right'
    };
  },

  render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var dateOnly = this.props.type === 'date';
    var timeOnly = this.props.type === 'time';
    var props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'type');
    props.className = cx('m-datetime-picker', this.props.className);

    return (
      <div {...props}>
        {dateOnly || timeOnly ? null : (
          <div className="options">
            <button type="button" className={cx('ion-calendar im-btn', {'is-active': tab === Tabs.DATE})} onClick={this.handleClickTab.bind(null, 0)}>
              Date
            </button>
            <button type="button" className={cx('ion-clock im-btn', {'is-active': tab === Tabs.TIME})} onClick={this.handleClickTab.bind(null, 1)}>
              Time
            </button>
          </div>
        )}

        <div className="tabs">
          <Calendar
            className={cx('tab', {'is-active': tab === Tabs.DATE})}
            moment={m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
          />
          <Time
            className={cx('tab', {'is-active': tab === Tabs.TIME})}
            moment={m}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  },

  handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({tab: tab});
  }
});
