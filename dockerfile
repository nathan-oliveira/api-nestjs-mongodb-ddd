# FROM node:14.17.5-buster-slim
# EXPOSE 3000

# RUN useradd --user-group --create-home --shell /bin/false app
# RUN npm i -g npm@6.14.14

# ENV HOME=/home/app
# ENV TZ=America/Sao_Paulo

# ADD package.json  $HOME/webapp/
# RUN chown -R app:app $HOME/*

# USER app
# WORKDIR $HOME/webapp
# RUN npm i

# USER root
# ADD . $HOME/webapp
# RUN chown -R app:app $HOME/*
# USER app

# CMD ["npm", "start"]
