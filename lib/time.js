'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInputSlider = require('react-input-slider');

var _reactInputSlider2 = _interopRequireDefault(_reactInputSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    separater: {
      color: theme.colorPrimary
    },
    timeText: {
      color: theme.colorPrimary
    },
    time: {
      backgroundColor: theme.colorPrimary
    },
    slider: {
      '& .value': {
        backgroundColor: theme.colorPrimary
      },
      '& .handle:after': {
        border: '3px solid ' + theme.colorPrimary
      }
    }
  };
};

var Time = _react2.default.createClass({
  displayName: 'Time',

  render: function render() {
    var cs = this.props.classes;
    var m = this.props.moment;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('m-time', this.props.className) },
      _react2.default.createElement(
        'div',
        { className: 'showtime' },
        _react2.default.createElement(
          'span',
          { className: 'time ' + cs.time },
          m.format('HH')
        ),
        _react2.default.createElement(
          'span',
          { className: 'separater ' + cs.separater },
          ':'
        ),
        _react2.default.createElement(
          'span',
          { className: 'time ' + cs.time },
          m.format('mm')
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'sliders' },
        _react2.default.createElement(
          'div',
          { className: 'time-text ' + cs.timeText },
          'Hours:'
        ),
        _react2.default.createElement(_reactInputSlider2.default, {
          className: 'u-slider-time ' + cs.slider,
          xmin: 0,
          xmax: 23,
          x: m.hour(),
          onChange: this.changeHours
        }),
        _react2.default.createElement(
          'div',
          { className: 'time-text ' + cs.timeText },
          'Minutes:'
        ),
        _react2.default.createElement(_reactInputSlider2.default, {
          className: 'u-slider-time ' + cs.slider,
          xmin: 0,
          xmax: 59,
          x: m.minute(),
          onChange: this.changeMinutes
        })
      )
    );
  },
  changeHours: function changeHours(pos) {
    var m = this.props.moment;
    m.hours(parseInt(pos.x, 10));
    this.props.onChange(m);
  },
  changeMinutes: function changeMinutes(pos) {
    var m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
});

exports.default = (0, _reactJss2.default)(styles)(Time);
module.exports = exports['default'];