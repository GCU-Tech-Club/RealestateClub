# REAL INSTRUCTIONS
Ensure docker desktop is running
Run the following command if you have changed dependencies (otherwise you can just use the already existing image):
`docker build -t YOUR_IMAGE_NAME_HERE .`
Run the following command to run the container from an already built image:
`docker run -p 8080:5001 --name YOUR_NEW_CONTAINER_NAME ALREADY_EXISTING_IMAGE_NAME_HERE`

# IGNORE BELOW INFO
## To run the docker container
docker-compose -f docker-compose.dev.yml up

Note that if you name the docker-compose file as docker-compose.yml , then the -f flag can be omitted when you want to start the container.

Similarly, to start the container in the production environment, run the following in the terminal:
$ docker-compose -f docker-compose.prod.yml up 
Suppose you make changes in your development environment that you’d want to reflect in the production container, you can rebuild the production image by appending a --build flag to the start command. For instance:
$ docker-compose -f docker-compose.prod.yml up --build


To view all images on your system, run:
$ docker images
To view the running instances, run:
$ docker ps
To stop the container, run:
$ docker-compose -f docker-compose.dev.yml down 

# After running the Deploy to Test Workflow:
You can visit this URL to see your changes on the server
http://ec2-3-101-123-79.us-west-1.compute.amazonaws.com:8080

# When a branch gets merged to main:
when your branches' changes get merged to main the prod.yml
workflow will run. When the workflow finishes your changes will reflect on
http://ec2-3-101-123-79.us-west-1.compute.amazonaws.com


# FIREBASE
to install the CLI tool use the following command (might require sudo if it fails)
`npm install -g firebase-tools`

now to run the firebase emulator so you can work with auth and firestore locally run
`firebase emulators:start`