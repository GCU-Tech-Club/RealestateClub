# To run the docker container
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



