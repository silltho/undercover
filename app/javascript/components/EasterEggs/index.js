import Unicorn from './unicorn'
import Handsome from './handsome'
import Board from './board'
import Pikarun from './pikarun'
import Cool from './cool'

export const easterEggs = [
  'paddy',
  'anna',
  'tom',
  'paul',
  'melissa',
  'woidl',
  'tschayson',
  'martin',
  'jakob',
  'jana',
  'mike',
  'markus'
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
      case 'jakob': return Pikarun()
      case 'jana': return Board()
      case 'mike': return Cool()
      case 'markus': return Board()
      default: return null
    }
  })
}
