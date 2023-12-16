import { Router } from 'express';
import { userControllers } from './user.controller';

const router = Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getUserById);
router.put('/:userId', userControllers.updateUser);
router.delete('/:userId', userControllers.deleteUser);
router.put('/:userId/orders', userControllers.addOrders);
export { router as userRouter };
