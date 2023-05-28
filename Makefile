compose = docker compose

up:
	$(compose) up --build -d

ssh-app:
	$(compose) exec app sh
