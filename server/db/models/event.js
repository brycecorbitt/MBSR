let mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		index: true
	},
	session_id: {
		type: String,
		index: true
	},
	device_id: {
		type: String,
		index: true
	},
	ip_address: {
		type: String,
		index: true
	},
	timestamp: {
		type: Date,
		required: true,
		index: true
	}
}, {
	timestamps: false,
	discriminatorKey: 'type'
})

const Event = mongoose.model('Event', eventSchema)

const navigationEventSchema = new mongoose.Schema({
	to: {
		type: String,
		required: true
	},
	from: {
		type: String,
		default: null
	}
})

const buttonPressEventSchema = new mongoose.Schema({
	screen: {
		type: String,
		required: true,
		index: true
	},
	button_id: {
		type: String,
		required: false,
		index: true
	},
	pageX: {
		type: Number,
		required: true
	},
	pageY: {
		type: Number,
		required: true
	},
	locationX: {
		type: Number,
		required: true
	},
	locationY: {
		type: Number,
		required: true
	}
})

const source = {type: String, required: true}
const position = {type: Number, required: true}
const duration = {type: Number, required: true}

const videoToggleEventSchema = new mongoose.Schema({
	action: {
		type: String,
		enum: ['play', 'pause'],
	},
	source,
	position,
	duration
})

const videoVolumeEventSchema = new mongoose.Schema({
	action: {
		type: String,
		enum: ['start', 'release']
	},
	source,
	position,
	duration,
	volume: {
		type: Number,
		required: true
	}
})

const videoSeekEventSchema = new mongoose.Schema({
	action: {
		type: String,
		enum: ['start', 'release']
	},
	source,
	position,
	duration
})

const videoFullscreenEventSchema = new mongoose.Schema({
	action: {
		type: String,
		enum: ['maximize', 'minimize']
	},
	source,
	position,
	duration
})

const NavigationEvent = Event.discriminator('Navigation', navigationEventSchema)
const ButtonPressEvent = Event.discriminator('ButtonPress', buttonPressEventSchema)
const VideoToggleEvent = Event.discriminator('VideoToggle', videoToggleEventSchema)
const VideoSeekEvent = Event.discriminator('VideoSeek', videoSeekEventSchema)
const VideoVolumeEvent = Event.discriminator('VideoVolume', videoVolumeEventSchema)
const VideoFullscreenEvent = Event.discriminator('VideoFullscreen', videoFullscreenEventSchema)

module.exports = {NavigationEvent, ButtonPressEvent, VideoToggleEvent, VideoSeekEvent, VideoVolumeEvent, VideoFullscreenEvent}