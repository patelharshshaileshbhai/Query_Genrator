import express from 'express';
import { createQuery, getAllQueries, updateQuery} from '../controller/queryController.js';
import { auth, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/queries', auth, createQuery);
router.get('/queries', auth, admin, getAllQueries);
router.put('/queries/:id', auth, admin, updateQuery);

export default router;
