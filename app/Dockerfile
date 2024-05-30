# Use the latest LTS version of node
FROM node:lts

RUN apt -y update && apt -y upgrade

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (or package-lock.json if you're using npm) to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your application code
COPY . ./

# Expose the port your app runs on
ARG APP_PORT
EXPOSE ${APP_PORT}

# Command to run your app using ts-node
CMD ["pnpm", "run", "dev", "--", "--host"]
