#!/usr/bin/env bash

# Bash "strict mode", to help catch problems and bugs in the shell
# script. Every bash script you write should include this. See
# http://redsymbol.net/articles/unofficial-bash-strict-mode/ for
# details.
set -euo pipefail

# Tell apt-get we're never going to be able to give manual
# feedback:
export DEBIAN_FRONTEND=noninteractive
export POETRY_HOME=/opt/poetry

# Update the package listing, so we know what package exist:
apt-get update

# Install security updates:
apt-get -y upgrade

# Install a new package, without unnecessary recommended packages:
apt-get -y install --no-install-recommends curl libmagic1
# Install Poetry
curl -sSL https://install.python-poetry.org | python3 -
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Delete cached files we don't need anymore (note that if you're
# using official Docker images for Debian or Ubuntu, this happens
# automatically, you don't need to do it yourself):
apt-get clean

# Delete index files we don't need anymore:
rm -rf /var/lib/apt/lists/*
