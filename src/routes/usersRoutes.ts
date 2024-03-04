import express from 'express';
import userControllers from '../controllers/usersController';

const { getAllUsers, createUser, getUserProfile, getUserByIdentifier, updateUserByIdentifier, deleteUserByIdentifier } =
  userControllers;

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:username', getUserProfile);
router.get('/:identifier', getUserByIdentifier);
router.put('/:identifier', updateUserByIdentifier);
router.delete('/:identifier', deleteUserByIdentifier);

export default router;
