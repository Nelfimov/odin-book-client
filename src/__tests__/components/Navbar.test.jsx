import {render, screen} from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  it('when not logged in links are register and login', () => {
    render(<Navbar isLoggedIn={false} />);
    const login = screen.getByText(/Login/i);
    expect(login).toBeInTheDocument();
    const register = screen.getByText(/Register/i);
    expect(register).toBeInTheDocument();
  });

  test('when logged in links change', () => {
    render(<Navbar isLoggedIn={true}/>);
    const element = screen.getByText(/Profile/i);
    expect(element).toBeInTheDocument();
  });
});
