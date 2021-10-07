FROM node:14.17.6-alpine3.11 AS development

ENV RUNNING_IN_DOCKER true

ENV CI=true
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN apk --no-cache add dumb-init curl git \
    && mkdir -p /home/node/app \
    # Only for development use
    # && apk -no-cache add zsh \
    # && sh -c "$(curl -fsSL https://starship.rs/install.sh)" -- --yes \
    # && mkdir -p /home/node/.antigen \
    # && curl -L git.io/antigen > /home/node/.antigen/antigen.zsh \
    # && touch /home/node/.zshrc \
    # && chown -R node:node /home/node/.zshrc /home/node/.antigen \
    && chown -R node:node /home/node/app 

# COPY .dockershell.sh /home/node/.zshrc

WORKDIR /home/node/app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

COPY --chown=node:node ./ .

USER node

# Only for development use. When in use, also remove the .dockershell.sh file in .dockerignore
# RUN rm -rf .dockershell.sh \
#     && /bin/zsh /home/node/.zshrc

CMD ["dumb-init", "npm", "start"]

FROM development AS builder

RUN npm run build

FROM nginx:1.21.3-alpine

WORKDIR /usr/share/nginx/html/

COPY --from=builder /home/node/app/build .