[![Build Status](https://travis-ci.org/bmdoil/code-bites.svg?branch=master)](https://travis-ci.org/bmdoil/code-bites)

Grading Branch for CS493 Final Project

Setup:

- Fork the repo

- Clone it down to your machine: git clone https://github.com/[yourusername]/code-bites.git

- cd code-bites

- git checkout grading

To test locally:

- docker-compose up -d --build

- docker-compose exec server python manage.py recreate_db

- docker-compose exec server python manage.py add_test_data

- docker-compose exec server python manage.py test

To test with Travis CI

