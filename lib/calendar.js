'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _chunk = require('lodash/chunk');

var _chunk2 = _interopRequireDefault(_chunk);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    weekHeader: {
      color: theme.colorPrimary + ' !important'
    },
    dayCell: {
      '&:hover': {
        background: theme.colorPrimary + ' !important',
        borderColor: theme.colorPrimary
      },
      '&.current-day': {
        background: (0, _color2.default)(theme.colorPrimary).alpha(0.125).string(),
        color: theme.colorPrimary
      },
      '&.other-day': {
        background: (0, _color2.default)(theme.colorSecondary).alpha(0.125).string(),
        color: theme.colorSecondary
      },
      '&.range-day': {
        background: (0, _color2.default)(theme.colorSecondary).alpha(0.0725).string(),
        color: theme.colorSecondary
      }
    },
    toolbar: {
      color: theme.colorPrimary
    },
    toolbarButton: {
      border: '1px solid ' + theme.colorPrimary,
      background: theme.colorPrimary
    },
    currentDate: {
      color: theme.colorPrimary
    }
  };
};

var Day = _react2.default.createClass({
  displayName: 'Day',

  render: function render() {
    var i = this.props.i;
    var w = this.props.w;
    var prevMonth = w === 0 && i > 7;
    var nextMonth = w >= 4 && i <= 14;

    var props = (0, _blacklist2.default)(this.props, 'i', 'w', 'd', 'className');
    props.className = (0, _classnames2.default)(this.props.className, {
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && i === this.props.d
    });

    return _react2.default.createElement(
      'td',
      props,
      i
    );
  }
});

var Calendar = _react2.default.createClass({
  displayName: 'Calendar',

  getDate: function getDate(i, w) {
    var prevMonth = w === 0 && i > 7;
    var nextMonth = w >= 4 && i <= 14;
    var addMonth = prevMonth ? -1 : nextMonth ? 1 : 0;
    return this.props.moment.clone().add(addMonth, 'month').set('date', i).startOf('day');
  },
  isOther: function isOther(i, w) {
    var date = this.getDate(i, w);
    var other = this.props.range && this.props.range.other;
    if (other) {
      return other.startOf('day').isSame(date);
    }
    return false;
  },
  inRange: function inRange(i, w) {
    var date = this.getDate(i, w);
    var range = this.props.range;
    var other = range && range.other;
    if (other) {
      if (range.type == 'start') {
        return this.props.moment.startOf('day').isBefore(date) && other.startOf('day').isAfter(date);
      } else if (range.type == 'end') {
        return this.props.moment.startOf('day').isAfter(date) && other.startOf('day').isBefore(date);
      }
    }
    return false;
  },
  render: function render() {
    var _this = this;

    var cs = this.props.classes;
    var m = this.props.moment;
    var d = m.date();
    var d1 = m.clone().subtract(1, 'month').endOf('month').date();
    var d2 = m.clone().date(1).day();
    var d3 = m.clone().endOf('month').date();

    var days = [].concat((0, _range2.default)(d1 - d2 + 1, d1 + 1), (0, _range2.default)(1, d3 + 1), (0, _range2.default)(1, 42 - d3 - d2 + 1));

    var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('m-calendar', this.props.className) },
      _react2.default.createElement(
        'div',
        { className: 'toolbar ' + cs.toolbar },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: cs.toolbarButton + ' prev-year',
            onClick: this.prevYear
          },
          _react2.default.createElement('i', { className: this.props.theme.iconPrevMonth }),
          _react2.default.createElement('i', { className: this.props.theme.iconPrevMonth })
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: cs.toolbarButton + ' prev-month',
            onClick: this.prevMonth
          },
          _react2.default.createElement('i', { className: this.props.theme.iconPrevMonth })
        ),
        _react2.default.createElement(
          'span',
          { className: cs.currentDate },
          m.format('MMMM YYYY')
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: cs.toolbarButton + ' next-year',
            onClick: this.nextYear
          },
          _react2.default.createElement('i', { className: this.props.theme.iconNextMonth }),
          _react2.default.createElement('i', { className: this.props.theme.iconNextMonth })
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: cs.toolbarButton + ' next-month',
            onClick: this.nextMonth
          },
          _react2.default.createElement('i', { className: this.props.theme.iconNextMonth })
        )
      ),
      _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            weeks.map(function (w, i) {
              return _react2.default.createElement(
                'td',
                { key: i, className: cs.weekHeader },
                w
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          (0, _chunk2.default)(days, 7).map(function (row, w) {
            return _react2.default.createElement(
              'tr',
              { key: w },
              row.map(function (i) {
                return _react2.default.createElement(Day, {
                  key: i,
                  i: i,
                  d: d,
                  w: w,
                  className: [cs.dayCell, {
                    'other-day': _this.isOther(i, w),
                    'range-day': _this.inRange(i, w)
                  }],
                  onClick: _this.selectDate.bind(null, i, w)
                });
              })
            );
          })
        )
      )
    );
  },
  selectDate: function selectDate(i, w) {
    var prevMonth = w === 0 && i > 7;
    var nextMonth = w >= 4 && i <= 14;
    var m = this.props.moment;

    m.date(i);
    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');

    this.props.onChange(m);
  },
  prevMonth: function prevMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  },
  nextMonth: function nextMonth(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  },
  prevYear: function prevYear(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'year'));
  },
  nextYear: function nextYear(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'year'));
  }
});

exports.default = (0, _reactJss2.default)(styles)(Calendar);
module.exports = exports['default'];