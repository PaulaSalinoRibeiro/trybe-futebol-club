import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/team';
import Matches from '../database/models/matches';
import HandleError from '../utils/handleError';
import JWT from '../utils/jwt';
import MatcherService from '../services/matcherService';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

import IMatchers, { MatchersCreate } from '../interfaces/IMatchers';

chai.use(chaiHttp);

const { expect } = chai;

const mockListMatchers: IMatchers[] = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 3,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
        "teamName": "São Paulo"
    },
    "teamAway": {
        "teamName": "Grêmio"
    }
  }
];

const mockNewMatchers: MatchersCreate = {
  id: 49,
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
};

describe('Teste Matchers', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve retornar uma lista com todos os matchers e status 200', async () => {
    sinon.stub(Matches, 'findAll').resolves(mockListMatchers as unknown as Matches[]);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
  });

  it('Não deve ser possivel um time jogar contra ele próprio', async () => {
    sinon.stub(JWT, 'checkToken').returns({});
    sinon.stub(MatcherService.prototype, 'create').callsFake(() => {
      throw new HandleError(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    });
        
    const response = await chai.request(app)
    .post('/matches')
    .send({
      homeTeam: 8,
      awayTeam: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2
    })
    .set({ authorization: 'token'});

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal(
      'It is not possible to create a match with two equal teams'
    );

  });

  it('Não deve ser permitido cadastrar um matchers com um time inexistente', async () => {
    sinon.stub(JWT, 'checkToken').returns({});
    sinon.stub(Team, 'findOne').resolves(null);
    sinon.stub(MatcherService.prototype, 'create').callsFake(() => {
      throw new HandleError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    });

    const response = await chai.request(app)
    .post('/matches')
    .send({
      homeTeam: 80,
      awayTeam: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2
    })
    .set('authorization', 'token');

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal(
      'There is no team with such id!'
    );
  });

  it('dever ser possivel cadastrar um novo matcher', async () => {
    sinon.stub(JWT, 'checkToken').returns({});
    sinon.stub(Matches, 'create').resolves(mockNewMatchers as Matches);
    sinon.stub(Team, 'findOne').resolves({
      id: 5,
      teamName: "Cruzeiro"
   } as Team);

    const response = await chai.request(app)
    .post('/matches')
    .send({
      homeTeam: 16,
      awayTeam: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2
    })
    .set({ authorization: 'token'});

    expect(response.status).to.equal(201);
  });

  it('deve ser possivel atualizar o gols de um matchers', async () => {
      sinon.stub(Matches, 'update').resolves();

      const response = await chai.request(app)
      .patch('/matches/:id')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Updated!');
  });

  it('deve ser possivel alterar o inPorgress de uma partida', async () => {
      sinon.stub(JWT, 'checkToken').returns({});
      sinon.stub(MatcherService.prototype, 'updateProgress').resolves();
      sinon.stub(Matches, 'update').resolves();

      const response = await chai.request(app)
      .patch('/matches/:id/finish')
      .set({ authorization: 'token'});;

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Finished');
      
      sinon.restore();
  });

});