# Step 1: Use the Node.js image to install dependencies and build the app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Step 2: Use an Nginx server to serve the app
FROM nginx:alpine

# Copy build files to Nginx's default directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
