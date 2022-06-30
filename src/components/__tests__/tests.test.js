import { format, fetchAPI, searchData } from '../helpers.js';
  
describe('Fetch call testing', () => {
  test('Trying to mock the API call', async () => {

    //const fetchMock = jest
    //  .spyOn(global, 'fetch')
    //  .mockImplementation(() =>
    //    Promise.resolve({ json: () => Promise.resolve({
    //      "avatar_url": "https://avatars.githubusercontent.com/u/85193527?v=4",
    //      "login": "JadeRemi",
    //      "html_url": "https://github.com/JadeRemi",
    //      "bio": "Passionate web developer and crypto enthusiast",
    //      "public_repos": "18"
    //    }) })
    //  )
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve({
          "avatar_url": "https://avatars.githubusercontent.com/u/85193527?v=4",
          "login": "JadeRemi",
          "html_url": "https://github.com/JadeRemi",
          "bio": "Passionate web developer and crypto enthusiast",
          "public_repos": "18"
      })}));

    const json = await fetchAPI("https://api.github.com/users/jaderemi");

    // expect(fetchMock).toHaveBeenCalledWith(
    //   'https://api.github.com/users/jaderemi'
    // )

    expect(typeof json).toEqual('object');
    expect(Object.keys(json).length).toEqual(5);
    expect(json.login).toEqual('JadeRemi');

    global.fetch.mockClear()
    delete global.fetch;
  })
})



describe('Formatting testing', () => {
  test('Reformat the date to readable format', async () => {
    const data = format("2021-06-01T19:05:16Z")
    expect(data).toEqual('Tuesday, Jun 1, 2021');
    expect(typeof data).toEqual('string');
  })
})

describe('Search testing', () => {
  test('Activate callbacks to set new values via setters', async () => {
    // add mock callbacks in the future
  })
})