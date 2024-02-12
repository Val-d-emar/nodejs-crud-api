import {str, PORT, crud_server} from '.';
import process from 'process';

describe('Scenario 1', () => {
  crud_server.unref();
  test('test 1', async () => {
    expect(str).toBe("Hello");
  });

  test('test 2', () => {
    expect(PORT).toBe(4000);
  });  
});
