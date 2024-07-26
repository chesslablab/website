# SSL Certificate Setup

Some familiarity with Public Key Infrastructure (PKI) is recommended in order to follow this section.

The first thing you need to understand about setting up a ChesslaBlab website is that you have to create an SSL certificate to secure four different domain names at once.

- `chesslablab.org`
- `www.chesslablab.org`
- `api.chesslablab.org`
- `async.chesslablab.org`

The first two, `chesslablab.org` and `www.chesslablab.org`, will point to the [website](https://github.com/chesslablab/website). The `api.chesslablab.org` domain name will point to the [REST-like API](https://github.com/chesslablab/chess-api) and `async.chesslablab.org` to the [asynchronous chess server](https://github.com/chesslablab/chess-server).

Probably the easiest thing to do is purchase a wildcard certificate from a Certificate Authority (CA) however you may want to consider to get your free certificates using [Certbot](https://certbot.eff.org/) instead. Be that as it may, keep in mind that before any CA can issue an SSL certificate, a validation process is required to verify that it can be sent to the Certificate Signing Request (CSR) requester.

This is typically achieved through one of the following methods.

- Email Validation — a validation email is sent to the certificate requester.

- HTTP Validation — the certificate requester is asked to upload a validation file at their host.

- DNS Validation — the certificate requester sets up a CNAME record in the domain's DNS zone for further validation.

I used Certbot to automatically get a free HTTPS certificate. Since the ChesslaBlab website is running on an Ubuntu server, the certificate was validated through DNS as it is described next.

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

The command above generated two files, `fullchain.pem` and `privkey.pem`, that then were installed in the repos mentioned above:

- chesslablab/website
- chesslablab/chess-api
- chesslablab/chess-server

It is worth saying that for this to function properly, Certbot's documentation recommends to have a working web site that can already be accessed using HTTP on port 80.

## Self-Signed Wildcard SSL Certificate with OpenSSL

If issuing a wildcard certificate with DNS validation sounds too complicated to you, OpenSSL might be an alternate solution for the development environment. You may want to create a self-signed multi-domain SSL certificate using OpenSSL.

```text
openssl genrsa -aes256 -passout pass:foobar -out chesslablab.org.pem 2048
openssl req -passin pass:foobar -new -sha256 -key chesslablab.org.pem -subj "/C=US/ST=CA/O=ChesslaBlab, Inc./CN=chesslablab.org" -reqexts SAN -config <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:*.mydomain.org")) -out chesslablab.org.csr
openssl x509 -passin pass:foobar -req -days 365 -in chesslablab.org.csr -signkey chesslablab.org.pem -out chesslablab.org.crt
openssl rsa -passin pass:foobar -in chesslablab.org.pem -out chesslablab.org.key
```

The command above will generate four files:

- chesslablab.org.crt
- chesslablab.org.csr
- chesslablab.org.key
- chesslablab.org.pem

Then, `chesslablab.org.crt` and `chesslablab.org.key` must be renamed in order to match both the certificate and the key filename created by Certbot. As noted before, it is assumed that Certbot is used to automatically generate the HTTPS certificate so all repositories are configured to read these two files on startup.

```text
mv chesslablab.org.crt fullchain.pem
```

```text
mv chesslablab.org.key privkey.pem
```

With the pieces of the puzzle in place, which is to say, the web server, the REST-like API and the asynchronous chess server, it is of vital importance to add the chess server's self-signed certificate as trusted to your browser.

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/ssl-certificate-setup_01.png)

**Figure 1**. Make the browser trust the chess server's self-signed certificate.

If skipping this step, the web browser won't be able to connect to the chess server. The latter will complain with an SSL handshake error.

```text
SSL handshake error: stream_socket_enable_crypto(): SSL operation failed with code 1. OpenSSL Error messages:
error:14094416:SSL routines:ssl3_read_bytes:sslv3 alert certificate unknown
```

And the web browser will throw an error accordingly.

```text
WebSocket connection to 'wss://async.chesslablab.org:8443/' failed
```

![Figure 2](https://raw.githubusercontent.com/chesslablab/website/main/docs/ssl-certificate-setup_02.png)

**Figure 2**. WebSocket connection to 'wss://async.chesslablab.org:8443/' failed.

The exact same thing goes for the REST-like API: Its self-signed certificate needs to be added as trusted to your browser.

![Figure 3](https://raw.githubusercontent.com/chesslablab/website/main/docs/ssl-certificate-setup_03.png)

**Figure 3**. Make the browser trust the API's self-signed certificate.

If skipping this step, the web browser won't be able to connect to the chess API. The latter will complain with an `ERR_CERT_AUTHORITY_INVALID` error.

```text
GET https://api.chesslablab.org/v1/annotations/games net::ERR_CERT_AUTHORITY_INVALID
```

![Figure 4](https://raw.githubusercontent.com/chesslablab/website/main/docs/ssl-certificate-setup_04.png)

**Figure 4**. The browser doesn't recognize the API's certificate.

### Conclusion

In order to run a ChesslaBlab website, a wildcard SSL certificate needs to be issued and installed in the following repos:

- chesslablab/website
- chesslablab/chess-api
- chesslablab/chess-server

[Certbot](https://certbot.eff.org/) can be used to automatically get a free HTTPS certificate, however, if this still sounds too complicated, OpenSSL might be an alternate solution for the development environment.
