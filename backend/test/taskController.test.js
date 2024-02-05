const chai = require('fix-esm').require('chai');
const supertest = require('supertest');
const app = require('../app'); // Importar App
const { tasksModel } = require("../models/tasksModel");
const { listsModel } = require("../models/listsModel");

const expect = chai.expect;

describe('Task Controller', () => {
  // Teste para a rota de criação
  it('should create a new task', async () => {
    const list = await listsModel.create({ name: 'Nova Lista' });

    const response = await supertest(app)
      .post('/api/tasks')
      .send({
        title: 'Nova Tarefa',
        description: 'Uma nova tarefa',
        status: false,
        list: { name: 'Nova Lista' }
      });

    expect(response.status).to.equal(201);
    expect(response.body.msg).to.equal('Tarefa criada com sucesso!');
  });

  // Teste para a rota de obtenção de todas as tarefas
  it('should get all tasks', async () => {
    const response = await supertest(app)
      .get('/api/tasks');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  // Teste para a rota de obtenção de uma tarefa por ID
  it('should get a task by ID', async () => {
    const task = await tasksModel.create({
        title: 'Nova Tarefa',
        description: 'Uma nova tarefa',
        status: false,
        list: { name: 'Nova Lista' }
    });

    const response = await supertest(app)
      .get(`/api/tasks/${task._id}`);

    expect(response.status).to.equal(200);
  });

  // Teste para a rota de exclusão de uma tarefa por ID
  it('should delete a task by ID', async () => {
    const task = await tasksModel.create({
        title: 'Nova Tarefa',
        description: 'Uma nova tarefa',
        status: false,
        list: { name: 'Nova Lista' }
    });

    const response = await supertest(app)
      .delete(`/api/tasks/${task._id}`);

    expect(response.status).to.equal(200);
    expect(response.body.msg).to.equal('Tarefa excluida com sucesso');
  });

  // Teste para a rota de atualização de uma tarefa por ID
  it('should update a task by ID', async () => {
    const task = await tasksModel.create({
      title: 'Nova Tarefa',
      description: 'Uma nova tarefa',
      status: false,
      list: { name: 'nova Lista' }
    });

    const response = await supertest(app)
      .put(`/api/tasks/${task._id}`)
      .send({
        title: 'Nova Tarefa',
        description: 'uma nova tarefa',
        status: true
      });

    expect(response.status).to.equal(200);
    expect(response.body.msg).to.equal('Tarefa atualizada com sucesso!');
  });
});
