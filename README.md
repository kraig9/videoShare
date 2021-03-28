# README

- If on Windows, run `git config --global core.autocrlf true` and then clone this repo
- If on Linux, run `chmod +x scripts/*`
- Create file at `videoShare/.env`
- Define following environmental variables in the .env file:
  * `DB_USER_PASSWORD=<your_password>`
  * `DB_HOST=db`
  * `RAILS_ENV=development`
  * `SECRET_KEY_BASE=<your_password>`
- `docker build . --build-arg precompileassets=not`
- `docker-compose up -d --build` (It will take a couple minutes to finish spinning up)
- Navigate to `http://localhost:3000`
