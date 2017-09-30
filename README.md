# README

Ruby: 2.3.3
Rails: 5.1.4

database.yml_template umbenennen auf database.yml <br>
bundle install<br>
rails db:create<br>
rails db:migrate<br>

dann sollts laufen

## Starten

### Option 1

Foreman: ``bundle exec foreman start``

(config => Procfile)

### Option 2

Rails Server: ``bundle exec rails s``

Webpack Dev Server: ``ruby ./bin/webpack-dev-server``

## NPM Package installation

Yarn: ``yarn add <packagename>``

## Linting
### EsLint
``yarn lint``
(config => eslintrc.js)

## Testing
### Jest
``yarn test``
(config => package.json)

## Commit Hooks
### Overcommit
todo