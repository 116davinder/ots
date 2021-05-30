from node:16-alpine

RUN mkdir -p /app

WORKDIR /app

ADD package.json /app

# hack to run: npm start
# ref: https://github.com/facebook/create-react-app/issues/8688
ENV CI=true

RUN npm install

COPY . ./

EXPOSE 3000

ENV REACT_APP_OTS_BACKEND_URL=""

CMD ["npm", "start"]