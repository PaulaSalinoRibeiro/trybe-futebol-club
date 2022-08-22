import * as express from 'express';
import LeaderBoardService from '../services/leaderboardService';
import LeaderBoardController from '../controllers/leaderboradController';

const leaderService = new LeaderBoardService();
const leaderController = new LeaderBoardController(leaderService);

const leaderRouter = express.Router();

leaderRouter.get('/home', (req, res, next) => leaderController.getFinishedMatchers(req, res, next));

export default leaderRouter;
