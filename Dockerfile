# Step 1: Use the official Node.js image as the base image
FROM node:18 AS base

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) for dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the source code into the container
COPY . .

# Step 6: Build TypeScript code (if using TypeScript)
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 3000

# Step 8: Command to run the app (using ts-node or after building it to JavaScript)
CMD ["npm", "start"]