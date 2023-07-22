compose = docker compose

up:
	$(compose) stop && $(compose) -f docker-compose.dev.yml up --build -d --remove-orphans

ssh-api:
	$(compose) exec api sh

ssh-app:
	$(compose) exec app sh
