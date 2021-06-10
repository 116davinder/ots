from node:16-alpine

RUN mkdir -p /app

WORKDIR /app

ADD package.json /app

# hack to run: npm start
# ref: https://github.com/facebook/create-react-app/issues/8688
ENV CI=true

RUN npm install

RUN npm install -g env-cmd serve

COPY . ./

EXPOSE 3000

ENV REACT_APP_OTS_BACKEND_URL=""
ENV REACT_APP_ENV="dev"

CMD sh /app/entrypoint.sh