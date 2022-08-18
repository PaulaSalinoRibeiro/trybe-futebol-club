import * as express from 'express';
import MatcherService from '../services/matcherService';
import MatcherController from '../controllers/matcherController';

const matcherService = new MatcherService();
const matcherController = new MatcherController(matcherService);

const matchersRouter = express.Router();

matchersRouter.get(
  '/',
  (req, res, next) => matcherController.getAllMatchers(req, res, next),
);

export default matchersRouter;
