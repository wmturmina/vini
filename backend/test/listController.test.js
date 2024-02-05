const chai = require('fix-esm').require('chai');
const supertest = require('supertest');
const app = require('../app'); // Importar app
const { listsModel } = require("../models/listsModel");

var expect = chai.expect;

describe('List Controller', () => {
  // Teste para a rota de criação
  it('should create a new list', async () => {
    const response = await supertest(app)
      .post('/api/lists')
      .send({ name: 'Nova Lista' });

    expect(response.status).to.equal(201);
    expect(response.body.msg).to.equal('Lista criada com sucesso!');
  });

  // Teste para a rota de obtenção de todas as listas
  it('should get all lists', async () => {
    const response = await supertest(app)
      .get('/api/lists');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  // Teste para a rota de obtenção de uma lista por ID
  it('should get a list by ID', async () => {
    const list = await listsModel.create({ name: 'Nova Lista' });

    const response = await supertest(app)
      .get(`/api/lists/${list._id}`);

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal('Nova Lista');
  });

  // Teste para a rota de exclusão de uma lista por ID
  it('should delete a list by ID', async () => {
    const list = await listsModel.create({ name: 'Nova Lista' });

    const response = await supertest(app)
      .delete(`/api/lists/${list._id}`);

    expect(response.status).to.equal(200);
    expect(response.body.msg).to.equal('Lista excluida com sucesso');
  });

  // Teste para a rota de atualização de uma lista por ID
  it('should update a list by ID', async () => {
    const list = await listsModel.create({ name: 'Nova Lista' });

    const response = await supertest(app)
      .put(`/api/lists/${list._id}`)
      .send({ name: 'Lista Atualizada' });

    expect(response.status).to.equal(200);
    expect(response.body.msg).to.equal('Lista atualizada com sucesso!');
  });
});
