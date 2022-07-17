import React from 'react';
import { mount } from 'enzyme';
import EstadoStar from '../../components/EstadoStar';

describe('<EstadoStar />', () => {
  test('Render del componente EstadoStar', () => {
    const estadoStar = mount(<EstadoStar />);
    expect(estadoStar.length).toEqual(1);
  });
});
