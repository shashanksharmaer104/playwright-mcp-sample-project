# playwright-mcp-sample-project

Playwright testing project with AI-assisted test generation using Playwright MCP server. Includes web UI and API tests following the Page Object Model pattern.

## Quick Start

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/web-women.spec.ts --headed

# View test report
npx playwright show-report
```

## Project Structure

```
tests/
├── pages/              # Page Object Model classes
├── api/                # API tests
└── *.spec.ts           # Test specifications
testcontexts/           # AI test generation guidance
playwright.config.ts    # Test configuration
CLAUDE.md              # Project guidelines for Claude Code
```

## Test Coverage

**Web UI Tests** (http://www.automationpractice.pl):
- Women's navigation and filtering
- Dresses page with subcategories
- Product search functionality

**API Tests** (https://fakestoreapi.com):
- Product endpoints with JSON Schema validation

## Technologies

- **Playwright**: ^1.56.1 - Test automation framework
- **Ajv**: ^8.17.1 - JSON Schema validation
- **Playwright MCP** - AI-assisted test generation

## Architecture

All web tests follow the **Page Object Model (POM)** pattern:
- Page classes encapsulate selectors and actions
- Test files contain only test scenarios and assertions
- CSS selectors for consistency
- Parallel execution for speed

## AI-Assisted Testing

Configured with Playwright MCP for interactive test generation. See `CLAUDE.md` for detailed guidelines on creating tests with AI assistance.
