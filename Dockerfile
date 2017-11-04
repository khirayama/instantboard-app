FROM ubuntu:16.04
MAINTAINER khirayama
#
# # Install packages
# RUN apt-get -y update
# RUN apt-get -y upgrade
# RUN apt-get install -y git
#
# # Prepare nvm
# RUN git clone https://github.com/creationix/nvm.git /usr/share/nvm
# WORKDIR /usr/share/nvm
# RUN echo '. /usr/share/nvm/nvm.sh' >> /root/.bashrc
# ENV PATH=$PATH:/usr/share/nvm/current/bin
#
# RUN command -v nvm
#
# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.5.0

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN mkdir /usr/app

WORKDIR /usr/app

# Bundle app source
COPY . /usr/app

# Install app dependencies
EXPOSE  3000
CMD npm run build && npm start
