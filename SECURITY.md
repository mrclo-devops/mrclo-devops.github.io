# Security Policy

## Public portfolio repository

This repository is intentionally public. Only information intended for public professional use should be committed.

## Never commit

- Passwords, API keys, access tokens or session cookies.
- Two-factor authentication backup/recovery codes.
- Private keys, certificates containing private material, keystores or cloud credentials.
- `.env` files or local configuration containing credentials.
- Identity documents, financial records or other private personal documents.

If a credential or recovery code is accidentally committed, deletion in a later commit is not sufficient: revoke or regenerate it immediately and remove the sensitive material from Git history.

## Contact data

Professional contact information intentionally displayed by the portfolio should be reviewed periodically. Avoid publishing personal identifiers that are not necessary for recruiting or professional contact.
