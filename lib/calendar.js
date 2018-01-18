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
      '&.prev-or-next-month': {
        color: theme.colorGray
      },
      '&.range-day': {
        background: (0, _color2.default)(theme.colorSecondary).alpha(0.0725).string(),
        color: theme.colorSecondary
      },
      '&.range-end-day': {
        background: (0, _color2.default)(theme.colorSecondary).alpha(0.125).string(),
        color: theme.colorSecondary
      },
      '&.selected-day': {
        background: (0, _color2.default)(theme.colorPrimary).alpha(0.125).string(),
        color: theme.colorPrimary
      },
      '&.not-range-day': {
        background: (0, _color2.default)(theme.colorError).alpha(0.125).string(),
        color: theme.colorError
      },
      '&:hover': {
        background: theme.colorPrimary,
        borderColor: theme.colorPrimary
      }
    },
    toolbar: {
      color: theme.colorPrimary
    },
    toolbarButton: {
      border: '1px solid ' + theme.colorPrimary,
      background: theme.colorPrimary
    },
    selectedDate: {
      color: theme.colorPrimary
    }
  };
};

var Day = _react2.default.createClass({
  displayName: 'Day',

  render: function render() {
    var _props = this.props,
        date = _props.date,
        selectedDay = _props.selectedDay,
        rangeEndDay = _props.rangeEndDay,
        rangeDay = _props.rangeDay,
        notRangeDay = _props.notRangeDay,
        prevOrNextMonth = _props.prevOrNextMonth;

    var props = (0, _blacklist2.default)(this.props, 'date', 'selectedDay', 'rangeEndDay', 'rangeDay', 'notRangeDay', 'prevOrNextMonth', 'className');

    props.className = (0, _classnames2.default)(this.props.className, {
      'selected-day': selectedDay,
      'range-end-day': rangeEndDay,
      'range-day': rangeDay,
      'not-range-day': selectedDay && notRangeDay,
      'prev-or-next-month': prevOrNextMonth
    });

    return _react2.default.createElement(
      'td',
      props,
      date
    );
  }
});

var Calendar = _react2.default.createClass({
  displayName: 'Calendar',

  getPrevOrNextMonth: function getPrevOrNextMonth(date, week) {
    return {
      prevMonth: week === 0 && date > 7,
      nextMonth: week >= 4 && date <= 14
    };
  },
  isPrevOrNextMonth: function isPrevOrNextMonth(date, week) {
    var _getPrevOrNextMonth = this.getPrevOrNextMonth(date, week),
        prevMonth = _getPrevOrNextMonth.prevMonth,
        nextMonth = _getPrevOrNextMonth.nextMonth;

    return prevMonth || nextMonth;
  },
  getDateTime: function getDateTime(date, week) {
    var _getPrevOrNextMonth2 = this.getPrevOrNextMonth(date, week),
        prevMonth = _getPrevOrNextMonth2.prevMonth,
        nextMonth = _getPrevOrNextMonth2.nextMonth;

    var addMonth = prevMonth ? -1 : nextMonth ? 1 : 0;
    return this.props.moment.clone().add(addMonth, 'month').set('date', date).startOf('day');
  },
  isSelected: function isSelected(selectedDate, date, week) {
    console.log(selectedDate, date, week, this.isPrevOrNextMonth(date, week));
    return !this.isPrevOrNextMonth(date, week) && date === selectedDate;
  },
  isRangeEnd: function isRangeEnd(date, week) {
    var datetime = this.getDateTime(date, week);
    var range = this.props.range;

    return range ? range.end.startOf('day').isSame(datetime) || range.start.startOf('day').isSame(datetime) : false;
  },
  inRange: function inRange(date, week) {
    var datetime = this.getDateTime(date, week);
    var range = this.props.range;

    return range ? range.start.startOf('day').isBefore(datetime) && range.end.startOf('day').isAfter(datetime) : false;
  },
  notInRange: function notInRange(date, week) {
    return this.props.range && !this.inRange(date, week) && !this.isRangeEnd(date, week);
  },
  render: function render() {
    var _this = this;

    var cs = this.props.classes;
    var selected = this.props.moment;
    var selectedDate = selected.date();
    var endPrevMonth = selected.clone().subtract(1, 'month').endOf('month').date();
    var startThisMonth = selected.clone().date(1).day();
    var endThisMonth = selected.clone().endOf('month').date();

    var days = [].concat((0, _range2.default)(endPrevMonth - startThisMonth + 1, endPrevMonth + 1), (0, _range2.default)(1, endThisMonth + 1), (0, _range2.default)(1, 42 - endThisMonth - startThisMonth + 1));

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
          { className: cs.selectedDate },
          selected.format('MMMM YYYY')
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
            weeks.map(function (week) {
              return _react2.default.createElement(
                'td',
                { key: week, className: cs.weekHeader },
                week
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          (0, _chunk2.default)(days, 7).map(function (row, week) {
            return _react2.default.createElement(
              'tr',
              { key: week },
              row.map(function (date, i) {
                return _react2.default.createElement(Day, {
                  key: i,
                  date: date,
                  onClick: _this.selectDate.bind(null, date, week),
                  className: cs.dayCell,
                  selectedDay: _this.isSelected(selectedDate, date, week),
                  rangeEndDay: _this.isRangeEnd(date, week),
                  rangeDay: _this.inRange(date, week),
                  notRangeDay: _this.notInRange(date, week),
                  prevOrNextMonth: _this.isPrevOrNextMonth(date, week)
                });
              })
            );
          })
        )
      )
    );
  },
  selectDate: function selectDate(date, week) {
    var _getPrevOrNextMonth3 = this.getPrevOrNextMonth(date, week),
        prevMonth = _getPrevOrNextMonth3.prevMonth,
        nextMonth = _getPrevOrNextMonth3.nextMonth;

    var selected = this.props.moment;

    selected.date(date);
    if (prevMonth) selected.subtract(1, 'month');
    if (nextMonth) selected.add(1, 'month');

    this.props.onChange(selected);
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