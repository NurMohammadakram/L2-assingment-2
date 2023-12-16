import { Router } from 'express';
import { userControllers } from './user.controller';

const router = Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getUserById);
router.put('/:userId', userControllers.updateUser);

export { router as userRouter };
