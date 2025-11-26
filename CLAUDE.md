# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Playwright testing project configured for AI-assisted test generation using the Playwright MCP (Model Context Protocol) server. The project includes both web UI tests and API tests, following the Page Object Model pattern for maintainability.

## Common Commands

### Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/web-dresses.spec.ts
npx playwright test tests/api/fakestore.spec.ts

# Run tests in a specific folder
npx playwright test tests/api/

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests with specific browser
npx playwright test --project=chromium

# Show test report
npx playwright show-report
```

### Development

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Architecture

### Test Organization

The project is organized into two main test types:

- **Web UI Tests** (`/tests/`): Tests for web applications using Page Object Model pattern
- **API Tests** (`/tests/api/`): REST API tests with JSON Schema validation

### Page Object Model Pattern

All web UI tests follow the Page Object Model (POM) pattern. Each page class:

1. Receives a `Page` instance via constructor injection
2. Defines selectors as `readonly` class properties (preferably CSS selectors)
3. Encapsulates user actions as `async` methods
4. Returns data (strings, numbers, booleans) for assertions in test files
5. Uses `page.locator()` for element location

Example structure:
```typescript
export class ExamplePage {
  readonly page: Page;
  readonly buttonSelector = 'a[title="Example"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://example.com');
  }

  async clickButton() {
    await this.page.click(this.buttonSelector);
  }
}
```

### Test Structure

Web tests should:
- Use `test.describe()` blocks for grouping related scenarios
- Create POM instances at the start of each test
- Use `await page.waitForLoadState('networkidle')` after navigation actions
- Perform assertions in the test file, not in POM methods

API tests should:
- Use Playwright's `request` fixture
- Validate status codes, response bodies, and JSON schemas
- Use Ajv library for JSON Schema validation
- Include console logging for debugging

## Playwright Configuration

Key configuration settings (`playwright.config.ts`):

- **Test Directory**: `./tests`
- **Parallelization**: `fullyParallel: true` (runs tests in parallel locally)
- **CI Behavior**: 2 retries, single worker (sequential execution)
- **Local Behavior**: 0 retries, multiple workers (parallel execution)
- **Browser**: Currently Chromium only (Firefox/Safari commented out)
- **Reporter**: HTML reporter
- **Trace**: Collected on first retry for debugging

## AI-Assisted Test Generation with Playwright MCP

This project is configured for AI-assisted test generation via Playwright MCP (`.vscode/mcp.json`).

### Web Test Generation Guidelines (`testcontexts/webtestcontext.txt`)

When generating web UI tests:
1. Use Playwright MCP tools to inspect page elements interactively
2. Run steps one-by-one using MCP tools (do not generate code based on scenario alone)
3. Always use POM approach - create page object classes in `/tests/pages/`
4. Use Playwright's first locator recommendations for best practices
5. Save generated test files in `/tests/` directory
6. Execute the test and iterate until it passes

### API Test Generation Guidelines (`testcontexts/apitestcontext.text`)

When generating API tests:
1. Use Playwright's `request` context
2. Validate status code, response body, and schema
3. Use async/await syntax
4. Include debugging logs with `console.log()`
5. Save test files in `/tests/api/` directory
6. Do not generate test code until all steps are fully explored and validated

## Test Target Sites

- **Web Tests**: http://www.automationpractice.pl
- **API Tests**: https://fakestoreapi.com

## Dependencies

- `@playwright/test`: ^1.56.1 - Core Playwright testing framework
- `@types/node`: ^24.10.1 - TypeScript support for Node.js
- `ajv`: ^8.17.1 - JSON Schema validator for API response validation

## Important Notes

1. **Always Read Before Modifying**: When fixing tests or updating page objects, always read the existing files first to understand current implementation patterns.

2. **Selector Strategy**: Prefer CSS selectors for consistency across the codebase. Use `page.getByRole()` only when semantically appropriate.

3. **Waits and Synchronization**: Use `page.waitForLoadState('networkidle')` after navigation to ensure page is fully loaded before assertions.

4. **Test Isolation**: Each test should be independent and not rely on state from other tests.

5. **Module System**: This project uses CommonJS (`"type": "commonjs"` in package.json), not ES modules.
