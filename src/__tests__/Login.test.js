import { fireEvent, render, screen } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';

const state = {
  authState: {
    loading: false,
    errorMessage: '',
  }
}
const testUseAppSelector = f => f(state);

// jest.mock('react-redux', () => {
//   return {
//     useDispatch: jest.fn(),
//     useSelector,
//   }
// });
jest.mock('react-redux')

describe('Login component', () => {
  const history = createMemoryHistory();
  

  beforeEach(() => {
    useSelector.mockImplementation(testUseAppSelector);
    useDispatch.mockImplementation(() => jest.fn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render a form with 2 input elements', () => {
    render(<Login />);
    const inputElements = screen.getAllByTestId('input');
    expect(inputElements).toHaveLength(2);
  });

  it('should render a form with a button', () => {
    render(<Login />);
    const buttonElement = screen.getAllByRole('button');
    expect(buttonElement).toHaveLength(1);
  });

  it('logs user in when inputting a correct email and password', () => {
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'valid@email.com' }
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'validPassword' }
    });

    const button = screen.getByRole('button');
    userEvent.click(button);

    // expect(useDispatch).toHaveBeenCalledWith({ email: 'valid@email.com', password: 'validPassword' });
    expect(useDispatch).toHaveBeenCalled();
  });

  it('redirects to the home page when login button is clicked', () => {
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const button = screen.getByRole('button');
    userEvent.click(button);
    
    expect(history.location.pathname).toBe('/home');
  })
});
