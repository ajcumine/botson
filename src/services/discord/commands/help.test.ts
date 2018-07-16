import help, { execute } from './help';

describe('!help command', () => {
  it('handles !help commands', () => {
    expect(help).toMatchSnapshot();
  });

  describe('execute', () => {
    describe('if there are no args', async () => {
      it('replies to the author in channel and DMs help commands', async () => {
        let sentMessageData;
        const authorSendSpy = jest.fn(data => {
          sentMessageData = data;
          return Promise.resolve();
        });
        const replySpy = jest.fn();
        const mockMessage = {
          author: {
            send: authorSendSpy,
          },
          channel: {
            type: 'notDm',
          },
          reply: replySpy,
        };
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
          const replySpy = jest.fn();
          const mockMessage = {
            reply: replySpy,
          };
          execute(mockMessage, ['_']);
          expect(replySpy).toHaveBeenCalledWith("that's not a valid command!");
        });
      });

      describe('if the arg is a valid command', () => {
        it('replies to the author in channel with command instructions', () => {
          let sentMessageData;
          const sendSpy = jest.fn(data => (sentMessageData = data));
          const mockMessage = {
            channel: {
              send: sendSpy,
            },
          };
          execute(mockMessage, ['ping']);
          expect(sentMessageData).toMatchSnapshot();
          expect(sendSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
