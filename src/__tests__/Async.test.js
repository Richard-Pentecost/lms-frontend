import { render, screen } from '@testing-library/react';
import Async from '../components/Async';

describe('Async component', () => {
  xtest('renders posts if request succeeds', async () => {
    render(<Async />);
    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });

  test('renders posts if request succeeds using mocks', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First Post' }]
    });
    render(<Async />);
    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});