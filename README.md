## Grading Branch for CS493 Final Project

## Setup:

- Clone it to your machine: git clone https://github.com/bmdoil/bdoil-cs493-grading-final.git

- cd bdoil-cs493-grading-final

## To test the live routes

- [Navigate to my API documentation](http://app.brentdoil.com/swagger)

## To test locally:

### Note: Locally the app uses ports 5005, 8888, and 3010. If you have conflicts with these ports, they can be changed in docker-compose.yml


- docker & docker-compose must be installed

- docker -v  && docker-compose -v

- export BASE_URL=http://localhost

- docker-compose up -d --build

- docker-compose exec server python manage.py recreate_db

- docker-compose exec server python manage.py add_test_data

- docker-compose exec server python manage.py test

##To test with Travis CI

- Fork or clone the repo, then sign up on travis-ci.org if you don't already have an account

- Navigate to the repo on travis: https://travis-ci.org/[yourusername]/bdoil-cs493-grading-final

- Click 'Activate Repository'

- Push the repo to initiate the tests 

