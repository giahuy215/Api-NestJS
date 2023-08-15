import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {

    it('shoud be an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); 
    })

  })

  describe('getOne', () => {
    it('should be a movie', () => {
      service.create({
        title: "test movie",
        year: 2015,
        genres: ['test1']
      })
  
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    })

    it('should throw 404 error', () => {
      try {
        service.getOne(999)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID: 999 not found.')
      }
    })
  })

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: "test movie",
        year: 2015,
        genres: ['test1']
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);

    })

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "test movie",
        year: 2015,
        genres: ['test1']
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('update', () => {
    it('shoud update a movie', () => {
      service.create({
        title: "test movie",
        year: 2015,
        genres: ['test1']
      });

      service.update(1, {title: 'Update test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update test');

    })

    it('should return 404 error', () => {
      try {
        service.update(999, {})
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
