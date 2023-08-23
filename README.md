<h1 align='center'>Don't Be Fooled - Price Tracker</h1>
<p align='center'>⚠️ THIS SOFTWARE IS STILL IN DEVELOPMENT ⚠️</p>

A pricetracker built with Electron, designed to provide a visual way to see historical prices on certain products.

## Idea
The project was built using Electron, React, Prisma with SQLite and Puppeteer. The software will be able to extract data dynamically from stores every X hours (24 hours now)

## Current State
The app is still under development - which means it still lacks a lot of features and will contain bugs. <br/>
**This repository does not contain the files responsible for scrapping yet**, which means you'll have to write it yourself using Puppeteer. You can create it inside **/src/services/puppeteer/stores** <br/>
In the future, and when more stores are supported, it will feature all the files.

❗ **The file name must be the same as the store name in URL, eg: amazon.com file must be 'amazon.ts'**

Also, don't forget to make all database manipulations using prisma (migrations and client generation):

```
- Open your terminal and type:
$ yarn prisma migrate dev

- Then:
$ yarn prisma generate
```

On build, database could also be messed up. There's still some work on making database able to run locally with SQLite, Prisma and Electron without the danger of losing data in updates. That's one of the reasons why the project is not available to be downloaded yet.


## OS
The application has been tested on Windows. It should work on other platforms, but has not been tested yet.

## Current Features
- Able to scrap data dynamically every 24 hours
- Interface shows a table with prices and comparisons
- Graphics to see infos about a specific product
- Can start scrap manually anytime user wants to

## Future updates
- Auto start on OS start
- Config menu (currently working on)
- Change scrapping intervals (24 hours to any interval)
- Add notification area support

## How to start

Do the DB setup,

```
- Open your terminal and type:
$ yarn prisma migrate dev

- Then:
$ yarn prisma generate
```
To start dev build:

```
$ yarn dev
```