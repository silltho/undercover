import React from 'react'
import { shallow } from 'enzyme'
import { WebSocket } from 'mock-socket'

import App from '../'

const defaultProps = {

}

global.WebSocket = WebSocket

const renderComponent = (props = defaultProps) => shallow(<App {...props}/>)

describe('<App/>', () => {
	it('should render <App/>', () => {
		const renderedComponent = renderComponent()
		expect(renderedComponent.find('div').length).toEqual(1)
	})
})