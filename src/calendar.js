import cx from 'classnames'
import injectSheet from 'react-jss'
import blacklist from 'blacklist'
import React from 'react'
import range from 'lodash/range'
import chunk from 'lodash/chunk'
import color from 'color'

const styles = theme => ({
  weekHeader: {
    color: `${theme.colorPrimary} !important`,
  },
  dayCell: {
    '&:hover': {
      background: `${theme.colorPrimary} !important`,
      borderColor: theme.colorPrimary,
    },
    '&.current-day': {
      background: color(theme.colorPrimary).alpha(0.125).string(),
      color: theme.colorPrimary,
    },
    '&.other-day': {
      background: color(theme.colorSecondary).alpha(0.125).string(),
      color: theme.colorSecondary
    },
    '&.range-day': {
      background: color(theme.colorSecondary).alpha(0.0725).string(),
      color: theme.colorSecondary
    },
  },
  toolbar: {
    color: theme.colorPrimary,
  },
  toolbarButton: {
    border: `1px solid ${theme.colorPrimary}`,
    background: theme.colorPrimary,
  },
  currentDate: {
    color: theme.colorPrimary,
  },
})

const Day = React.createClass({
  displayName: 'Day',

  render() {
    const i = this.props.i
    const w = this.props.w
    const prevMonth = w === 0 && i > 7
    const nextMonth = w >= 4 && i <= 14

    const props = blacklist(this.props, 'i', 'w', 'd', 'className')
    props.className = cx(this.props.className, {
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && i === this.props.d
    })

    return (
      <td {...props}>
        {i}
      </td>
    )
  },
})

const Calendar = React.createClass({
  displayName: 'Calendar',

  getDate(i, w) {
    const prevMonth = w === 0 && i > 7
    const nextMonth = w >= 4 && i <= 14
    const addMonth = prevMonth ? -1 : nextMonth ? 1 : 0
    return this.props.moment.clone().add(addMonth, 'month').set('date', i).startOf('day')
  },

  isOther(i, w) {
    const date = this.getDate(i, w)
    const other = this.props.range && this.props.range.other
    if (other) {
      return other.startOf('day').isSame(date)
    }
    return false
  },

  inRange(i, w) {
    const date = this.getDate(i, w)
    const range = this.props.range
    const other = range && range.other
    if (other) {
      if (range.type == 'start') {
        return this.props.moment.startOf('day').isBefore(date) && other.startOf('day').isAfter(date)
      } else if (range.type == 'end') {
        return this.props.moment.startOf('day').isAfter(date) && other.startOf('day').isBefore(date)
      }
    }
    return false;
  },

  render() {
    const cs = this.props.classes
    const m = this.props.moment
    const d = m.date()
    const d1 = m.clone().subtract(1, 'month').endOf('month').date()
    const d2 = m.clone().date(1).day()
    const d3 = m.clone().endOf('month').date()

    const days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    )

    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className={`toolbar ${cs.toolbar}`}>
          <button
            type="button"
            className={`${cs.toolbarButton} prev-year`}
            onClick={this.prevYear}
          >
            <i className={this.props.theme.iconPrevMonth} />
            <i className={this.props.theme.iconPrevMonth} />
          </button>
          <button
            type="button"
            className={`${cs.toolbarButton} prev-month`}
            onClick={this.prevMonth}
          >
            <i className={this.props.theme.iconPrevMonth} />
          </button>
          <span className={cs.currentDate}>
            {m.format('MMMM YYYY')}
          </span>
          <button
            type="button"
            className={`${cs.toolbarButton} next-year`}
            onClick={this.nextYear}
          >
            <i className={this.props.theme.iconNextMonth} />
            <i className={this.props.theme.iconNextMonth} />
          </button>
          <button
            type="button"
            className={`${cs.toolbarButton} next-month`}
            onClick={this.nextMonth}
          >
            <i className={this.props.theme.iconNextMonth} />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) =>
                <td key={i} className={cs.weekHeader}>
                  {w}
                </td>
              )}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) =>
              <tr key={w}>
                {row.map(i =>
                  <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    className={[cs.dayCell, {
                      'other-day': this.isOther(i, w),
                      'range-day': this.inRange(i, w)
                    }]}
                    onClick={this.selectDate.bind(null, i, w)}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  },

  selectDate(i, w) {
    const prevMonth = w === 0 && i > 7
    const nextMonth = w >= 4 && i <= 14
    const m = this.props.moment

    m.date(i)
    if (prevMonth) m.subtract(1, 'month')
    if (nextMonth) m.add(1, 'month')

    this.props.onChange(m)
  },

  prevMonth(e) {
    e.preventDefault()
    this.props.onChange(this.props.moment.subtract(1, 'month'))
  },

  nextMonth(e) {
    e.preventDefault()
    this.props.onChange(this.props.moment.add(1, 'month'))
  },

  prevYear(e) {
    e.preventDefault()
    this.props.onChange(this.props.moment.subtract(1, 'year'))
  },

  nextYear(e) {
    e.preventDefault()
    this.props.onChange(this.props.moment.add(1, 'year'))
  },
})

export default injectSheet(styles)(Calendar)
