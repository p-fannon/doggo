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
                breed: 'Australian-Terrier',
                randomDogUrl: 'https://images.dog.ceo/breeds/terrier-australian/n02096294_1553.jpg'
            }
        })
    })

    it('renders successfully', () => {
        const { container } = render(<HomePage />)

        expect(container).toMatchSnapshot()
        const fetchButton = screen.getByRole('button')
        expect(fetchButton).toBeInTheDocument()
        expect(fetchButton).toHaveTextContent('Fetch')
    })

    it('makes a network call and updates the view after pressing fetch button', async () => {
        const {getByRole, getByText, getByAltText, getByTestId} = render(<HomePage />)

        const fetchButton = getByRole('button')

        await fireEvent.click(fetchButton);

        await waitFor(() => {
            const imageContainer = getByTestId('image-container')
            expect(getByText('A wild Australian Terrier appeared!')).toBeInTheDocument()
            expect(getByAltText('Australian Terrier')).toBeInTheDocument()
            expect(imageContainer).toHaveClass('relative size-64 md:size-96 lg:size-[32rem] xl:size-[40rem]')
            expect(axios.get).toHaveBeenCalledWith(`https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`, config)
        })
    })

    it.each([400, 500])('returns an error state on a failed request with %s status', async (status) => {
        axios.get = jest.fn().mockRejectedValue({
            status
        })

        const {getByRole, getByText} = render(<HomePage />)

        const fetchButton = getByRole('button')

        await fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(getByText('Could not fetch a dog')).toBeInTheDocument()
            expect(axios.get).toHaveBeenCalledWith(`https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`, config)
        })
    })
})
