import { Cascade, Collection, Entity, ManyToOne, MikroORM, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/sqlite';
import { User } from './User';
import { BasePicture, CoverPicture, ProfilePicture } from './Pictures';


let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init({
    dbName: ':memory:',
    entities: [User, BasePicture, CoverPicture, ProfilePicture],
    debug: ['query', 'query-params'],
    allowGlobalContext: true, // only for testing
  });
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
});

test('user should be able to create/update pictures', async () => {
  
  let user = new User();
  user.id = 1;
  user.cover_picture = new CoverPicture('/path/1');
  user.cover_picture.cover_user = user;
  user.cover_picture.id = 10;
  user.profile_picture = new ProfilePicture('/path/2');
  user.profile_picture.profile_user = user;
  user.profile_picture.id = 11;

  orm.em.create(User, user);
  await orm.em.persist(user).flush();
  orm.em.clear();

  user = await orm.em.findOneOrFail(User, { id: user.id });
  expect(user.cover_picture).toBeDefined();
  expect(user.profile_picture).toBeDefined();

  user.cover_picture = new CoverPicture('/path/3');
  user.cover_picture.cover_user = user;
  user.cover_picture.id = 20;
  user.profile_picture = new ProfilePicture('/path/4');
  user.profile_picture.profile_user = user;
  user.profile_picture.id = 21;

  await orm.em.persist(user).flush();
  orm.em.clear();  

  user = await orm.em.findOneOrFail(User, { id: user.id });
  expect(user.cover_picture).toBeDefined();
  expect(user.profile_picture).toBeDefined();
  expect(user.cover_picture!.path).toBe('/path/3');
  expect(user.profile_picture!.path).toBe('/path/4');
});
