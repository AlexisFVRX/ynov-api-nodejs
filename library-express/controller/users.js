const express = require('express'),
      router = express.Router();

const usersService = require('../services/users');

router.get('/', async (req, res) => {
   const users = await usersService.getUsers();
   res.json({success: true, data: users});
});

router.get('/:id', (req, res) => {
   try {
      const userId = parseInt(req.params.id);
      //usersService.getUserById("ab");
      const user = usersService.getUserById(userId);
      if (user) {
         res.json({success: true, data: user});
      } else {
         res.status(404).json({success: false, message: 'User not found for this id'});
      }
   } catch (e) {
      res.status(400).json({success: false, message: 'id parameter must be a valid number'});
   }
});

router.post('/', (req, res) => {
   if (req.body && req.body.id && req.body.firstName && req.body.lastName) {
      try {
         usersService.addUser(req.body.id, req.body.firstName, req.body.lastName);
         res.status(201).json({success: true, message: `User has been added`});
      } catch (e) {
         res.status(400).json({success: false, message: 'User has not been added', error: e.message});
      }
   } else {
      res.status(400).json({success: false, message: 'Cannot add this user, make sure all args has been sent'});
   }
});

router.delete('/:userId', (req, res) => {
   if (req.params.userId) {
      const user = usersService.getUserById(req.params.userId);
      if (user) {
         usersService.deleteUserById(req.params.userId);
         res.json({success: true, message: 'User has been deleted'});
      } else {
         res.status(404).json({success: false, message: `The user with id ${req.params.userId} doesn't exists, it cannot be deleted`});
      }
   } else {
      res.status(400).json({success: false, message: 'The userId is required'});
   }
});

module.exports = router;