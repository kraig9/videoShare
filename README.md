# README

- If on Windows, run `git config --global core.autocrlf true` and then clone this repo
- Create file at `videoShare/.env`
- Define following environmental variables in the .env file:
  * `DB_USER_PASSWORD=<your_password>`
  * `DB_HOST=db`
- `docker-compose up -d --build` (It will take a couple minutes to finish spinning up)
- Navigate to `http://localhost:3000`
