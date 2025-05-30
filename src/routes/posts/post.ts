import express from 'express';
import{
    getPost,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    likePost,


} from '../../controllers/post';


const router = express.Router();
router.get('/', getPost);
router.post('/', createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:postId/like', likePost);






export default router;