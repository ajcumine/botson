import { shallow } from 'enzyme';
import React from 'react';
import Header from '.';

describe('Header component', () => {
  it('renders', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
});
