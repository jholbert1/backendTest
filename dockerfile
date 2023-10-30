# Define la imagen base
FROM ubuntu:20.04

# Actualiza el sistema y establece el idioma
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV LANG C.UTF-8 

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# start app
#RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:dev && npm run seed:run && npm run start"]
