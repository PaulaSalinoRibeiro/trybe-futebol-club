import { Router } from 'express';
import loginRouter from './login';
import teamsRouter from './teams';

const router = Router();

router.use(teamsRouter);
router.use(loginRouter);

export default router;
