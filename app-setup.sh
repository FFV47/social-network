#!/usr/bin/env bash

python manage.py makemigrations network
python manage.py migrate
python manage.py createsuperuser --no-input
exec "$@"
