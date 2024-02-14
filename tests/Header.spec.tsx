import Header from '../components/Header'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Document', () => {
    it('renders successfully', () => {
        const { container } = render(<Header />)

        expect(container).toMatchSnapshot()
        const heading = screen.getByRole('banner')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('Doggo')
    })
})