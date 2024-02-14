import HomePage from "../pages/index";
import { describe, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('HomePage', () => {
    it('renders successfully', () => {
        const { container } = render(<HomePage />)
        expect(container).toMatchSnapshot()
        expect(screen.getByRole('button')).toHaveTextContent('Fetch')
    })
})
