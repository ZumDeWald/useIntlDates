# intl-dates

Easily get useful date-related information in JavaScript (uses browser built-in Intl API).

### Description

This package exports both a Vanilla JavaScript function (`intlDates`) and a custom React hook (`useIntlDates`); each of which return an object (_dates_) containing commonly used, date-related data. Each can also be passed an [options object](#options) to further customize the way the date information comes back. <br />

### Sections:

1. [Installation](#installation)
2. [Documentation](#documentaton)
3. [Feature List](#feature-list)
4. [Why offer VanillaJS _and_ hook options?](#why-offer-vanillajs-and-hook-options)

## Installation

- This npm package can be installed by running `npm install intl-dates --save-dev` from your command line
- See [What is returned](https://github.com/ZumDeWald/intl-dates/date-info) for more info on what data is returned
- See the [Examples Documentation](https://github.com/ZumDeWald/intl-dates/examples) for usage details

## Documentaton
See the [extended documentation](https://github.com/ZumDeWald/intl-dates/wiki) for usage details and examples.

## Feature List

This list includes current and planned features. Check the issues page for a more exhaustive look at what features are being added and where they stand in the development process.

- [x] No dependencies, simply JavaScript code
- [x] This package offers a VanillaJS and custom React hook option
- [x] Options object accepts `locale` property to specify a locale/language for Intl to use
- [x] Options object will allow a `date` property to get back data based on a specific date instead of only from the current day.
- [x] Accounts for leap years when getting date information.
- [ ] Option to set which days start and end the week for _weekStartDate_ and _weekEndDate_ (defaults to Sunday - Saturday currently)

## Why offer VanillaJS and hook options?

The functionality in this package is very simple and could easily be exported only as a plain (vanilla) JavaScript function and be used in any project, including React. However, having the logic wired up as a custom React hook makes it conform more to React principles and best practices as it uses the `useState` and `useEffect` hooks internally, allowing the data to re-run only when needed (example: if you are dynamically feeding the options object and that information changes).
