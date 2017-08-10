'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactJss.jss.use((0, _jssNested2.default)());

var Tabs = {
  DATE: 0,
  TIME: 1
};

var styles = function styles(theme) {
  return {
    optionsButton: {
      color: theme.colorPrimary,
      border: '1px solid ' + theme.colorPrimary,
      '&.is-active': {
        background: theme.colorPrimary
      }
    },
    doneButton: {
      background: theme.colorPrimary
    }
  };
};

var DatetimePicker = _react2.default.createClass({
  displayName: 'DatetimePicker',

  getInitialState: function getInitialState() {
    return {
      tab: this.props.type === 'time' ? Tabs.TIME : Tabs.DATE
    };
  },
  render: function render() {
    var tab = this.state.tab;
    var cs = this.props.classes;
    var m = this.props.moment;
    var dateOnly = this.props.type === 'date';
    var timeOnly = this.props.type === 'time';
    var props = (0, _blacklist2.default)(this.props, 'className', 'moment', 'type', 'onDone', 'classes', 'sheet', 'theme');
    props.className = (0, _classnames2.default)('m-datetime-picker', this.props.className);

    return _react2.default.createElement(
      'div',
      _extends({}, props, { tabIndex: '-1' }),
      dateOnly || timeOnly ? null : _react2.default.createElement(
        'div',
        { className: 'options' },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames2.default)('im-btn', cs.optionsButton, {
              'is-active': tab === Tabs.DATE
            }),
            onClick: this.handleClickTab.bind(null, 0)
          },
          _react2.default.createElement('i', { className: this.props.theme.iconDate }),
          'Date'
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames2.default)('im-btn', cs.optionsButton, {
              'is-active': tab === Tabs.TIME
            }),
            onClick: this.handleClickTab.bind(null, 1)
          },
          _react2.default.createElement('i', { className: this.props.theme.iconTime }),
          'Time'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'tabs' },
        _react2.default.createElement(_calendar2.default, {
          className: (0, _classnames2.default)('tab', { 'is-active': tab === Tabs.DATE }),
          moment: m,
          onChange: this.props.onChange,
          theme: this.props.theme
        }),
        _react2.default.createElement(_time2.default, {
          className: (0, _classnames2.default)('tab', { 'is-active': tab === Tabs.TIME }),
          moment: m,
          onChange: this.props.onChange
        })
      ),
      _react2.default.createElement(
        'button',
        {
          type: 'button',
          className: 'btn-done im-btn ' + cs.doneButton,
          onClick: this.handleDone
        },
        _react2.default.createElement('i', { className: this.props.theme.iconDone }),
        'Done'
      )
    );
  },
  handleClickTab: function handleClickTab(tab, e) {
    this.setState({ tab: tab });
  },
  handleDone: function handleDone(e) {
    if (this.props.onDone) this.props.onDone();
  }
});

var StyledDatetimePicker = (0, _reactJss2.default)(styles)(DatetimePicker);

exports.default = function (props) {
  return _react2.default.createElement(
    _reactJss.ThemeProvider,
    { theme: _extends({}, _theme2.default, props.theme) },
    _react2.default.createElement(StyledDatetimePicker, props)
  );
};

module.exports = exports['default'];