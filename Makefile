.PHONY: down build up restart setup install test lint format clean

ps:
	@docker ps

cps:
	@docker compose ps

logs:
	@echo "docker compose logs -f"
	@docker compose logs -f

down:
	@echo "docker compose down"
	@echo "Stopping all services..."
	@docker compose down

build:
	@echo "Building Docker markovic..."
	@docker compose up --build -d 


up:
	@docker compose up -d


push:
	@docker push anower77/markovic-frontend:latest

# Git helpers
cm ?= Update code

git:
	git add .
	git status
	git commit -m "$(cm)"
	git log -1 --graph --oneline
	git push origin main



cm_ahsan ?= Update code

git-ahsan:
	git	add .
	git status
	git	commit -m "$(cm_ahsan)"
	git log -1 --graph --oneline
	git push origin ahsan