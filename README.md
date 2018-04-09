# README2s

#### Requirements
- ruby 2.5
- rails 5.1
- yarn (brew install yarn)
- postgres
- redis (brew install redis)

#### Installation
1. database.yml_template umbenennen auf database.yml  
2. ``bundle install``
3. ``rails db:create``
4. ``rails db:migrate``
5. ``rails db:seed``
6. ``yarn``

**Install NPM packages**  
Yarn: ``yarn add <packagename>``  

## Start
1. ``bundle exec rails s`` (rails s)
2. ``ruby ./bin/webpack-dev-server`` (dev server)


## Linting
**EsLint**  
``yarn lint``
(config => eslintrc.js)

## Testing
**Jest**  
``yarn test``
(config => package.json)

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