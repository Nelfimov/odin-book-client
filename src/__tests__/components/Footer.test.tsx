import { render, screen } from '@testing-library/react'
import { Footer } from '../../components'

describe('Footer', () => {
  it('renders correctly', () => {
    render(<Footer />)
    const element = screen.getByRole('img')
    expect(element).toBeInTheDocument()
  })
})
