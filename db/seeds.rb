# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Role.create(name: "Godfather", party: "Mafia", active: "corrupt", passive: "immunity", power: "4", rank: "")
Role.create(name: "Bodyguard", party: "Mafia", active: "blackmail", passive: "protect",  power: "3",rank: "")
Role.create(name: "Beagle Boy", party: "Mafia", active: "free", passive: nil, power: "2", rank: "")
Role.create(name: "Enforcer", party: "Mafia", active: "shoot", passive: nil, power: "1", rank: "")
Role.create(name: "President", party: "Town", active: "convert", passive: "immunity", power: "4",  rank: "")
Role.create(name: "Chief", party: "Town", active: "imprison", passive: "protect", power: "3",rank: "")
Role.create(name: "Officer", party: "Town", active: "imprison", passive: "",  power: "2", rank: "")
Role.create(name: "Spy", party: "Town", active: "spy", passive: "", power: "1", rank: "")


