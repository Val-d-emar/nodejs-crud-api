import { db, User } from './db';

describe('Scenario 1', () => {
  const user1 =  new User("Ivan Petrov", 45, ["killer","hacker"]);
  test('test 1', async () => {
    expect(db.add(user1)).toBe(user1);
  });

  test('test 2', () => {
    expect(db.get(user1.id)).toBe(user1);
  });
});
