import DeviceInfo from 'react-native-device-info';
import API from './API';

const config = require('../config.json').event_logging


const device_id = DeviceInfo.getUniqueId()

class LogEvent {

  async logEvent(type, params={}){
		const fields = {device_id: device_id, timestamp: new Date().getTime()}
    Object.assign(fields, params)
    if(config.console === true)
      console.log(`[Event] ${type}: ${JSON.stringify(fields)}`)
    try {
      if(config.enabled === true)
        return await API.post(`/event/${type}`, fields)
    } catch(err) {
      console.warn(`[Event] Failed to send: ${err}`)
    }
  }
  async logNavigationEvent(from, to) {
    return await this.logEvent('navigation', {from: from, to: to})
  }
  async logButtonPressEvent(screen, id, px, py, lx, ly, timestamp){
    let params = {screen, button_id: id, pageX: px, pageY: py, locationX: lx, locationY: ly, timestamp: timestamp}
    return await this.logEvent('button_press', params)
  }
  async logVideoEvent(type, source, position, duration, params={}){
    const url_path = 'video_control/' + type
    Object.assign(params, {source, position, duration})
    return await this.logEvent(url_path, params)
  }
}

export default new LogEvent();