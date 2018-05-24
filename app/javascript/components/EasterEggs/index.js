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
import Pikachu from './pikachu'
import Spongebob from './spongebob'
import Winner from './winner'
import Haters from './haters'
import Rabbit from './rabbit'
import Ballon from './balloon'
import Mario from './mario'
import Ufo from './ufo'
import Psyduck from './psyduck'
import Britney from './britney'

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
  'markus',
  'july',
  'erfan',
  'karli',
  'neele',
  'vanessa',
  'daxi',
  'johnny',
  'jonah',
  'mario',
  'tobi'
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
      case 'july': return Pikachu()
      case 'erfan': return Haters()
      case 'karli': return Spongebob()
      case 'neele': return Rabbit()
      case 'vanessa': return Ballon()
      case 'daxi': return Winner()
      case 'johnny': return Ufo()
      case 'jonah': return Psyduck()
      case 'mario': return Mario()
      case 'tobi': return Britney()
      case 'markus': return Handsome()
      default: return null
    }
  })
}
