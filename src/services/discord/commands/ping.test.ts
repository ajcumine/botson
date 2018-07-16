import ping, { execute } from './ping';

describe('!ping command', () => {
  it('handles !ping commands', () => {
    expect(ping).toMatchSnapshot();
  });

  describe('execute', () => {
    it('responds with "Pong."', () => {
      const messageSendSpy = jest.fn();
      const mockMessage = {
        channel: {
          send: messageSendSpy,
        },
      };

      execute(mockMessage);
      expect(messageSendSpy).toHaveBeenCalledWith('Pong.');
    });
  });
});
