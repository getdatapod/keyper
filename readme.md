# Keyper

<p align="center">
Keyper is a desktop application that enables users to connect third party apps with their online data in a secure and auditable manner.

![Landing page](https://i.imgur.com/UhneZZg.png)

</p>
<p align="center">

<a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat"></a>

</p>

## About Keyper

Keyper enables end-users to connect third party apps with their online data

- with the ability to audit each data request &
- without handing over their data keys to these apps

Keyper enables developers to build privacy conscious data apps without the security overhead of maintaining user keys.

## How to Use Keyper?

1. Download, install and run Keyper on your machine
2. Add your data access credentials to Keyper
3. Use a third party application that supports Keyper

For the Beta

- we support GitHub as a personal data source
- & we have GitJam - a sample third party application to try out Keyper with

TODO : Add Links

---

### Keyper is Beta

Keyper is Beta software, right now. This software is provided on 'as is' and 'as available' bases. We don't give any warranties, whether express or implied, as to the suitability or usability of this application.

- Users are encouraged to audit the codebase for any security and stability issues
- For a bug or a feature request, kindly post in the Discussions Tab
- Please refer to the list of known security issues

---

## Developer Notes

#### Coming Soon

- Running Keyper From Source
- Connecting your applications with Keyper

---

## Code Structure and Layout

### Stack Notes and Choices

The backend is written in Node.js with Express.js as the server framework and NEDB as a lightweight database. Electron is used to build the system tray application.

The frontend is build with React.js.

### Code Layout

- Backend Code

```
├── assets                    -- Assets for Electron application
├── controllers               -- Handling Express.js requests
├── db                        -- Database utilities
├── public                    -- Directory for serving static assets
├── routes                    -- Functions for handling Express.js routes
├── server.js                 -- Express.js server instantiation
├── src                       -- Directory for frontend code
├── main.js
├── package.json
├── package-lock.json
├── README.md

```

- Frontend Code

```
src
├── App.js                    -- Starting point for the app
├── assets                    -- Static assets
├── components                -- Contains React.js components
│   ├── pages                 -- Page components
└── styles                    -- Global stylings
├── index.css
├── index.js
```

---

### License

See [LICENSE.MD](LICENSE.MD)

## Contributors

- Hritique Rungta [@hritique](https://github.com/hritique)
- Prakriti Malik [@prakritimalik](https://github.com/prakritimalik)
- Rishi Raj Sidhu [@rishisidhu](https://github.com/rishisidhu)
- Ankit Malik [@malikankit](https://github.com/malikankit)

How To Contribute?

- Have a feature request?
- Found a bug?
- Want to contribute via code or design?

Kick off a discussion in the Discussions Tab and let's take it from there :)
