FROM cypress/included:9.4.1
WORKDIR /e2e
COPY . /e2e

# Skip dev dependencies
RUN npm install --only=prod