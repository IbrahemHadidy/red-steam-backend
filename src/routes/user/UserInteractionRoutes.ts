import express from 'express';
import { sanitize } from '../../middlewares/validators';
import UserInteractionController from '../../controllers/user/UserInteractionController';

const {
  changeTags,
  addToLibrary,
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  getCartItems,
  getWishlistItems,
} = UserInteractionController;

const router = express.Router();

router.post('/change-tags', sanitize, changeTags);
router.post('/add-to-library', sanitize, addToLibrary);
router.post('/add-to-cart', sanitize, addToCart);
router.post('/add-to-wishlist', sanitize, addToWishlist);
router.delete('/remove-from-cart', sanitize, removeFromCart);
router.delete('/remove-from-wishlist', sanitize, removeFromWishlist);
router.get('/get-cart-items', sanitize, getCartItems);
router.get('/get-wishlist-items', sanitize, getWishlistItems);

export default router;
