import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as data from '../data/data.json';
import { BeersService } from '../src/beers/beers.service';
import exp from 'constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let beersService: BeersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    beersService = moduleFixture.get(BeersService);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/beers (GET) should return all beers', async () => {
    const response = await request(app.getHttpServer()).get('/beers');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(data);
  });

  it('/beers/64acfe1efebd5d00024c3364 (GET) should return an object "beer"', async () => {
    const beer = {
      // Información de la cerveza con _id "64acfe1efebd5d00024c3364"
    };

    const response = await request(app.getHttpServer()).get(
      '/beers/64acfe1efebd5d00024c3364',
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(beer);
  });

  it('/beers/random (GET) should return a random "beer"', async () => {
    const beer = {
      // Información de una cerveza aleatoria que esperas recibir
    };

    const spy = jest.spyOn(beersService, '_rndm');
    spy.mockReturnValue(0);

    const response = await request(app.getHttpServer()).get('/beers/random');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(beer);
  });

  it('/beers (POST) should create a new beer', async () => {
    const newBeer = {
      // Datos de prueba para crear una nueva cerveza
    name: 'Nueva Cerveza',
    tagline: 'Una nueva cerveza creada con pruebas',
    first_brewed: '08/2023', // Fecha de la primera producción
    description: 'Una deliciosa cerveza creada con pruebas',
    attenuation_level: 80, // Nivel de atenuación
    brewers_tips: 'Agregar lúpulo al final para dar un aroma floral',
    contributed_by: 'Usuario de pruebas',
    __v: 0,
    };

    const spy = jest.spyOn(beersService,'_idGenerator');
    spy.mockReturnValue('key');
    const response = await request(app.getHttpServer())
      .post('/beers')
      .send(newBeer);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      _id: 'key',
      ...newBeer,
      image_url: expect.any(String),
      expireAt: expect.any(String),
      
    });
  });
});

