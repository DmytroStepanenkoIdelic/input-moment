import cx from 'classnames'
import injectSheet from 'react-jss'
import React from 'react'
import InputSlider from 'react-input-slider'

const styles = theme => ({
  separater: {
    color: theme.colorPrimary,
  },
  timeText: {
    color: theme.colorPrimary,
  },
  time: {
    backgroundColor: theme.colorPrimary,
  },
  slider: {
    '& .value': {
      backgroundColor: theme.colorPrimary,
    },
    '& .handle:after': {
      border: `3px solid ${theme.colorPrimary}`,
    },
  },
})

const Time = React.createClass({
  displayName: 'Time',

  render() {
    const cs = this.props.classes
    const m = this.props.moment

    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          <span className={`time ${cs.time}`}>
            {m.format('HH')}
          </span>
          <span className={`separater ${cs.separater}`}>:</span>
          <span className={`time ${cs.time}`}>
            {m.format('mm')}
          </span>
        </div>

        <div className="sliders">
          <div className={`time-text ${cs.timeText}`}>Hours:</div>
          <InputSlider
            className={`u-slider-time ${cs.slider}`}
            xmin={0}
            xmax={23}
            x={m.hour()}
            onChange={this.changeHours}
          />
          <div className={`time-text ${cs.timeText}`}>Minutes:</div>
          <InputSlider
            className={`u-slider-time ${cs.slider}`}
            xmin={0}
            xmax={59}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    )
  },

  changeHours(pos) {
    const m = this.props.moment
    m.hours(parseInt(pos.x, 10))
    this.props.onChange(m)
  },

  changeMinutes(pos) {
    const m = this.props.moment
    m.minutes(parseInt(pos.x, 10))
    this.props.onChange(m)
  },
})

export default injectSheet(styles)(Time)
