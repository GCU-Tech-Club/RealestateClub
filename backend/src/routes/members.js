const express = require('express')
const router = express.Router()
const Member = require('../models/member')

//adding member to database
router.post('/', async (req, res) => {
    const member = new Member({
        name: req.body.name,
        email: req.body.email,
        gradYear: req.body.gradYear
    })

    try {
        const newMember = await member.save()
        res.status(201).json(newMember)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

module.exports = router