const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get users
// @access  Public
router.get('/', async (req, res) => {
    await User.find()
        .sort({ entryDate: 1 })
        .then(users => res.json(users))
})

// @route   GET api/users
// @desc    Get an user
// @access  Public
router.get('/:id', async (req, res) => {
    await User.findOne({ _id: req.params.id })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.json({ msg: "User not found" })
            }
        });
})

// @route   POST api/users
// @desc    Create an user
// @access  Public
router.post('/', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email        
    })

    if (!newUser.name)
        return res.status(400).json({ msg: "Please include a name" })

    if (!newUser.email)
        return res.status(400).json({ msg: "Please include a email" })

    if (!newUser.lastName)
        return res.status(400).json({ msg: "Please include a last name" })

    await newUser.save()
        .then(user => res.json(user))
        .catch(err => res.json(err));
})

// @route   PUT api/users
// @desc    Update an user
// @access  Public
router.put('/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    const update = { name: req.body.name, lastName: req.body.lastName , email: req.body.email, updateDate: Date.now() };

    await User.findOneAndUpdate(filter, update, async (err) => {
        if (err) {
            res.status(400).json({ err });
        } else {
            const updatedUser = await User.findOne({ name: req.body.name });
            res.status(200).json({ msg: "User Updated", updatedUser });
        }
    });
})

// @route   DELETE api/users
// @desc    Delete an user
// @access  Public
router.delete('/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => user.remove().then(() => res.json({ msg: "User Deleted", success: true })))
        .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;