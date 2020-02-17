build:
	docker build -t mtg-quiz:latest .

save:
	docker save mtg-quiz:latest > mtg-quiz_save.tar
