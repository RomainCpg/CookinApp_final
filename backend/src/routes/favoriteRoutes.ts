import express from 'express';
import { addFavorite, getFavoritesByUser, removeFavorite } from '../controllers/favoriteController';

const router = express.Router();

router.post('/favorites', addFavorite);
router.get('/users/:userId/favorites', getFavoritesByUser);
router.delete('/favorites/:id', removeFavorite);

export default router;
