const router = require('express').Router()
const {NavigationEvent, ButtonPressEvent} = require('../../../db/models/event')

router.use(function(req, res, next) {
	const {type, device_id, timestamp} = req.body
	const session_id = req.session.id
	req.fields = {type: type, device_id: device_id, timestamp: timestamp, session_id: session_id}
	next()
})

router.post('/navigation', function(req, res){
	const {to, from} = req.body
	Object.assign(req.fields, {to: to, from: from})
	NavigationEvent(req.fields).save().then(() => {
		res.status(201).json({})
	}).catch((err) => {
		console.error(err)
		res.status(500).json({error: err})
	})
})

router.post('/button_press', function(req, res){
	const {screen, button_id, pageX, pageY, locationX, locationY} = req.body
	Object.assign(req.fields, {screen:screen, button_id:button_id, pageX:pageX, pageY:pageY, locationX:locationX, locationY:locationY})
	ButtonPressEvent(req.fields).save().then(() => {
		res.status(201).json({})
	}).catch((err) => {
		console.error(err)
		res.status(500).json({error: err})
	})
})

module.exports = router