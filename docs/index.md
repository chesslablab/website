# Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Chess developers and business owners can now run their own open-source chess platform more easily than ever before because the ChesslaBlab website is super-duper simple to install and set up. To give you an idea of its simplicity, the Website's [assets/js](https://github.com/chesslablab/website/tree/main/assets/js) folder contains less than 3,000 lines of JavaScript code.

```text
cloc assets/js
      80 text files.
      80 unique files.                              
       0 files ignored.

github.com/AlDanial/cloc v 1.90  T=0.05 s (1474.8 files/s, 59028.2 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      80            311             33           2858
-------------------------------------------------------------------------------
SUM:                            80            311             33           2858
-------------------------------------------------------------------------------
```

This is made possible with object-oriented programming (OOP) using [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps). Now you can get rid of libraries and frameworks like React, Vue, Next.js, as well as transpilers, bundlers and so on. The ChesslaBlab website is written using OOP and the DOM.

## Environment Setup

### Development

The following repositories are required to run a complete chess platform in a local development environment:

- [Chess Data](https://github.com/chesslablab/chess-data)
- [PHP Chess Server](https://github.com/chesslablab/chess-server)
- [Website](https://github.com/chesslablab/website)

Remember to add your PHP Chess Server host name to the `assets/env.js` file of your website.

### Decentralized

With decentralized chess (DeChess) a complete chess platform can be run using one ChesslaBlab repository only:

- [Website](https://github.com/chesslablab/website)

Make sure to add at least a PHP Chess Server host name from the [ChesslaBlab Node List](https://github.com/chesslablab#node-list) to the `assets/env.js` file of your website.

## SSL Certificate Setup

Some familiarity with Public Key Infrastructure (PKI) is recommended in order to follow this section.

### Development Environment

The first thing you need to understand about setting up a ChesslaBlab website in a local development environment is that you have to create an SSL certificate to secure three different domain names at once.

- `chesslablab.org`
- `www.chesslablab.org`
- `async.chesslablab.org`

This is because nowadays, major browsers want all traffic to be secure, and as a web developer you want the development environment to mimic production as much as possible.

The first two domain names, `chesslablab.org` and `www.chesslablab.org`, will point to the IP of the [website](https://github.com/chesslablab/website). When it comes to websites, it is a common practice to create a domain alias that redirects to the primary domain. Hence the two domain names for the website, one starting with www. The `async.chesslablab.org` to the IP of the [asynchronous chess server](https://github.com/chesslablab/chess-server).

### Decentralized Environment

In a decentralized environment only two domain names need to be secured.

- `chesslablab.org`
- `www.chesslablab.org`

Use custom domain names to configure yours whether you are a chess club, a school, or a FIDE titled player.

- `yourchessclub.com`
- `www.yourchessclub.com`

### Free SSL Certificate with Certbot

Probably the easiest way to proceed is to purchase a wildcard certificate from a Certificate Authority (CA) however you may want to consider to get your free certificate using [Certbot](https://certbot.eff.org/) instead. Be that as it may, keep in mind that before any CA can issue an SSL certificate, a validation process is required to verify that it can be sent to the Certificate Signing Request (CSR) requester.

This is typically achieved through one of the following methods.

- Email Validation — a validation email is sent to the certificate requester.

- HTTP Validation — the certificate requester is asked to upload a validation file at their host.

- DNS Validation — the certificate requester sets up a CNAME record in the domain's DNS zone for further validation.

I used Certbot to automatically get a free HTTPS certificate. Since the ChesslaBlab website is running on an Ubuntu server, the certificate was validated through DNS as it is described next.

```text
sudo certbot certonly --standalone
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Please enter the domain name(s) you would like on your certificate (comma and/or
space separated) (Enter 'c' to cancel): chesslablab.org www.chesslablab.org async.chesslablab.org
Requesting a certificate for chesslablab.org and 2 more domains

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

The certbot command generated two files, `fullchain.pem` and `privkey.pem`, that then were installed in each of the repos listed above:

- chesslablab/website
- chesslablab/chess-server

It is worth saying that for this to function properly, Certbot's documentation recommends to have a working web site that can already be accessed using HTTP on port 80.

### Self-Signed SSL Certificate with OpenSSL

If issuing a certificate with DNS validation sounds too complicated to you, OpenSSL might be an alternate solution for the development environment. You may want to create a self-signed multi-domain SSL certificate using OpenSSL.

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

At this point, it is of vital importance to add the chess server's self-signed certificate as trusted to your browser.

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/index_01.png)

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

![Figure 2](https://raw.githubusercontent.com/chesslablab/website/main/docs/index_02.png)

**Figure 2**. WebSocket connection to 'wss://async.chesslablab.org:8443/' failed.

### Conclusion

In order to set up a local development environment, three different domain names need to be secured at once. The SSL certificate is to be installed in each of the following repositories.

- chesslablab/website
- chesslablab/chess-server

In a decentralized environment only two domain names need to be secured. The SSL certificate is to be installed in the following repository.

- chesslablab/website

[Certbot](https://certbot.eff.org/) can be used to automatically get a free HTTPS certificate, however, if this still sounds too complicated, OpenSSL might be an alternate solution for the development environment.
