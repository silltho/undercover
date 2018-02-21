import React from 'react'
import PropTypes from 'prop-types'

class GameInfo extends React.PureComponent {
  renderInfo = (info) => (
    <li key={`info_${info}`}>{info}</li>
  )

  render() {
    const {
      day,
      informations,
      readInfos
    } = this.props

    const renderedInformations = informations.map(this.renderInfo)

    return (
      <div>
        Infos von Tag {day}
        <ul>
          {renderedInformations}
        </ul>
        <button onClick={readInfos}>
          gelesen
        </button>
      </div>
    )
  }
}

GameInfo.propTypes = {
  day: PropTypes.number.isRequired,
  informations: PropTypes.array.isRequired,
  readInfos: PropTypes.func.isRequired
}

export default GameInfo
