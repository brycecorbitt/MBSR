import DeviceInfo from 'react-native-device-info';
import API from './API';

const device_id = DeviceInfo.getUniqueId()

class LogEvent {

  async logEvent(action, params={}){
		const fields = {device_id: device_id, timestamp: new Date().getTime()}
		Object.assign(fields, params)
    return await API.post(`/event/${action}`, fields)
  }
  async logNavigationEvent(from, to) {
    return await this.logEvent('navigation', {from: from, to: to})
  }
  async logButtonPressEvent(screen, id, px, py, lx, ly, timestamp){
    let params = {screen, button_id: id, pageX: px, pageY: py, locationX: lx, locationY: ly, timestamp: timestamp}
    return await this.logEvent('button_press', params)
  }
}

export default new LogEvent();