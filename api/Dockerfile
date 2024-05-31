# Use the latest LTS version of node
FROM node:lts

RUN apt -y update && apt -y upgrade

RUN apt-get -y install libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (or package-lock.json if you're using npm) to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your application code
#COPY . . # handled through "volumes" in docker-compose

# Expose the port your app runs on
ARG API_PORT
EXPOSE ${API_PORT}

# Command to run your app using ts-node
CMD ["pnpm", "run", "dev"]
