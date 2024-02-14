import HomePage from "../pages/index";
import { describe, it } from '@jest/globals'
import renderer from 'react-test-renderer'

describe('HomePage', () => {
    it('renders successfully', () => {
        const component = renderer.create(
            <HomePage />
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
