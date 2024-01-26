# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /jwt-auth-system-frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Set the command to start the React app
CMD [ "npm", "start" ]