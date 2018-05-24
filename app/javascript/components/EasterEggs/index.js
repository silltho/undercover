import Unicorn from './unicorn'
import Handsome from './handsome'
import Board from './board'
import Pikarun from './pikarun'
import Cool from './cool'
import Swim from './swim'
import Earth from './earth'
import Catrun from './catrun'
import Kirby from './kirby'
import Homer from './homer'
import Dog from './dog'
import Hangover from './hangover'

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
      case 'anna': return Kirby()
      case 'tom': return Board()
      case 'paul': return Homer()
      case 'melissa': return Swim()
      case 'woidl': return Dog()
      case 'tschayson': return Earth()
      case 'martin': return Hangover()
      case 'jakob': return Pikarun()
      case 'jana': return Catrun()
      case 'mike': return Cool()
      case 'markus': return Handsome()
      default: return null
    }
  })
}
