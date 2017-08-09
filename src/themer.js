const defaultIcons = {
  prevMonthIcon: 'ion-ios-arrow-left',
  nextMonthIcon: 'ion-ios-arrow-right',
  doneIcon: 'ion-checkmark',
  dateIcon: 'ion-calendar',
  timeIcon: 'ion-clock',
}

getIcon(name) {
    return this.props.theme[name] || defaultIcons[name]
  },

  getStyle(name) {
    const prop = this.props.theme[name]
    switch (name) {
      case primaryColor:
        return { color: prop || '#1385e5' }
    }
    return ''
  },
