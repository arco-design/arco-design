# Use an official Node.js runtime as the base image
FROM node:16.20.2-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the scripts directory
COPY scripts ./scripts

# Copy the rest of the application code to the working directory
COPY . .

# Initialize the project
RUN yarn run init

# Set the default command to run when the container starts
CMD ["yarn", "start"]
