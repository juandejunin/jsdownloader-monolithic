# Use the official Node.js image as a base image
FROM node:18

# Instalar ffmpeg y otras dependencias del sistema
RUN apt-get update && apt-get install -y ffmpeg

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]
