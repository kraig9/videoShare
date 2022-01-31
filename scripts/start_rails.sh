#! /bin/bash

rm -f tmp/pids/server.pid && \
  rails db:setup && \
  rails db:migrate && \
  bundle exec rails s -b 0.0.0.0
  # yarn install --check-files && \
