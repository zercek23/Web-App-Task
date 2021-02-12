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
        user: req.body.user
    })

    if (!newProject.title)
        return res.status(400).json({ msg: "Please include a title" })

    if (!newProject.content)
        return res.status(400).json({ msg: "Please include a content" })

    if (!newProject.user)
        return res.status(400).json({ msg: "Please select a user" })

    await newProject.save()
        .then(project => res.json(project))
        .catch(err => res.json(err));
})

// @route   PUT api/projects
// @desc    Update an project
// @access  Public
router.put('/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    const update = { title: req.body.title, content: req.body.content, user: req.body.user, updateDate: Date.now() };

    if (update.title == null) {
        res.status(400).json({ msg: "Project title can't be empty" });
    } else if (update.content == null) {
        res.status(400).json({ msg: "Project content can't be empty" });
    } else if (update.user == null) {
        res.status(400).json({ msg: "User must selected" });
    } else {
        await Project.findOneAndUpdate(filter, update, async (err) => {
            if (err) {
                res.status(400).json({ err });
            } else {
                const updatedProject = await Project.findOne({ title: req.body.title });
                res.status(200).json({ msg: "Project Updated", updatedProject });
            }
        });
    }
})

// @route   DELETE api/projects
// @desc    Delete an project
// @access  Public
router.delete('/:id', async (req, res) => {
    await Project.findOne({ _id: req.params.id })
        .then(project => project.remove().then(() => res.json({ msg: "Project Deleted", success: true })))
        .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;