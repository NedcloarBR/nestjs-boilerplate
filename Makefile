.PHONY: *

install:
	@yarn install

setup:
	@$(MAKE) install

build:
	@yarn build

start:
	@$(MAKE) setup
	@yarn start:prod

start-dev:
	@$(MAKE) setup
	@yarn start:dev

start-prod:
	@$(MAKE) setup
	@$(MAKE) build
	@yarn start:prod
