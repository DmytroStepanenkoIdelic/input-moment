import cx from 'classnames'
import jssNested from 'jss-nested'
import injectSheet, { JssProvider, ThemeProvider, jss } from 'react-jss'
import blacklist from 'blacklist'
import React from 'react'
import Calendar from './calendar'
import Time from './time'
import defaultTheme from './theme'

jss.use(jssNested())

const Tabs = {
  DATE: 0,
  TIME: 1,
}

const styles = theme => ({
  optionsButton: {
    color: theme.colorPrimary,
    border: `1px solid ${theme.colorPrimary}`,
    '&.is-active': {
      background: theme.colorPrimary,
    },
  },
  doneButton: {
    background: theme.colorPrimary,
  },
})

const DatetimePicker = React.createClass({
  displayName: 'DatetimePicker',

  getInitialState() {
    return {
      tab: this.props.type === 'time' ? Tabs.TIME : Tabs.DATE,
    }
  },

  render() {
    const tab = this.state.tab
    const cs = this.props.classes
    const selected = this.props.moment
    const range = this.props.range
    if (range) {
      range.start = range.start || selected
      range.end = range.end || selected
    }

    const dateOnly = this.props.type === 'date'
    const timeOnly = this.props.type === 'time'
    const props = blacklist(
      this.props,
      'className',
      'moment',
      'range',
      'type',
      'onDone',
      'classes',
      'sheet',
      'theme'
    )
    props.className = cx('m-datetime-picker', this.props.className)

    return (
      <div {...props} tabIndex="-1">
        {dateOnly || timeOnly
          ? null
          : <div className="options">
              <button
                type="button"
                className={cx('im-btn', cs.optionsButton, {
                  'is-active': tab === Tabs.DATE,
                })}
                onClick={this.handleClickTab.bind(null, 0)}
              >
                <i className={this.props.theme.iconDate} />Date
              </button>
              <button
                type="button"
                className={cx('im-btn', cs.optionsButton, {
                  'is-active': tab === Tabs.TIME,
                })}
                onClick={this.handleClickTab.bind(null, 1)}
              >
                <i className={this.props.theme.iconTime} />Time
              </button>
            </div>}

        <div className="tabs">
          <Calendar
            className={cx('tab', { 'is-active': tab === Tabs.DATE })}
            moment={selected}
            range={range}
            onChange={this.props.onChange}
            theme={this.props.theme}
          />
          <Time
            className={cx('tab', { 'is-active': tab === Tabs.TIME })}
            moment={selected}
            onChange={this.props.onChange}
          />
        </div>

        <button
          type="button"
          className={`btn-done im-btn ${cs.doneButton}`}
          onClick={this.handleDone}
        >
          <i className={this.props.theme.iconDone} />Done
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

const StyledDatetimePicker = injectSheet(styles)(DatetimePicker)

export default props => {
  return (
    <ThemeProvider theme={{ ...defaultTheme, ...props.theme }}>
      <StyledDatetimePicker {...props} />
    </ThemeProvider>
  )
}
