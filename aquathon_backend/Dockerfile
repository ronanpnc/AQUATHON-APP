FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


COPY package.json pnpm-lock.yaml* ./app


# Install dependencies
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else echo "NO LOCKFILE FOUND" && exit 1; fi


# Copy the rest of the application code
COPY . .

# Build the application (if needed)
# RUN pnpm run build

# Expose the port the app runs on
EXPOSE 4000

# Compile
RUN pnpm build
# Define the command to run the app
CMD ["pnpm", "start"]
