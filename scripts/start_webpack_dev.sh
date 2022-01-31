#!/bin/bash

echo "starting webpack dev" && \
  export NODE_OPTIONS="--max_old_space_size=4096" && \
  yarn install --check-files && \
  rm -rf /opt/videoshare/public/packs && bin/webpack-dev-server --hot --inline
