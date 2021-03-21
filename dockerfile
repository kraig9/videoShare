FROM ruby:2.6.6-slim
ARG precompileassets

RUN apt-get update && apt-get install -y wget gnupg

RUN apt-get update && \
      apt-get install -y \
        build-essential \
        vim \
        git-all \
        curl \
        ssh \
      wget -qO- https://deb.nodesource.com/setup_12.x  | bash - && \
      apt-get install -y nodejs && \
      wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
      echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
      apt-get update && \
      apt-get install yarn && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install bundler -v 2.1.4
#Install gems
RUN mkdir /gems
WORKDIR /gems
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle config build.nokogiri --use-system-libraries
RUN apt-get update && apt-get install -y gcc ruby-dev pkg-config make libxml2-dev libxslt1-dev zlib1g-dev g++ libsqlite3-dev
RUN bundle install
RUN yarn install --check-files

ARG INSTALL_PATH=/opt/videoShare
ENV INSTALL_PATH $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . .

# RUN scripts/potential_asset_precompile.sh $precompileassets