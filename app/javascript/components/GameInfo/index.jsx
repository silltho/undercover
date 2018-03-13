import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Button from 'components/Button'

class GameInfo extends React.PureComponent {
  render() {
    const {
      round,
      readInfos,
      roundInformation
    } = this.props

    return (
      <React.Fragment>
        <Header>
          Tag {round}
        </Header>
        <Content>
          {
            roundInformation.map((infos) => {
              return (
                <div>
                  <ul>
                    {
                      infos.map((info) => (
                        <li>{info}</li>
                      ))
                    }
                  </ul>
                </div>
              )
            })
          }
        </Content>
        <Footer>
          <Button onClick={readInfos} text="gelesen" />
        </Footer>
      </React.Fragment>
    )
  }
}

GameInfo.defaultProps = {
  round: 0
}

GameInfo.propTypes = {
  round: PropTypes.number,
  readInfos: PropTypes.func.isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired
}

export default GameInfo
