import {Client, expect} from '@loopback/testlab';
import {ETrustyApplication} from '../..';
import {setupApplication} from './test-helper';

describe('UserController', () => {
  let app: ETrustyApplication;
  let client: Client;
  // @todo set up test data builder: https://loopback.io/doc/en/lb4/Testing-your-application.html#use-test-data-builders
  const testUserCredentials = {
    "email": "test@example.com",
    "password": "87654321"
  };
  const testUserId = 1;
  const incorrectTestUserCredentials = {
    "email": "test@example.com",
    "password": "wrong_password"
  };

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /signUp', async () => {
    const res = await client.post('/signUp').send(testUserCredentials).expect(200);
    expect(res.body).to.containEql({
      id: testUserId,
      email: testUserCredentials.email,
    });
  });

  it('invokes GET /logIn', async () => {
    const res = await client.post('/users/logIn').send(testUserCredentials).expect(200);
    //console.log(res.body);
    expect(res.body).to.have.property('token');
  });

  it('invokes GET /logIn (incorrect credentials)', async () => {
    const res = await client.post('/users/logIn').send(incorrectTestUserCredentials).expect(401);
    //console.log(res.body);
    expect(res.body).to.not.have.property('token');
  });

  it('invokes GET /whoAmI', async () => {
    const logInRes = await client.post('/users/logIn').send(testUserCredentials).expect(200);
    const token = logInRes.body.token;
    const res = await client.get('/whoAmI').set({
      'Authorization': `Bearer ${token}`,
      'Accept': 'text/plain',
      //'Accept': 'application/json',
    }).expect(200);
    //console.log(res.text);
    //console.log(token);
    expect(res.text).to.be.equal(`${testUserId}`);
  });

  it('invokes GET /whoAmI (without JWT)', async () => {
    const res = await client.get('/whoAmI').expect(401);
    expect(res.body).to.have.property('error');
  });
});
