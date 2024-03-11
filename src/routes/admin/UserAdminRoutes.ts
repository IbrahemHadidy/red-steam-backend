import express from 'express';
import UserAdminController from '../../controllers/admin/UserAdminController';

const { getAllUsers, createUser, getUserProfile, getUserByIdentifier, updateUserByIdentifier, deleteUserByIdentifier } =
  UserAdminController;

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:username', getUserProfile);
router.get('/:identifier', getUserByIdentifier);
router.put('/:identifier', updateUserByIdentifier);
router.delete('/:identifier', deleteUserByIdentifier);

export default router;
