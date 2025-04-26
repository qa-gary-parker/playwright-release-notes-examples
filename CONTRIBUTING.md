# Contributing to Playwright Release Notes Examples

Thank you for your interest in contributing to this repository! This project aims to provide clear, working examples of new features in Playwright releases.

## How to Contribute

### Adding Examples for a New Playwright Version

1. Create a new directory named `vX.XX.X-examples` (replace X.XX.X with the actual version)
2. Add the following files:
   - `new-features.spec.ts` - Test examples demonstrating key features
   - `README.md` - Documentation of features demonstrated
   - `playwright.config.ts` - Configuration showcasing new options

### Improving Existing Examples

If you have write access to the repository:
1. Create a feature branch (`git checkout -b improve-v1.52-examples`)
2. Make your changes
3. Ensure tests pass (`npm test`)
4. Commit your changes (`git commit -am 'Improve v1.52 examples'`)
5. Push to the branch (`git push origin improve-v1.52-examples`)
6. Create a new Pull Request

If you don't have write access:
1. Fork the repository
2. Create a feature branch (`git checkout -b improve-v1.52-examples`)
3. Make your changes
4. Ensure tests pass (`npm test`)
5. Commit your changes (`git commit -am 'Improve v1.52 examples'`)
6. Push to the branch (`git push origin improve-v1.52-examples`)
7. Create a new Pull Request from your fork

## Code Style Guidelines

- Use clear, descriptive variable and function names
- Add detailed comments explaining each feature
- Include a comment with a reference to Playwright documentation when possible
- Structure tests to be self-contained and not depend on other tests

## Documentation Guidelines

- Begin each README with a clear version heading
- List features demonstrated with bullet points
- Link to official Playwright documentation for each feature
- Include code snippets for key usage examples

## Pull Request Process

1. Update the README.md with details of changes if appropriate
2. The version number will be updated based on the Playwright version being documented
3. Your PR requires approval from a maintainer before merging
4. Ensure your PR passes all GitHub Actions tests

## Creating Issues

When creating issues, please:

1. Use a clear and descriptive title
2. Provide steps to reproduce bugs
3. Include version information (Playwright, Node.js, etc.)
4. If suggesting a feature, explain why it would be useful

Thank you for contributing! 