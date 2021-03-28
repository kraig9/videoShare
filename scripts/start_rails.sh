#! /bin/bash

rm -f tmp/pids/server.pid && \
  yarn install --check-files && \
  rails db:setup && \
  rails db:migrate && \
  bundle exec rails s -b 0.0.0.0
