import {render, screen} from '@testing-library/react';
import {App} from '../../components';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    const element = screen.getByTestId('App');
    expect(element).toBeInTheDocument();
  });
});
