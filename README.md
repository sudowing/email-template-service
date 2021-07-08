# email-template-service

MJML

MJML rendering as a service

VC storage or templates




# <a id="run_via_node"></a>Run via Node

```sh
# install dependencies
npm i

# start app
npm run start
```

The service should now be available:
 - http://localhost:8080/healthz


# <a id="docker_image"></a>Docker Image Publishing

The steps below are not unique to this project -- but I often have to lookup the steps -- so I'll document them here for convenience.

```sh
# build docker container
docker build -t sudowing/email-template-service:develop -f Dockerfile .

# tag & push latest
docker tag sudowing/email-template-service:develop sudowing/email-template-service:latest
docker push sudowing/email-template-service:latest

# tag & push v1.3.0
docker tag sudowing/email-template-service:develop sudowing/email-template-service:1.3.0
docker tag sudowing/email-template-service:develop sudowing/email-template-service:1.3
docker tag sudowing/email-template-service:develop sudowing/email-template-service:1
docker push sudowing/email-template-service:1.3.0
docker push sudowing/email-template-service:1.3
docker push sudowing/email-template-service:1
```

# <a id="run_via_docker"></a>Run via Docker

```sh
docker run \
	--rm \
	-p 8080:8080 \
	--name myservice \
	sudowing/email-template-service:develop
```

# <a id="versioning"></a>Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available, see the [tags on this repository](https://github.com/sudowing/email-template-service-docker/tags). 

# <a id="license"></a>License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details