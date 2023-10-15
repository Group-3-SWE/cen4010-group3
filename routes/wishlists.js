import { Router } from 'express';
import * as WishlistController from '../controllers/WishlistController.js'

const router = new Router();

router.get('/', WishlistController.getWishlists);
router.post('/', WishlistController.create);
router.post('/add', WishlistController.addBook);
router.get('/content', WishlistController.listBooks);

export default router;