import { Message } from 'discord.js';
import MockMessage from '../mocks/mock-message';
import ping, { execute } from './ping';

describe('!ping command', () => {
  it('handles !ping commands', () => {
    expect(ping).toMatchSnapshot();
  });

  describe('execute', () => {
    it('responds with "Pong."', () => {
      const mockMessage = new MockMessage() as Message;

      // set up Message.channel mock
      const messageSendSpy = jest.fn() as Message['channel']['send'];
      const mockChannel = { send: messageSendSpy };
      mockMessage.channel = mockChannel as Message['channel'];

      execute(mockMessage);
      expect(messageSendSpy).toHaveBeenCalledWith('Pong.');
    });
  });
});
