"""
Django settings for server project in produciton.

"""

from .base import *
# Configure Django App for Heroku.
import django_heroku
import dj_database_url

# SECURITY WARNING: don't run with debug turned on in production!


DEBUG = True

DATABASES['default'] = dj_database_url.config(conn_max_age=600)


django_heroku.settings(locals())
#del DATABASES['default']['OPTIONS']['sslmode']

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'