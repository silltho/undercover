# README2s

Ruby: 2.3.3
Rails: 5.1.4

database.yml_template umbenennen auf database.yml  
bundle install  
rails db:create
rails db:migrate  
npm install  

Icons:https://github.com/Angelmmiguel/material_icons  
Materialize: http://materializecss.com/getting-started.html 

**Install NPM packages**  
Yarn: ``yarn add <packagename>``  

## Start

**Option 1**  

Rails Server: ``bundle exec rails s``

**Option 2 (mit Hot Module Replacement)**  

Rails Server: ``bundle exec rails s``

Webpack Dev Server: ``ruby ./bin/webpack-dev-server``

## Linting
**EsLint**  
``yarn lint``
(config => eslintrc.js)

## Testing
**Jest**  
``yarn test``
(config => package.json)

## Commit Hooks
### Overcommit
todo

## Ruby Stuff, Windows, Mac, Archive
SSL_CERT_FILE (Rails)  
https://gist.github.com/fnichol/867550  
https://superdevresources.com/ssl-error-ruby-gems-windows/   

RAILS ENV  
https://gorails.com/setup/windows/10   

PRISTINE (GEM)
https://www.justinweiss.com/articles/3-quick-gem-tricks/  

DOKKU-CLI
https://github.com/dokku/dokku  
https://github.com/SebastianSzturo/dokku-cli  
dokku runs rails db:migrate
dokku ps           # List processes running in app container(s)  
dokku ps:rebuild   # Rebuild the app  
dokku ps:restart   # Restart the app container  
dokku ps:start     # Start the app container  
dokku ps:stop      # Stop the app container  