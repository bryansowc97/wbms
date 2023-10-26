FROM node:18
WORKDIR /app
COPY . .
EXPOSE 4200
# Specify the --max_old_space_size option when running your Node.js application
CMD ["node", "--max_old_space_size=1096", "app.js"]
RUN npm install
RUN npm run build --prod
