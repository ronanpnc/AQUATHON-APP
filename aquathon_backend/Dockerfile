FROM node:22.7-alpine3.19
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


COPY package.json pnpm-lock.yaml* ./app

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
# RUN pnpm run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["pnpm", "start"]
