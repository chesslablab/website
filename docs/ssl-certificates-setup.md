# SSL Certificates Setup

The first thing you need to understand about setting up a ChesslaBlab website is that you have to create an SSL certificate to secure four different domain names at once.

- `chesslablab.org`
- `www.chesslablab.org`
- `api.chesslablab.org`
- `async.chesslablab.org`

The first two, `chesslablab.org` and `www.chesslablab.org`, will point to the web server in the [chesslablab/website](https://github.com/chesslablab/website) repo. Then, as its name implies, the `api.chesslablab.org` domain name will point to the REST-like API in the [chesslablab/chess-api](https://github.com/chesslablab/chess-api) repo and `async.chesslablab.org` to the asynchronous chess server in the [chesslablab/chess-server](https://github.com/chesslablab/chess-server) repo.

I managed to generate the certificates on an Ubuntu server using [Certbot](https://certbot.eff.org/) as it is described next.

```text
sudo certbot certonly --standalone
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Please enter the domain name(s) you would like on your certificate (comma and/or
space separated) (Enter 'c' to cancel): chesslablab.org www.chesslablab.org api.chesslablab.org async.chesslablab.org
Requesting a certificate for chesslablab.org and 3 more domains

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/chesslablab.org-0001/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/chesslablab.org-0001/privkey.pem
This certificate expires on 2024-04-23.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

The command above will generate two files, `fullchain.pem` and `privkey.pem`, that can now be installed in the repos mentioned above:

- chesslablab/website
- chesslablab/chess-api
- chesslablab/chess-server

It is worth saying that for this to function properly, Certbot's documentation recommends to have a working web site that can already be accessed using HTTP on port 80 for the certificates to be issued.
