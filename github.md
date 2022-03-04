How to upload documents to github?

> eval "$(ssh-agent -s)"
> ssh-add ~/.ssh/againTestKey

> git push origin main

> error non-fast-forward

> solution

> git pull --rebase origin main
> git push origin main
