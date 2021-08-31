# Docker image
FROM node:14-alpine

# Working directory
WORKDIR /usr/src/app

# Copy everything
COPY package*.json ./

# Install app dependencies
RUN npm i --legacy-peer-deps

# Copy source
COPY . .

# Port
EXPOSE 3000

# Run
CMD ["npm", "run" ,"start"]
