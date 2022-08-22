import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
import Matches from '../database/models/matches';

import { 
  queryFinishedMatchersMock,
  } from './mock/getFinishedMatchers';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste LeadBoard', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('A routa get "/leadboard" deve retornar o status 200', async () => {
    sinon.stub(Team, 'findAll').resolves(queryFinishedMatchersMock as unknown as Team[]);

    const response = await chai.request(app).get('/leaderboard');
    
    expect(response.status).to.equal(200)
  });

  it('A routa get "/leadboard/home" deve retornar o status 200', async () => {
    sinon.stub(Team, 'findAll').resolves(queryFinishedMatchersMock as unknown as Team[]);

    const response = await chai.request(app).get('/leaderboard/home');
    
    expect(response.status).to.equal(200)
  });

  it('A routa get "/leadboard/away" deve retornar o status 200', async () => {
    sinon.stub(Team, 'findAll').resolves(queryFinishedMatchersMock as unknown as Team[]);

    const response = await chai.request(app).get('/leaderboard/away');
    
    expect(response.status).to.equal(200)
  });
});