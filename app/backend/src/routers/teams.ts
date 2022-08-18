import * as express from 'express';
import TeamService from '../services/teamService';
import TeamController from '../controllers/teamController';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const teamsRouter = express.Router();

teamsRouter.get('/:id', (req, res, next) => teamController.findById(req, res, next));

teamsRouter.get('/', (req, res, next) => teamController.listAll(req, res, next));

export default teamsRouter;
