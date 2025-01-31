# For running the environment on your local do the following commands
`firebase emulators:start --import firebaseTestData`
now in another terminal
`npm run dev`

# After running the Deploy to Test Workflow:
You can visit this URL to see your changes on the server
http://ec2-54-215-43-213.us-west-1.compute.amazonaws.com:8080

# When a branch gets merged to main:
when your branches' changes get merged to main the prod.yml
workflow will run. When the workflow finishes your changes will reflect on
http://ec2-54-215-43-213.us-west-1.compute.amazonaws.com

# Postman Documentation
View the documentation for the api routes [here](https://documenter.getpostman.com/view/38599522/2sAYX2NjNr)


# FIREBASE
to install the CLI tool use the following command (might require sudo if it fails)
`npm install -g firebase-tools`

now to run the firebase emulator so you can work with auth and firestore locally run
`firebase emulators:start --import firebaseTestData`


## Authentication Emulator
usernames are first_last_{number} (ex. joe_smith_32)\
emails are email{number}@example.com (ex. email32@example.com)\
passwords are password{number} (ex. password32)

*numbers range from 1-51* \
*each users uid has a matching auth uid*


# DOCKER INSTRUCTIONS (will not work if you do not have firebase-sak key)
Ensure docker desktop is running
Run the following command if you have changed dependencies (otherwise you can just use the already existing image):
`docker build -t YOUR_IMAGE_NAME_HERE .`
Run the following command to run the container from an already built image:
`docker run -p 8080:5001 --name YOUR_NEW_CONTAINER_NAME ALREADY_EXISTING_IMAGE_NAME_HERE`