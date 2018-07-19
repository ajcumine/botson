import { shallow } from 'enzyme';
import React from 'react';
import Home from './';

describe('Home page', () => {
  it('renders', () => {
    const component = shallow(<Home />);
    expect(component).toMatchSnapshot();
  });
});
