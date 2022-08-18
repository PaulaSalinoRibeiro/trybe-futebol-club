import * as express from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/loginController';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const loginRouter = express.Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));

loginRouter.use(tokenMiddleware);

loginRouter.get(
  '/validate',
  (req, res, next) => LoginController.loginValidate(req, res, next),
);

export default loginRouter;
