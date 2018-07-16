import Discord from 'discord.js';
import role, { execute } from './role';

describe('!role command', () => {
  it('handles !role commands', () => {
    expect(role).toMatchSnapshot();
  });

  describe('execute', () => {
    describe('if the role exists', () => {
      it('responds with a role switch message', () => {
        const messageSendSpy = jest.fn();
        const mockMessage = {
          channel: {
            send: messageSendSpy,
          },
          guild: {
            roles: [{ name: 'knownRole' }],
          },
          mentions: {
            users: {
              first: () => 'User',
            },
          },
        };

        execute(mockMessage, ['@User', 'knownRole']);
        expect(messageSendSpy).toHaveBeenCalledWith(
          'You tried to set User to knownRole',
        );
      });
    });

    describe('if the role does not exist', () => {
      it('responds with the available roles', () => {
        const replySpy = jest.fn();
        const mockMessage = {
          guild: {
            roles: [{ name: 'knownRole' }],
          },
          mentions: {
            users: {
              first: () => 'User',
            },
          },
          reply: replySpy,
        };

        execute(mockMessage, ['@User', 'unknownRole']);
        expect(replySpy).toHaveBeenCalledWith(
          'the role unknownRole does not exist, available server roles are: knownRole',
        );
      });
    });
  });
});
