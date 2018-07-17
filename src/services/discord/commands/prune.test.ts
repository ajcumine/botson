import { Message } from 'discord.js';
import MockMessage from '../mocks/mock-message';
import prune, { execute } from './prune';

describe('!prune command', () => {
  it('handles !prune commands', () => {
    expect(prune).toMatchSnapshot();
  });

  describe('execute', () => {
    it('deletes the number of messages provided +1 for the trigger command', () => {
      const mockMessage = new MockMessage() as Message;

      // set up Message.channel mock
      const bulkDeleteSpy = jest.fn() as Message['channel']['bulkDelete'];
      const mockChannel = { bulkDelete: bulkDeleteSpy };
      mockMessage.channel = mockChannel as Message['channel'];

      const args = ['3'];

      execute(mockMessage, args);
      expect(bulkDeleteSpy).toHaveBeenCalledWith(4, true);
    });

    it('does not delete if a number is not provided', () => {
      const mockMessage = new MockMessage() as Message;

      // set up Message.channel mock
      const bulkDeleteSpy = jest.fn() as Message['channel']['bulkDelete'];
      const mockChannel = { bulkDelete: bulkDeleteSpy };
      mockMessage.channel = mockChannel as Message['channel'];

      // set up Message.reply mock
      const replySpy = jest.fn() as Message['reply'];
      mockMessage.reply = replySpy;

      const args = ['not-a-number'];

      execute(mockMessage, args);
      expect(bulkDeleteSpy).not.toHaveBeenCalled();
      expect(replySpy).toHaveBeenCalledWith(
        "that doesn't seem to be a valid number.",
      );
    });

    it('does not delete if the number provided is not in the required range', () => {
      const mockMessage = new MockMessage() as Message;

      // set up Message.channel mock
      const bulkDeleteSpy = jest.fn() as Message['channel']['bulkDelete'];
      const mockChannel = { bulkDelete: bulkDeleteSpy };
      mockMessage.channel = mockChannel as Message['channel'];

      // set up Message.reply mock
      const replySpy = jest.fn() as Message['reply'];
      mockMessage.reply = replySpy;

      const args = ['1000000'];

      execute(mockMessage, args);
      expect(bulkDeleteSpy).not.toHaveBeenCalled();
      expect(replySpy).toHaveBeenCalledWith(
        'you need to input a number between 1 and 99.',
      );
    });
  });
});
