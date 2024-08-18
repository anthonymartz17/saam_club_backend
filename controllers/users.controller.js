const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../queries/users.queries');


//GET ALL
router.get('/', async (req, res) => {
  const users = await getUsers();
  if (users) {
    return res.status(404).json({ message: 'Users not found' });
  } else {
    res.json(users);
  }
});
 
//GET SINGLE USER BY ID
router.get('/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  if (user) {
    return res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});

//CREATE
router.post('/', async (req, res) => {
  const user = await createUser(req.body);
  if (user) {
    return res.status(400).json({ message: 'Invalid user data' });
  } else {
    res.json(user);
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  if (user) {
    return res.status(400).json({ message: 'Invalid user data' });
  } else {
    res.json(user);
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  const user = await deleteUser(req.params.id);
  if (user) {
    return res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});

module.exports = router;
