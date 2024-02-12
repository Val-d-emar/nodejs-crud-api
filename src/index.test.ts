import {str, PORT} from '.';
import process from 'process';

describe('Scenario 1', () => {
  test('test 1', async () => {
    expect(str).toBe("Hello");
  });

  test('test 2', () => {
    expect(PORT).toBe(4000);
  });
});
