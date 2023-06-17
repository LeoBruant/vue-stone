compose = docker compose

up:
	$(compose) -f docker-compose.dev.yml up --build -d

prod:
	$(compose) up --build -d

ssh-app:
	$(compose) exec app sh
