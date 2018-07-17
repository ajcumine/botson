class MockMessage {
  public readonly guild;
  constructor() {
    this.guild = { roles: [{ name: 'knownRole' }] };
  }
}

export default MockMessage;
