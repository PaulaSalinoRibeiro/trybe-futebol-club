import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import LoginService from '../services/loginService';
import HandleError from '../utils/handleError';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

import IUser from '../interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

const invalidatedRequest = {
  email: '',
  password: ''
}

const validatedRequest = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const unregistryUser = {
  email: 'test@test.com',
  password: '123456'
}

const wrongPassword = {
  email: 'teste@teste.com',
  password: 'wrong-password'
}

const registryUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const user: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

describe('Teste Login', () => {
  it('Deve lançar um erro com o status 400 se não receber email ou password', async () => {
    sinon.stub(LoginService.prototype, 'login').callsFake(() => {
      throw new HandleError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    });

    const response = await chai.request(app)
    .post('/login').send(invalidatedRequest);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('All fields must be filled');

    sinon.restore();
  });

  it('Deve lançar um erro com o status 401 se logar incorretamente', async () => {
    sinon.stub(User, 'findOne').resolves(user as User)
    sinon.stub(LoginService.prototype, 'login').callsFake(() => {
      throw new HandleError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    });

    const response = await chai.request(app)
    .post('/login').send(unregistryUser);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Incorrect email or password');

    sinon.restore();

  });

  it('Deve retornar status 200 com um token', async () => {
    sinon.stub(User, 'findOne').resolves(user as User)

    const response = await chai.request(app)
    .post('/login').send(registryUser);

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property('token');

    sinon.restore();

  });
});
