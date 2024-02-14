import Footer from '../components/Footer'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Footer', () => {
    it('renders successfully', () => {
        const { container } = render(<Footer />)

        expect(container).toMatchSnapshot()
        const footer = screen.getByRole('contentinfo')
        expect(footer).toBeInTheDocument()
        expect(footer).toHaveTextContent('Powered by Dog.CEO & AWS')
    })
})