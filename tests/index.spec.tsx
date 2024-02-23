import HomePage from '../pages/index';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'

jest.mock("axios");

const config = {
    baseURL: `https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`,
    params: {
        bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
    },
    headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`
    }
};

describe('HomePage', () => {
    beforeEach(() => {
        axios.get = jest.fn().mockResolvedValue({
            data: {
                breed: 'Doggo',
                randomDogUrl: 'https://images.dog.ceo/breeds/poodle-toy/n02113624_8951.jpg'
            }
        })
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders successfully', () => {
        const { container } = render(<HomePage />)

        expect(container).toMatchSnapshot()
        const fetchButton = screen.getByRole('button')
        expect(fetchButton).toBeInTheDocument()
        expect(fetchButton).toHaveTextContent('Fetch')
    })

    it('makes a network call and updates the view after pressing fetch button', async () => {
        const {getByRole, getByText, getByAltText} = render(<HomePage />)

        const fetchButton = getByRole('button')

        await fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(getByText('A wild Doggo appeared!')).toBeInTheDocument()
            expect(getByAltText('Doggo')).toBeInTheDocument()
            expect(axios.get).toHaveBeenCalledWith(`https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`, config)
        })
    })
})
