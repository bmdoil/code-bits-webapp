# services/server/project/tests/test_config.py


import os
import unittest

from flask import current_app
from flask_testing import TestCase
from project import create_app


app = create_app()

class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object('project.config.DevConfig')
        return app

    def test_app_is_development(self):
        self.assertEqual(
            app.config['SECRET_KEY'], os.environ.get('SECRET_KEY')
        )
        self.assertFalse(current_app is None)
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] ==
            os.environ.get('DATABASE_URL')
        )
        self.assertTrue(app.config['DEBUG_TOOLBAR'])
        self.assertTrue(app.config['TOKEN_EXPIRATION_DAYS'] == 5)
        self.assertTrue(app.config['TOKEN_EXPIRATION_SECONDS'] == 0)

class TestTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object('project.config.TestConfig')
        return app

    def test_app_is_testing(self):
        self.assertEqual(
            app.config['SECRET_KEY'], os.environ.get('SECRET_KEY')
        )
        self.assertTrue(app.config['TESTING'])
        self.assertFalse(app.config['PRESERVE_CONTEXT_ON_EXCEPTION'])
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] ==
            os.environ.get('DATABASE_TEST_URL')
        )
        self.assertFalse(app.config['DEBUG_TOOLBAR'])
        self.assertTrue(app.config['BCRYPT_LOG_ROUNDS'] == 4)
        self.assertTrue(app.config['TOKEN_EXPIRATION_DAYS'] == 0)
        self.assertTrue(app.config['TOKEN_EXPIRATION_SECONDS'] == 5)


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('project.config.ProdConfig')
        return app

    def test_app_is_production(self):
        self.assertEqual(
            app.config['SECRET_KEY'], os.environ.get('SECRET_KEY')
        )
        self.assertFalse(app.config['TESTING'])
        self.assertFalse(app.config['DEBUG_TOOLBAR'])
        self.assertTrue(app.config['BCRYPT_LOG_ROUNDS'] == 12)
        self.assertTrue(app.config['TOKEN_EXPIRATION_DAYS'] == 5)
        self.assertTrue(app.config['TOKEN_EXPIRATION_SECONDS'] == 0)


if __name__ == '__main__':
    unittest.main()