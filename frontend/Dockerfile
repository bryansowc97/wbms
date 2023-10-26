FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Specify the --max_old_space_size option when running your Node.js application
EXPOSE 4200
CMD ["npm", "start"]
