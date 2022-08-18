import { Router } from 'express';
import loginRouter from './login';

const router = Router();

router.use(loginRouter);

export default router;
