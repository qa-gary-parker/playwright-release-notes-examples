# Playwright Release Notes Examples

<div align="center">

![Playwright Logo](https://playwright.dev/img/playwright-logo.svg)

[![Playwright Tests](https://github.com/qa-gary-parker/playwright-release-notes-examples/actions/workflows/playwright.yml/badge.svg)](https://github.com/qa-gary-parker/playwright-release-notes-examples/actions/workflows/playwright.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![GitHub Stars](https://img.shields.io/github/stars/qa-gary-parker/playwright-release-notes-examples.svg)](https://github.com/qa-gary-parker/playwright-release-notes-examples/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/qa-gary-parker/playwright-release-notes-examples.svg)](https://github.com/qa-gary-parker/playwright-release-notes-examples/issues)

**A comprehensive demonstration of new features and improvements in [Playwright](https://playwright.dev) releases**

</div>

---

This repository provides working code examples for features introduced in each Playwright version, making it easier to:

1. ✨ Understand what's new in each release
2. 🔍 Learn how to use new features with practical examples
3. 🧪 Compare implementation approaches across versions
4. 🚀 Test and experiment with new APIs

## 📚 Project Structure

Each version has its own dedicated examples directory:

- [`v1.50.0-examples/`](./v1.50.0-examples/) - Test step timeout, conditional step skipping, accessibility improvements
- [`v1.51.0-examples/`](./v1.51.0-examples/) - IndexedDB storage, visibility filtering, contrast emulation 
- [`v1.52.0-examples/`](./v1.52.0-examples/) - Class assertions, enhanced aria snapshots, request options

Each directory contains:
- `new-features.spec.ts` - Practical test examples demonstrating the features
- `README.md` - Detailed explanation of the features with reference links
- `playwright.config.ts` - Configuration using version-specific options

## 📋 Feature Index by Version

| Version | Feature |
|---------|---------|
| v1.52.0 | `toContainClass()` assertion |
| v1.52.0 | Enhanced Aria snapshots with `/children` and `/url` |
| v1.52.0 | `maxRedirects` option in `apiRequest` |
| v1.52.0 | `ref` option in `locator.ariaSnapshot()` |
| v1.52.0 | Test annotations with `testResult.annotations` |
| v1.51.0 | IndexedDB storage |
| v1.51.0 | Visibility filtering |
| v1.51.0 | Contrast emulation |
| v1.50.0 | Test step timeout |
| v1.50.0 | Conditional step skipping |
| v1.50.0 | Accessibility improvements |

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/qa-gary-parker/playwright-release-notes-examples.git
   cd playwright-release-notes-examples
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install browsers:
   ```bash
   npx playwright install
   ```

### Running Examples

Use our convenient npm scripts to run examples for specific versions:

```bash
# Run v1.52.0 examples
npm run test:v1.52

# Run v1.51.0 examples
npm run test:v1.51

# Run v1.50.0 examples
npm run test:v1.50

# Run all examples
npm run test:all
```

## 🔄 Latest Updates

- Added examples for Playwright v1.52.0
- Implemented GitHub Actions for automated testing
- Improved documentation and organization
- Added v1.51.0 examples for IndexedDB storage

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to:

- Report bugs or request features
- Submit pull requests
- Add examples for new Playwright versions

## 🌟 Related Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Release Notes](https://playwright.dev/docs/release-notes)
- [Playwright Community Discord](https://playwright.dev/community/welcome)

## 💖 Sponsors and Support

If you find this project helpful, consider:

- ⭐ Starring the repository on GitHub
- 🐦 Sharing on social media
- 💻 Contributing examples or improvements

---

<div align="center">

**Created and maintained as part of the Playwright community.**  
*Not officially affiliated with Microsoft or the Playwright team.*

</div> 