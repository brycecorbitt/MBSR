import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if(__DEV__){
	const disabled_warnings = ['Setting a timer', 'Warning: componentWillReceiveProps']
	const {warn} = console
	// Hack to keep ignored warnings from printing to console
	console.warn = (...args) => {
		if(typeof args[0] === 'string' && disabled_warnings.some((prefix) => args[0].startsWith(prefix)))
			return
		warn(...args)
	}
	//YellowBox overrides console.warn, so ignoreWarnings must be called after for the hack to work
	YellowBox.ignoreWarnings(disabled_warnings);
}

AppRegistry.registerComponent(appName, () => App);