FROM node:14.17.6-alpine3.11

ENV RUNNING_IN_DOCKER true

ENV CI=true

# default to port 80 for node, and 9229 and 9230 (tests) for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN apk --no-cache add dumb-init curl git \
    && mkdir -p /home/node/app \
    && chown -R node:node /home/node/app 

# Only for development use
# RUN apk add zsh \
#     && sh -c "$(curl -fsSL https://starship.rs/install.sh)" -- --yes \
#     && mkdir -p /home/node/.antigen \
#     && curl -L git.io/antigen > /home/node/.antigen/antigen.zsh \
#     && touch /home/node/.zshrc \
#     && chown -R node:node /home/node/.zshrc /home/node/.antigen
# COPY .dockershell.sh /home/node/.zshrc

WORKDIR /home/node/app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s \
    CMD node healthcheck.js

COPY --chown=node:node ./ .

USER node

# Only for development use. When in use, also remove .dockershell.sh from .dockerignore
# RUN rm -rf .dockershell.sh \
#     && /bin/zsh /home/node/.zshrc

CMD ["dumb-init", "node", "server.js"]