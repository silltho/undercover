# README

Ruby: 2.3.3
Rails: 5.1.4

database.yml_template umbenennen auf database.yml  
bundle install  
rails db:create (fix pg_db: postgres -D /usr/local/var/postgres)  
rails db:migrate  
npm install  

Icons:https://github.com/Angelmmiguel/material_icons 
Materialize: http://materializecss.com/getting-started.html 

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