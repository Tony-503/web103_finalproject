import { pool } from '../config/database.js'

// GET /api/events
const getAllEvents = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY event_date ASC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events' })
  }
}

// GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error fetching event details' })
  }
}

// POST /api/events/:id/register
const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const eventCheck = await pool.query('SELECT id FROM events WHERE id = $1', [id])
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const duplicate = await pool.query(
      'SELECT id FROM registrations WHERE event_id = $1 AND email = $2',
      [id, email]
    )
    if (duplicate.rows.length > 0) {
      return res.status(409).json({ error: 'This email is already registered for this event' })
    }

    const result = await pool.query(
      'INSERT INTO registrations (event_id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [id, name, email]
    )

    res.status(201).json({ registration: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: 'Error registering for event' })
  }
}

// GET /api/events/:id/registrations/count
const getRegistrationCount = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT COUNT(*) FROM registrations WHERE event_id = $1',
      [id]
    )
    res.json({ count: parseInt(result.rows[0].count, 10) })
  } catch (err) {
    res.status(500).json({ error: 'Error fetching registration count' })
  }
}

export { getAllEvents, getEventById, registerForEvent, getRegistrationCount }
