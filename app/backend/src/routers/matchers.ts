import * as express from 'express';
import MatcherService from '../services/matcherService';
import MatcherController from '../controllers/matcherController';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const matcherService = new MatcherService();
const matcherController = new MatcherController(matcherService);

const matchersRouter = express.Router();

matchersRouter.patch(
  '/:id/finish',
  tokenMiddleware,
  (req, res, next) => matcherController.updateProgress(req, res, next),
);

matchersRouter.post(
  '/',
  tokenMiddleware,
  (req, res, next) => matcherController.create(req, res, next),
);

matchersRouter.get(
  '/',
  (req, res, next) => matcherController.getAllMatchers(req, res, next),
);

export default matchersRouter;
