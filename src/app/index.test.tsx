import { shallow } from 'enzyme';
import React from 'react';

import App from './';

jest.mock('services/discord');

describe('App', () => {
  it('renders', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
