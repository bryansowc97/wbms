FROM node:18
WORKDIR /app
ENV NODE_OPTIONS="--max_old_space_size=8192"
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build
EXPOSE 80
CMD ["ng", "serve", "--host", "0.0.0.0" , "--port", "80"]
