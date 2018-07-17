import { Message } from 'discord.js';
import MockMessage from '../mocks/mock-message';
import role, { execute } from './role';

describe('!role command', () => {
  it('handles !role commands', () => {
    expect(role).toMatchSnapshot();
  });

  describe('execute', () => {
    describe('if the role exists', () => {
      it('responds with a role switch message', () => {
        const mockMessage = new MockMessage() as Message;

        // set up Message.channel mock
        const channelSendSpy = jest.fn() as Message['channel']['send'];
        const mockChannel = { send: channelSendSpy };
        mockMessage.channel = mockChannel as Message['channel'];

        // set up Message.mentions mock
        const mockFirstUser = jest.fn(
          () => 'User',
        ) as Message['mentions']['users']['first'];
        const mockUsers = { first: mockFirstUser };
        const mockMentions = { users: mockUsers };
        mockMessage.mentions = mockMentions as Message['mentions'];

        execute(mockMessage, ['@User', 'knownRole']);
        expect(channelSendSpy).toHaveBeenCalledWith(
          'You tried to set User to knownRole',
        );
      });
    });

    describe('if the role does not exist', () => {
      it('responds with the available roles', () => {
        const mockMessage = new MockMessage() as Message;

        // set up Message.mentions mock
        const mockFirstUser = jest.fn(
          () => 'User',
        ) as Message['mentions']['users']['first'];
        const mockUsers = { first: mockFirstUser };
        const mockMentions = { users: mockUsers };
        mockMessage.mentions = mockMentions as Message['mentions'];

        // set up Message.reply mock
        const replySpy = jest.fn() as Message['reply'];
        mockMessage.reply = replySpy;

        execute(mockMessage, ['@User', 'unknownRole']);
        expect(replySpy).toHaveBeenCalledWith(
          'the role unknownRole does not exist, available server roles are: knownRole',
        );
      });
    });
  });
});
