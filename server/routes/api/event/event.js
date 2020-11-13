const router = require('express').Router()
const {
	NavigationEvent, 
	ButtonPressEvent, 
	VideoToggleEvent, 
	VideoSeekEvent, 
	VideoVolumeEvent,
	VideoFullscreenEvent 
} = require('../../../db/models/event')

router.use(function(req, res, next) {
	const {type, device_id, timestamp} = req.body
	const session_id = req.session.id
	const forwarded = req.headers['x-forwarded-for']
	const ip_address = (forwarded ? forwarded.split(', ')[0] : req.connection.remoteAddress).replace('::ffff:', '')
	req.fields = {type, device_id, timestamp, session_id, ip_address}
	next()
})

router.post('/navigation', function(req, res){
	const {to, from} = req.body
	Object.assign(req.fields, {to, from})
	NavigationEvent(req.fields).save().then(() => {
		res.status(201).json({})
	}).catch((err) => {
		console.error(err)
		res.status(500).json({error: err})
	})
})

router.post('/button_press', function(req, res){
	const {screen, button_id, pageX, pageY, locationX, locationY} = req.body
	Object.assign(req.fields, {screen, button_id, pageX, pageY, locationX, locationY})
	ButtonPressEvent(req.fields).save().then(() => {
		res.status(201).json({})
	}).catch((err) => {
		console.error(err)
		res.status(500).json({error: err})
	})
})

router.post('/video_control/*', function(req, res, next){
	const {source, position, duration} = req.body
	Object.assign(req.fields, {source, position, duration})
	next()
})

router.post('/video_control/:type', function(req, res){
	const {type} = req.params
	req.fields.action = req.body.action
	let event
	switch(type){
		case 'play':
		case 'pause':
			req.fields.action = type
			event = VideoToggleEvent(req.fields)
			break
		case 'seek':
			req.fields.position = req.body.position
			event = VideoSeekEvent(req.fields)
			break
		case 'volume':
			req.fields.volume = req.body.volume
			event = VideoVolumeEvent(req.fields)
			break
		case 'maximize':
		case 'minimize':
			req.fields.action = type
			event = VideoFullscreenEvent(req.fields)
			break
		default:
			res.status(400).json({error: 'Unrecognized video event: ' + action})
			return
	}
	event.save().then(() => {
		res.status(201).json({})
	}).catch((error) => {
		res.status(500).json({error})
	})
})

module.exports = router