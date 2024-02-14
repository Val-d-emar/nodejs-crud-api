import { db, User } from './db';

describe('Scenario 2', () => {
  const user1 = new User("Ivan Petrov", 45, ["killer", "hacker"]);
  test('test 1', async () => {
    expect(db.add(user1)).toBe(user1);
  });

  test('test 2', () => {
    expect(db.get(user1.id)).toBe(user1);
  });

  test('test 3', () => {
    expect(User.check(user1)).toBe(true);
  });

  test('test 4', () => {
    delete (user1.id);
    expect(User.check(user1)).toBe(true);
    let user2 = {
      username: "123",
      age: 43,
      hobbies: []
    }
    expect(User.check(user2)).toBe(true);
    let user3 = {
      username: 123,
      age: 43,
      hobbies: ["hacker"]
    }
    expect(User.check(user3)).toBe(false);
  });
});
