FROM node:20

WORKDIR /application
COPY package.json yarn.lock tsconfig.json /application
RUN yarn --frozen-lockfile

COPY src /application/src
COPY public /application/public
EXPOSE 3000
ENV PORT=3000

# to run the container indefinitely 
# CMD tail -f /dev/null
CMD yarn run dev
