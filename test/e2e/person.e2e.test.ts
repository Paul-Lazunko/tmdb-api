import DoneCallback = jest.DoneCallback;
import request, {Response} from 'supertest';

import {
  EHttpStatus,
  INVALID_PERSON_ID,
  VALID_PERSON_ID
} from '../../src/constants';

import { application } from '../../src/application';


describe('tmdb-api application e2e test suite', () => {

  beforeAll(async () => {
    await application.start();
  }, 60000);

  afterAll(async () => {
    await application.stop();
  });

  it(`Should return person from the provided list`, (done: DoneCallback) => {
    request(application.app)
      .get(`/person/${VALID_PERSON_ID}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(EHttpStatus.OK)
      .then((response: Response) => {
        expect(response.body).toBeDefined();
        expect(response.body.person).toBeDefined()
        done();
      })
      .catch((e: Error) => done(e))
  });

  it(`Shouldn't return person who is absent at the provided list`, (done: DoneCallback) => {
    request(application.app)
      .get(`/person/${INVALID_PERSON_ID}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(EHttpStatus.NOT_FOUND)
      .then((response: Response) => {
        expect(response.body).toBeDefined();
        done();
      })
      .catch((e: Error) => done(e))
  });

  it(`Should return person's movies`, (done: DoneCallback) => {
    request(application.app)
      .get(`/person/${VALID_PERSON_ID}/movies`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(EHttpStatus.OK)
      .then((response: Response) => {
        expect(response.body).toBeDefined();
        expect(response.body.person).toBeDefined()
        expect(response.body.movies).toBeDefined()
        expect(response.body.movies.length).toBeGreaterThan(0)
        done();
      })
      .catch((e: Error) => done(e))
  });

  it(`Should return persons who play similar role`, (done: DoneCallback) => {
    request(application.app)
      .get(`/person/similar/character`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(EHttpStatus.OK)
      .then((response: Response) => {
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeDefined()
        expect(response.body[0].character).toBeDefined()
        expect(response.body[0].persons).toBeDefined()
        expect(response.body[0].persons.length).toBeGreaterThan(1)
        done();
      })
      .catch((e: Error) => done(e))
  });

});

