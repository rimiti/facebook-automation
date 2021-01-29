# facebook-automation

[![Dependencies][prod-dependencies-badge]][prod-dependencies]
[![License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]

## Description

This repository provides a powerful way to post on your Facebook Page without using any API (based on Playwright). 

## Install

```bash
yarn add @rimiti/facebook-automation
```

## Example

```typescript
import { FacebookAutomation } from '@rimiti/facebook-automation';

const facebookAutomation: FacebookAutomation = new FacebookAutomation({
  credentials: {
    login: 'facebook@dimsolution.com',
    password: '$secr€t',
  },
  pageUrl: 'https://www.facebook.com/my-page-id',
  browserConfiguration: { // Optional
    headless: false, 
    args: ['--no-sandbox']
  } 
});

await facebookAutomation.post({
  text: 'Hello world',
  imagePath: './example.jpg',
});
```

## Default browser configuration

The below default browser configuration can be overridden through **browserConfiguration** constructor attribute.

```typescript
{
  headless: true,
  slowMo: 50,
}
```


### Limitation

- To avoid scrappers (not only), Facebook isn't using "id" elements. It's why some of elements are selected from "text content". Your Facebook account must be in English.


## Scripts

Run using yarn run `<script>` command.

    clean       - Remove temporarily folders.
    build       - Compile source files.
    build:watch - Interactive watch mode, compile sources on change.
    lint        - Lint source files.
    lint:fix    - Fix lint source files.
    test        - Runs all tests with coverage.
    test:watch  - Interactive watch mode, runs tests on change.

## License

GPL-3.0 © [Dimitri DO BAIRRO](https://www.dimsolution.com)

[prod-dependencies-badge]: https://david-dm.org/rimiti/facebook-automation/status.svg
[prod-dependencies]: https://david-dm.org/rimiti/facebook-automation
[license-badge]: https://img.shields.io/badge/license-GPL3-blue.svg?style=flat-square
[license]: https://github.com/rimiti/facebook-automation/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
