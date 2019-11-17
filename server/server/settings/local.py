"""
Django settings for server project development.

"""

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES['default'] = {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(BASE_DIR, 'db.sqlite3')
}

CORS_ORIGIN_ALLOW_ALL = True