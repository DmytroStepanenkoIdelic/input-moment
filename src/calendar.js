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
    '&.prev-or-next-month': {
      color: theme.colorGray
    },
    '&.range-day': {
      background: color(theme.colorSecondary).alpha(0.0725).string(),
      color: theme.colorSecondary
    },
    '&.range-end-day': {
      background: color(theme.colorSecondary).alpha(0.125).string(),
      color: theme.colorSecondary
    },
    '&.selected-day': {
      background: color(theme.colorPrimary).alpha(0.125).string(),
      color: theme.colorPrimary,
    },
    '&.not-range-day': {
      background: color(theme.colorError).alpha(0.125).string(),
      color: theme.colorError
    },
    '&:hover': {
      background: theme.colorPrimary,
      borderColor: theme.colorPrimary,
    },
  },
  toolbar: {
    color: theme.colorPrimary,
  },
  toolbarButton: {
    border: `1px solid ${theme.colorPrimary}`,
    background: theme.colorPrimary,
  },
  selectedDate: {
    color: theme.colorPrimary,
  },
})

class Day extends React.Component {
  displayName = 'Day';

  render() {
    const {date, selectedDay, rangeEndDay, rangeDay, notRangeDay, prevOrNextMonth, onClick} = this.props
    const props = blacklist(this.props, 'date', 'selectedDay', 'rangeEndDay', 'rangeDay', 'notRangeDay', 'prevOrNextMonth', 'className', 'onClick')

    props.className = cx(this.props.className, {
      'selected-day': selectedDay,
      'range-end-day': rangeEndDay,
      'range-day': rangeDay,
      'not-range-day': selectedDay && notRangeDay,
      'prev-or-next-month': prevOrNextMonth
    })

    return (
      <td {...props} onClick={notRangeDay ? undefined : onClick}>
        {date}
      </td>
    )
  }
}

class Calendar extends React.Component {
  displayName = 'Calendar';

  getPrevOrNextMonth(date, week) {
    return {
      prevMonth: week === 0 && date > 7,
      nextMonth: week >= 4 && date <= 14
    }
  }

  isPrevOrNextMonth = (date, week) => {
    const {prevMonth, nextMonth} = this.getPrevOrNextMonth(date, week)
    return prevMonth || nextMonth
  }

  getDateTime = (date, week) => {
    const {prevMonth, nextMonth} = this.getPrevOrNextMonth(date, week)
    const addMonth = prevMonth ? -1 : nextMonth ? 1 : 0
    return this.props.moment.clone().add(addMonth, 'month').set('date', date).startOf('day')
  }

  isSelected = (selectedDate, date, week) => {
    return !this.isPrevOrNextMonth(date, week) && date === selectedDate
  }

  isRangeEnd = (date, week) => {
    const datetime = this.getDateTime(date, week)
    const {range} = this.props
    return range && (
      range.end.startOf('day').isSame(datetime) ||
      range.start.startOf('day').isSame(datetime)
    );
  }

  inRange = (date, week) => {
    const datetime = this.getDateTime(date, week)
    const {range} = this.props
    return range &&
      range.start.startOf('day').isBefore(datetime) &&
      range.end.startOf('day').isAfter(datetime);
  }

  notInRange = (date, week) => {
    return this.props.range && !this.inRange(date, week) && !this.isRangeEnd(date, week);
  }

  render() {
    const cs = this.props.classes
    const selected = this.props.moment
    const selectedDate = selected.date()
    const endPrevMonth = selected.clone().subtract(1, 'month').endOf('month').date()
    const startThisMonth = selected.clone().date(1).day()
    const endThisMonth = selected.clone().endOf('month').date()

    const days = [].concat(
      range(endPrevMonth - startThisMonth + 1, endPrevMonth + 1),
      range(1, endThisMonth + 1),
      range(1, 42 - endThisMonth - startThisMonth + 1)
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
          <span className={cs.selectedDate}>
            {selected.format('MMMM YYYY')}
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
              {weeks.map(week =>
                <td key={week} className={cs.weekHeader}>
                  {week}
                </td>
              )}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, week) =>
              <tr key={week}>
                {row.map(date =>
                  <Day
                    key={`${week}_${date}`}
                    date={date}
                    onClick={this.selectDate.bind(null, date, week)}
                    className={cs.dayCell}
                    selectedDay={this.isSelected(selectedDate, date, week)}
                    rangeEndDay={this.isRangeEnd(date, week)}
                    rangeDay={this.inRange(date, week)}
                    notRangeDay={this.notInRange(date, week)}
                    prevOrNextMonth={this.isPrevOrNextMonth(date, week)}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  selectDate = (date, week) => {
    const {prevMonth, nextMonth} = this.getPrevOrNextMonth(date, week)
    const selected = this.props.moment

    selected.date(date)
    if (prevMonth) selected.subtract(1, 'month')
    if (nextMonth) selected.add(1, 'month')

    this.props.onChange(selected)
  }

  prevMonth = (e) => {
    e.preventDefault()
    this.props.onChange(this.props.moment.subtract(1, 'month'))
  }

  nextMonth = (e) => {
    e.preventDefault()
    this.props.onChange(this.props.moment.add(1, 'month'))
  }

  prevYear = (e) => {
    e.preventDefault()
    this.props.onChange(this.props.moment.subtract(1, 'year'))
  }

  nextYear = (e) => {
    e.preventDefault()
    this.props.onChange(this.props.moment.add(1, 'year'))
  }
}

export default injectSheet(styles)(Calendar)
