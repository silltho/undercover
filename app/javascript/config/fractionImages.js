import MafiaImage from 'assets/images/fractions/mafia.svg'
import TownImage from 'assets/images/fractions/town.svg'
import AnarchistImage from 'assets/images/fractions/anarchist.svg'

const FractionImages = {
  MAFIA: MafiaImage,
  TOWN: TownImage,
  ANARCHISTS: AnarchistImage
}

export const getImageByFraction = (fraction = '') => {
  const key = fraction.replace(/\s+/g, '').toUpperCase()
  return FractionImages[key]
}

export default FractionImages
