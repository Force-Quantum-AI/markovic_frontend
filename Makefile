
# Git helpers
cm ?= Update code

git:
	git add .
	git status
	git commit -m "$(cm)"
	git log -1 --graph --oneline
	git push origin main