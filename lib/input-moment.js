'use strict';

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
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      tab: this.props.type === 'time' ? Tabs.TIME : Tabs.DATE
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right'
    };
  },
  render: function render() {
    var tab = this.state.tab;
    var m = this.props.moment;
    var dateOnly = this.props.type === 'date';
    var timeOnly = this.props.type === 'time';
    var props = blacklist(this.props, 'className', 'moment', 'prevMonthIcon', 'nextMonthIcon', 'type');
    props.className = cx('m-input-moment', this.props.className);

    return React.createElement(
      'div',
      props,
      dateOnly || timeOnly ? null : React.createElement(
        'div',
        { className: 'options' },
        React.createElement(
          'button',
          { type: 'button', className: cx('ion-calendar im-btn', { 'is-active': tab === Tabs.DATE }), onClick: this.handleClickTab.bind(null, 0) },
          'Date'
        ),
        React.createElement(
          'button',
          { type: 'button', className: cx('ion-clock im-btn', { 'is-active': tab === Tabs.TIME }), onClick: this.handleClickTab.bind(null, 1) },
          'Time'
        )
      ),
      React.createElement(
        'div',
        { className: 'tabs' },
        React.createElement(Calendar, {
          className: cx('tab', { 'is-active': tab === Tabs.DATE }),
          moment: m,
          onChange: this.props.onChange,
          prevMonthIcon: this.props.prevMonthIcon,
          nextMonthIcon: this.props.nextMonthIcon
        }),
        React.createElement(Time, {
          className: cx('tab', { 'is-active': tab === Tabs.TIME }),
          moment: m,
          onChange: this.props.onChange
        })
      )
    );
  },
  handleClickTab: function handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({ tab: tab });
  }
});