import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as data from '../data/data.json';
import { BeersService } from '../src/beers/beers.service';

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
  it('/beers (GET) should return all beers', async ()=>{
    const response = await request(app.getHttpServer()).get('/beers');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(data);
  })

  it('/beers/64acfe1efebd5d00024c3364 (GET) should return an object "beer"', async ()=>{
    const beer = {"image_url": "https://images.punkapi.com/v2/keg.png",
    "_id": "64acfe1efebd5d00024c3364",
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    "first_brewed": "09/2007",
    "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    "attenuation_level": 75,
    "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
    "contributed_by": "Sam Mason <samjbmason>",
    "expireAt": "2023-07-11T07:00:46.766Z",
    "__v": 0};

    const response = await request (app.getHttpServer()).get(
      '/beers/64acfe1efebd5d00024c3364',
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(beer)
;
 })


  it('/beers/random (GET) should return a random "beer"', async ()=>{
    const beer = {"image_url": "https://images.punkapi.com/v2/keg.png",
    "_id": "64acfe1efebd5d00024c3364",
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    "first_brewed": "09/2007",
    "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    "attenuation_level": 75,
    "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
    "contributed_by": "Sam Mason <samjbmason>",
    "expireAt": "2023-07-11T07:00:46.766Z",
    "__v": 0};

   const spy = jest.spyOn(beersService,'_rndm');
   spy.mockReturnValue(0);

    const response = await request (app.getHttpServer()).get(
      '/beers/random',
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(beer);
    
; })



});
