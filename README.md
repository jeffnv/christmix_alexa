# Christ Mix Radio Alexa Skill

Alexa skill for streaming Christ Mix Radio.

## Project Structure

- `skill-package/lambda/index.js` - Main skill code (deployed to Alexa Developer Console)
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
- `ask-resources.json` - ASK CLI configuration

## Setup

1. Set up GitHub Secrets:
   - `ASK_SKILL_ID` - Your Alexa skill ID (e.g., `amzn1.ask.skill.xxx`)
   - `ASK_REFRESH_TOKEN` - Get from `ask init` command (see below)
   - `AWS_ACCESS_KEY_ID` - AWS access key (can be dummy values if not using Lambda)
   - `AWS_SECRET_ACCESS_KEY` - AWS secret key (can be dummy values if not using Lambda)

2. Get your refresh token:
   npm install -g ask-cli
   ask init
      After authentication, copy the `refresh_token` from `~/.ask/cli_config` to GitHub Secrets.

## Deployment

Code is automatically deployed via GitHub Actions when pushing to `main`, or manually trigger from the Actions tab.

## Manual Deployment

To deploy manually using ASK CLI:

ask deploy --target codeOr use the Alexa Developer Console Code Editor and paste the contents of `skill-package/lambda/index.js`.

