import { Message } from 'discord.js';
import MockMessage from '../mocks/mock-message';
import help, { execute } from './help';

describe('!help command', () => {
  it('handles !help commands', () => {
    expect(help).toMatchSnapshot();
  });

  describe('execute', () => {
    describe('if there are no args', async () => {
      it('replies to the author in channel and DMs help commands', async () => {
        const mockMessage = new MockMessage() as Message;

        // set up Message.author mock
        let sentMessageData;
        const authorSendSpy = jest.fn(data => {
          sentMessageData = data;
          return Promise.resolve();
        }) as Message['author']['send'];
        const mockAuthor = { send: authorSendSpy };
        mockMessage.author = mockAuthor as Message['author'];

        // set up Message.channel mock
        const mockChannel = { type: 'group' };
        mockMessage.channel = mockChannel as Message['channel'];

        // set up Message.reply mock
        const replySpy = jest.fn() as Message['reply'];
        mockMessage.reply = replySpy;

        await execute(mockMessage, []);
        expect.assertions(3);
        expect(authorSendSpy).toHaveBeenCalled();
        expect(sentMessageData).toMatchSnapshot();
        expect(replySpy).toHaveBeenCalledWith(
          "I've sent you a DM with all my commands!",
        );
      });
    });

    describe('if there are args', () => {
      describe('if the arg is an invalid command', () => {
        it('informs the author', () => {
          const mockMessage = new MockMessage() as Message;

          // set up Message.reply mock
          const replySpy = jest.fn() as Message['reply'];
          mockMessage.reply = replySpy;

          execute(mockMessage, ['_']);
          expect(replySpy).toHaveBeenCalledWith("that's not a valid command!");
        });
      });

      describe('if the arg is a valid command', () => {
        it('replies to the author in channel with command instructions', () => {
          const mockMessage = new MockMessage() as Message;

          // set up Message.channel mock
          let sentMessageData;
          const channelSendSpy = jest.fn(
            data => (sentMessageData = data),
          ) as Message['channel']['send'];
          const mockChannel = { send: channelSendSpy };
          mockMessage.channel = mockChannel as Message['channel'];

          execute(mockMessage, ['ping']);
          expect(sentMessageData).toMatchSnapshot();
          expect(channelSendSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
