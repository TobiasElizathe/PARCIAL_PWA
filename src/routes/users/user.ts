import express from 'express';
import{
    getUsers,
    createUser,
    getUserById,
    updateUser,
    desactivateUser,
    activateUser,
} from '../../controllers/user';


const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.patch('/:id/desactivate', desactivateUser);
router.patch('/:id/activate', activateUser);

export default router;