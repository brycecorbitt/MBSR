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
	timestamp: {
		type: Date,
		required: true,
		index: true
	}
}, {timestamps: { createdAt: true, updatedAt: false }})

const Event = mongoose.model('Event', eventSchema)

const navigationEventSchema = new mongoose.Schema({
	type: {
		type: String,
		default: 'navigation'
	},
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
	type: {
		type: String,
		default: 'button_press'
	},
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

const NavigationEvent = Event.discriminator('NavigationEvent', navigationEventSchema)
const ButtonPressEvent = Event.discriminator('ButtonPressEvent', buttonPressEventSchema)

module.exports = {NavigationEvent: NavigationEvent, ButtonPressEvent: ButtonPressEvent}