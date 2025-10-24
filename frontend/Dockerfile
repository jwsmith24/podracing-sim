
# build stage
FROM node as build
WORKDIR /app
COPY . .
RUN yarn install && yarn build

# serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80