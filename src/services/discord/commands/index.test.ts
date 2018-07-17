import commands from '.';

describe('commands', () => {
  it('is a list of command handlers', () => {
    expect(commands).toMatchSnapshot();
  });
});
