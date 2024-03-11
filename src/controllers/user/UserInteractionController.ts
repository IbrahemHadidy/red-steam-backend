import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';

class UserInteractionController {
  // Change tags for a user
  async changeTags(req: Request, res: Response) {
    try {
      const { tags, userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's tags
      user.tags = tags;
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Tags updated successfully', tags: user.tags });
    } catch (error) {
      console.error('Error changing tags:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Add an item to user's library
  async addToLibrary(req: Request, res: Response) {
    try {
      const { itemId, userId, password } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Check if the item is already in the user's library
      if (user.library.includes(itemId)) {
        return res.status(400).json({ message: 'Item already in library' });
      }

      // Add the item to the user's library
      user.library.push(itemId);

      // Remove from cart
      user.cart = user.cart.filter((item) => item !== itemId);

      // Remove from wishlist
      user.wishlist = user.wishlist.filter((item) => item !== itemId);
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Item added to library successfully', library: user.library });
    } catch (error) {
      console.error('Error adding item to library:', error);
    }
  }

  // Add an item to user's cart
  async addToCart(req: Request, res: Response) {
    try {
      const { itemId, userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the item is already in the user's cart
      if (user.cart.includes(itemId)) {
        return res.status(400).json({ message: 'Item already in cart' });
      }

      // Check if the item is already in the user's library
      if (user.library.includes(itemId)) {
        return res.status(400).json({ message: 'Item already owned' });
      }

      // Add the item to the user's cart
      user.cart.push(itemId);
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Item added to cart successfully', cart: user.cart });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  // Remove an item from user's cart
  async removeFromCart(req: Request, res: Response) {
    try {
      const { itemId, userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the item is not in the user's cart
      if (!user.cart.includes(itemId)) {
        return res.status(400).json({ message: 'Item not in cart' });
      }

      // Remove the item from the user's cart
      user.cart = user.cart.filter((item) => item !== itemId);
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Item removed from cart successfully', cart: user.cart });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Add an item to user's wishlist
  async addToWishlist(req: Request, res: Response) {
    try {
      const { itemId, userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the item is already in the user's wishlist
      const existingItemIndex = user.wishlist.findIndex((item) => item.item === itemId);
      if (existingItemIndex !== -1) {
        return res.status(400).json({ message: 'Item already in wishlist' });
      }

      // Check if the item is already in the user's library
      if (user.library.includes(itemId)) {
        return res.status(400).json({ message: 'Item already owned' });
      }

      // Add the item to the user's wishlist
      user.wishlist.push({ item: itemId, addedOn: new Date() });
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Item added to wishlist successfully', wishlist: user.wishlist });
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Remove an item from user's wishlist
  async removeFromWishlist(req: Request, res: Response) {
    try {
      const { itemId, userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the item is not in the user's wishlist
      const existingItemIndex = user.wishlist.findIndex((item) => item.item === itemId);
      if (existingItemIndex === -1) {
        return res.status(400).json({ message: 'Item not in wishlist' });
      }

      // Remove the item from the user's wishlist
      user.wishlist.splice(existingItemIndex, 1);
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Item removed from wishlist successfully', wishlist: user.wishlist });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get cart items for a user
  async getCartItems(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if cart is empty
      if (user.cart.length === 0) {
        return res.status(404).json({ message: 'Cart is empty' });
      }

      // Get cart items
      const cartItems = user.cart;

      // Return cart items
      res.status(200).json({ cartItems });
    } catch (error) {
      console.error('Error getting cart items:', error);
    }
  }

  // Get wishlist items for a user
  async getWishlistItems(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if wishlist is empty
      if (user.wishlist.length === 0) {
        return res.status(404).json({ message: 'Wishlist is empty' });
      }

      // Get wishlist items
      const wishlistItems = user.wishlist;

      // Return wishlist items
      res.status(200).json({ wishlistItems });
    } catch (error) {
      console.error('Error getting wishlist items:', error);
    }
  }
}

export default new UserInteractionController();
