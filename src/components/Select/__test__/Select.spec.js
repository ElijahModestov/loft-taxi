import React from 'react';
import { Select } from '../Select';
import { render, fireEvent } from '@testing-library/react';

describe('Select', () => {
  it('renders correctly', () => {
    const options = [{id: 1, option: 'Тестовая опция 1'}, {id: 2, option: 'Тестовая опция 2'}]
    const { getByText, getByPlaceholderText } = render(
      <Select optionsList={options}
              onSelectChange={() => {}}
              defaultValue={'Тестовое начальное значение'}/>
    );

    expect(getByText('Тестовое начальное значение')).toBeInTheDocument();
    fireEvent.click(getByText('Тестовое начальное значение'));
    expect(getByText('Тестовая опция 1')).toBeInTheDocument();
    expect(getByText('Тестовая опция 2')).toBeInTheDocument();
  });
});