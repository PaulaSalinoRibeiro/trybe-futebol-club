import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';
import TeamService from '../services/teamService';


chai.use(chaiHttp);

const { expect } = chai;

const mockListTeams: ITeam[] = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  }
]

const mockTeam: ITeam = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
}

describe('Teste Team', () => {
  it('deve retornar uma lista com times e status 200', async() => {
    sinon.stub(Team, 'findAll').resolves(mockListTeams as Team[]);

    const response = await chai.request(app)
    .get('/teams');

    expect(response.status).to.equal(200);

    sinon.restore();
  });

  it('deve retornar um times e o status 200', async() => {
    sinon.stub(Team, 'findOne').resolves(mockTeam as Team);

    const response = await chai.request(app)
    .get('/teams/1');

    expect(response.status).to.equal(200);

    sinon.restore();
  });

  it('deve retornar Not Found com status 400 caso não encontre pelo id', async () => {
    sinon.stub(Team, 'findOne').resolves();

    const response = await chai.request(app)
    .get('/teams/100');

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Not Found');

    sinon.restore();
  });
})