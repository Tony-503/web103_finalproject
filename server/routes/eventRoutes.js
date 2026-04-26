import express from 'express'
import * as eventsController from '../controllers/eventsControllers.js'
const router = express.Router()

router.get('/', eventsController.getAllEvents)
router.get('/:id', eventsController.getEventById)
router.post('/:id/register', eventsController.registerForEvent)
router.get('/:id/registrations/count', eventsController.getRegistrationCount)

export default router
