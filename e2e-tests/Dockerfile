FROM cypress/browsers:node16.14.0-slim-chrome99-ff97
WORKDIR /e2e
COPY . /e2e

# Skip dev dependencies
RUN npm install --only=prod

# Indicate CI environment
ENV CI=1
# Disable ASCII color codes in cypress output
ENV NO_COLOR=1
# Disable generating and storing cypress video
ENV CYPRESS_VIDEO=false 

CMD npx cypress run --browser chrome