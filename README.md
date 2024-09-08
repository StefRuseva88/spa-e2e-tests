# Automated e2e testing of Single Page App with Playwright and QUnit
[![JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![QUnit](https://img.shields.io/badge/tested%20with-QUnit-9C4CB4.svg)](https://qunitjs.com/)
[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-6E40C9.svg)](https://playwright.dev/)

## This is a project for Front-End Technologies May 2024 Course @ SoftUni

## Table of Contents

- [Project Summary](#project-summary)
- [Setup Guide](#setup-guide)
- [Executing Tests](#executing-tests)
- [Functional Testing](#functional-testing)
- [Contributing](#Contributing)
- [License](#License)
- [Contact](#Contact)

## Project Summary

- Configure the project for testing.
- Develop integration tests.
- Execute and verify test results.
- Assess different functionalities within the SPA.

## Setup Guide

### 1. Prepare the Project for Testing

1. **Open Project:**
   - Launch the SPA project in Visual Studio Code.

2. **Organize Testing Files**
   - Create a `tests` folder.
   - Within `tests`, create `QUnit_tests` and `Playwright_tests` subfolders.

3. **Set Up Test Files:**
   - In `QUnit_tests`, create `test.html`.
   - Add `integration.test.js` in the same folder.

4. **Install "Live Server" Extension in VS Code for smooth test execution.**
   
5. **Install Playwright:**
   
   - Add Playwright to your project:
  
   ```
   npm install @playwright/test --save-dev
   ```
   
   - Install required browsers:
  
   ```
   npx playwright install
   ```

7. **Configure Playwright:**
- In your project’s root directory, create a `playwright.config.js` file and set up your testing environment.

7. **Start the App Server:**
- Ensure your server is active. Update `package.json` if necessary to include a "server" script and start it with:

```
npm run server
```

## Executing Tests

1. **Running QUnit Tests:**
   
- Open `test.html:` and right-click on `test.html` then select "Open with Live Server" to launch it in your browser. You should see the test interface displayed.

     
2. **Running Playwright Tests:**

- In the `Playwright_tests folder`, create a new file, e.g., `e2e.test.js`, and write your Playwright tests.
- Execute the tests using one of the following command:
          
```
npx playwright test/npm run test
```

- The results will be displayed in the terminal. You can also generate a report by running:
   
```
npx playwright show-report
```

## Functional Testing

### 1. **Game Functionality Tests**
   - Retrieve All Games: Test the API endpoint to fetch all games and validate the response.
   - Create Game: Test the creation of a new game and ensure it returns the correct response.
   - Get Game by ID: Confirm that fetching a game by its ID functions properly.
   - Edit Game: Test the update of an existing game and verify the changes.
   - Delete Game: Ensure the deletion of a game works as expected.
     
### 2. **Comment Functionality Tests**
   - Test a New Game with No Comments: Ensure that new games initially have no comments.
   - Post a New Comment: Test adding a new comment and verify the response.
   - Comments for a Specific Game: Check that comments for a specific game are correctly retrieved.
     
## Contributing
Contributions are welcome! If you have any improvements or bug fixes, feel free to open a pull request.

## License
This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or suggestions, please open an issue in the repository.

---
### Happy Testing! 🚀
