import { render, screen } from '@testing-library/react'
import { Navbar } from '../../components'

describe('Navbar', () => {
  it('when not logged in links are register and login', () => {
    render(<Navbar isLogged={false} logout={() => { console.log() }} />)
    const login = screen.getByText(/Login/i)
    expect(login).toBeInTheDocument()
    const register = screen.getByText(/Register/i)
    expect(register).toBeInTheDocument()
  })

  test('when logged in links change', () => {
    render(<Navbar isLogged={true} logout={() => { console.log() }}/>)
    const element = screen.getByText(/Profile/i)
    expect(element).toBeInTheDocument()
  })
})
