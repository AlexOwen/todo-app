<!-- ## AWS Amplify Next.js (App Router) Starter Template

This repository provides a starter template for creating applications using Next.js (App Router) and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational Next.js application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file. -->

## Usage

- Install Node 18/20.
- `npm i`
- `npm run dev`

See: https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws

## Rationale

I have aimed for implementing the core functionality first, and to learn AWS Amplify and Next.js.

Styling is an afterthought here, but hopefully implemented enough to show I could do more.

## Issues Encountered

- Environment setup from scratch took ~2 hours - a GitHub workspace and base repo could probably help this in future.
- There is a bug in AWS Amplify's console which means a new `amplify_outputs.json` cannot be downloaded without clearing the browser cache. This is not documented, but I found the workaround eventually.
- The Figma design does not allow inspection (maybe it's a permissions issue?). The only export available was via unlabelled CSS. As a result, a lot of styling was guesswork.
- The Figma design is not labelled, so it was hard to tell which component in the list refers to which one in the design, meaning the CSS export was not too helpful either.
- There is no export in the Figma design, so I could not retrieve the icons or image. (Figma uses a canvas, so I couldn't manually export them either).
- I couldn't find my credit card to sign up for AWS for a day - having an account to use for recruitment would be useful.

## Timing

- The progress so far took a little over 9 hours, including learning about the required technologies and environment setup.

## TODO

### Styling

- Styling is very incomplete. Access to inspect on the Figma design would make a pixel perfect implementation possible.

### Accessibility

- Labels for form inputs
- Keyboard navigation

### Features

- Tags
- Search
- Styled/custom login
- Share
- File upload
- Testing
- Proper documentation

### Improvements

- More client side validation
- Use connected forms - instructions to get aws-cli installed for amplify did not work (gave up after 30 mins)
- Reduce the re-renders on updating a todo item
- The ThemeProvider is not compatible with server side rendering because it's sensitive to device preferences - this may or may not be a problem, but does mean SSR is not used much

## Bug Fixes

- Remove the unstyled flash before the theme is properly loaded
