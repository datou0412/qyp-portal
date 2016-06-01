#!/bin/sh
export NODE_ENV="production"
forever start -a -l forever.log -o out.log -e err.log bin/app.js
