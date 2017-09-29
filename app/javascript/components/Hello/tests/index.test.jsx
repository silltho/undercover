import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import Hello from '../'

Enzyme.configure({ adapter: new Adapter() })

const defaultProps = {
  name: 'test123'
}

const renderComponent = (props = defaultProps) => shallow(<Hello {...props}/>)

describe('<Hello/>', () => {
  test('should render <Hello/>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
