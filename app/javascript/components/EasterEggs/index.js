import Unicorn from './unicorn'
import Handsome from './handsome'
import Board from './board'

export const easterEggs = [
  'paddy',
  'anna',
  'tom'
]

export const getEasterEggsFromCodenames = (codenames) =>
  codenames.filter((c) => easterEggs.includes(c))

export default function (showEasterEggs) {
  showEasterEggs.forEach((e) => {
    switch (e) {
      case 'paddy': return Unicorn()
      case 'anna': return Handsome()
      case 'tom': return Board()
      case 'paul': return Board()
      case 'melissa': return Board()
      case 'woidl': return Board()
      case 'tschayson': return Board()
      case 'martin': return Board()
      default: return null
    }
  })
}
