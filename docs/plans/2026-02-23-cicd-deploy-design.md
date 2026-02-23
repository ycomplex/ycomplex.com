# CI/CD Deploy Design: GitHub Actions + rsync over SSH

## Summary

Deploy the YComplex static website to a remote SSH host via rsync, triggered automatically on push to main.

## Decisions

- **Auth**: SSH key (Ed25519 deploy key, not password)
- **Trigger**: Push to main only
- **Transfer**: rsync over SSH (incremental, handles deletions)
- **Deploy path**: `/home/akshayr/www/ycomplex.com`

## Setup (one-time)

1. Generate a dedicated Ed25519 deploy key pair locally
2. Add the public key to `~/.ssh/authorized_keys` on the remote host for user `akshayr`
3. Store in GitHub repo secrets (`YComplex/ycomplex.com` > Settings > Secrets):
   - `DEPLOY_SSH_KEY` - private key contents
   - `DEPLOY_HOST` - server hostname or IP
   - `DEPLOY_USER` - `akshayr`
   - `DEPLOY_PATH` - `/home/akshayr/www/ycomplex.com`

## Workflow

File: `.github/workflows/deploy.yml`

- **Trigger**: `push` to `main` branch
- **Runner**: `ubuntu-latest`
- **Steps**:
  1. Checkout code
  2. Install SSH private key from `DEPLOY_SSH_KEY` secret into runner's `~/.ssh/deploy_key`
  3. Run `ssh-keyscan` to add remote host to `known_hosts`
  4. `rsync -avz --delete --exclude='.git/' --exclude='.github/' ./ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/`

No build step required — site is static HTML.
