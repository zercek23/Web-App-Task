const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

// User Model
const Project = require('../../models/Project');

// @route   GET api/projects
// @desc    Get projects
// @access  Public
router.get('/', async (req, res) => {
    await Project.find()
        .sort({ entryDate: 1 })
        .then(projects => res.json(projects))
})

// @route   GET api/projects
// @desc    Get an project
// @access  Public
router.get('/:name', async (req, res) => {
    await Project.findOne({ title: req.params.name })
        .then(project => {
            if (project) {
                res.json(project);
            } else {
                res.json({ msg: "Project not found" });
            }
        });
})

// @route   POST api/projects
// @desc    Create an project
// @access  Public
router.post('/', async (req, res) => {
    const newProject = new Project({
        title: req.body.title,
        content: req.body.content,
        users: req.body.users
    })

    await newProject.save()
        .then(project => res.json(project))
        .catch(err => res.json(err));
})

// @route   PUT api/projects
// @desc    Update an project
// @access  Public
router.put('/:name', async (req, res) => {
    const filter = { title: req.params.name };
    const update = { title: req.body.title, content: req.body.content, users: req.body.users, updateDate: Date.now() };

    await Project.findOneAndUpdate(filter, update, async (err) => {
        if (err) {
            res.status(400).json({ err });
        } else {
            const updatedProject = await Project.findOne({ title: req.body.title });
            res.status(200).json({ msg: "Project Updated", updatedProject });
        }
    });
})

// @route   DELETE api/projects
// @desc    Delete an project
// @access  Public
router.delete('/:name', async (req, res) => {
    await Project.findOne({ title: req.params.name })
        .then(project => project.remove().then(() => res.json({ msg: "Project Deleted", success: true })))
        .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;