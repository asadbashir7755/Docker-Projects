FROM openjdk:17-jdk-alpine

#create folder where app code will store
WORKDIR /app

# copy source code from host machine to container
COPY src/Main.java /app/Main.java

# compile java code before  execute
RUN javac Main.java

# run application
# can overwrite it
# CMD ["java","Main"] 

# can't overwrite it 
ENTRYPOINT [ "java","Main" ] 


