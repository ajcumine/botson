import request, { ResponseError } from './';

describe('request', () => {
  it('overrides default options if options passed in', async () => {
    const mockFetch: any = jest.fn(() =>
      Promise.resolve({
        headers: {
          get: () => '',
        },
        ok: true,
        status: 200,
        json: () => Promise.resolve(),
      }),
    );

    await request(
      'some/url',
      {
        headers: {
          Accept: 'application/not-json',
        },
        method: 'POST',
      },
      mockFetch,
    );

    expect(mockFetch).toHaveBeenCalledWith(
      'some/url',
      expect.objectContaining({
        headers: {
          Accept: 'application/not-json',
        },
        method: 'POST',
      }),
    );
  });
});

describe('ResponseError', () => {
  const responseError = {
    message: 'Oh no!',
    status: 500,
  };

  it('includes error response as properties', () => {
    const error = new ResponseError(responseError);
    expect(error.message).toEqual('Oh no!');
    expect(error.status).toEqual(500);
  });
});
