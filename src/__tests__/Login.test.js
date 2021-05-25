import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';

describe('Login component', () => {
  test('should render a form with 2 input elements', () => {
    render(<Login />);
    const inputElements = screen.getAllByTestId('input');
    expect(inputElements).toHaveLength(2);
  });

  test('should render a form with a button', () => {
    render(<Login />);
    const buttonElement = screen.getAllByRole('button');
    expect(buttonElement).toHaveLength(1);
  });

  xtest('inputting a correct email and password should log user in', () => {
    render(<Login />);

  });
});
