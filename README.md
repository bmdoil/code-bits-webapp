##Grading Branch for CS493 Final Project

##Setup:

- Fork the repository: https://github.com/bmdoil/cs493-grading.git

- Clone it to your machine: git clone https://github.com/[yourusername]/bdoil-cs493-grading.git

- cd bdoil-cs493-grading

## To test the live routes

- app.brentdoil.com/swagger

## To test locally:

### Note: Locally the app uses ports 5005, 8888, and 3010. If you have conflicts with these ports, they can be changed in docker-compose.yml


- docker & docker-compose must be installed

- docker -v  

  Docker version 18.09.2, build 6247962

- docker-compose -v 

  docker-compose version 1.24.0, build 0aa59064

- export BASE_URL=http://localhost

- docker-compose up -d --build

- docker-compose exec server python manage.py recreate_db

- docker-compose exec server python manage.py add_test_data

- docker-compose exec server python manage.py test

##To test with Travis CI

- After forking the repository, sign up on travis-ci.org if you don't already have an account

- Navigate to the repo on travis: https://travis-ci.org/[yourusername]/bdoil-cs493-grading

- Click 'Activate Repository'

- Push the repo to initiate the tests 

