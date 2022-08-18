import * as express from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/loginController';

const loginRouter = express.Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/login', (req, res, next) => loginController.login(req, res, next));

export default loginRouter;
