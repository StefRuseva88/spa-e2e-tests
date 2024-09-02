# Practical project: Automated e2e testing of Single Page App with Playwright and QUnit
[![JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![QUnit](https://img.shields.io/badge/tested%20with-QUnit-9C4CB4.svg)](https://qunitjs.com/)
[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-6E40C9.svg)](https://playwright.dev/)

## This is a project for Front-End Technologies May 2024 Course @ SoftUni

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Running Tests](#running-tests)
4. [Testing Functionalities](#testing-functionalities)
5. [Optimization](#optimization)
6. [Contributing](#Contributing)
7. [License](#License)
8. [Contact](#Contact)

## Project Overview

- Setting up project for testing.
- Writing integration tests.
- Running and verifying tests.
- Testing various functionalities of the SPA.

## Setup Instructions

### 1. Configure the Project for Testing

1. **Open Project:**
   - Open the SPA project in VS Code.

2. **Create Testing Folders:**
   - Create a folder named `tests`.
   - Inside `tests`, create two sub-folders: `QUnit_tests` and `Playwright_tests`.

3. **Create HTML and JS Files:**
   - In the `QUnit_tests` folder, create an HTML file named `test.html`.
   - Create a file named `integration.test.js` in the same folder.

4. **Install the "Live Server" extension in VS Code for easy test execution.**
   
5. **Install Playwright:**
   
   - Add Playwright to your project by running:
  
   ```
   npm install @playwright/test --save-dev
   ```
   
   - You can also install the necessary browsers with:
  
   ```
   npx playwright install
   ```

7. **Set Up Playwright Configuration:**
- In the root of your project, create a playwright.config.js file and configure it for your testing environment

7. **Start the Server:**
Ensure your app server is running. Update your `package.json` if needed to include the "server" script and start it with:

```
npm run server
```

## Running Tests

1. **Running QUnit Tests:**
   
i. Open `test.html:`

   - Right-click on `test.html` and select "Open with Live Server" to launch it in your browser.
     
ii. Check Initial Setup:

   - At this stage, you should see the test page.
     
3. **Running Playwright Tests:**
   
    i. Write Playwright Tests:

   - In the Playwright_tests folder, create a new file, e.g., `e2e.test.js`, and write your Playwright tests.
     
   ii. Run Playwright Tests:

   - Execute the tests using one of the following command:
          
```
npx playwright test/npm run test
```

   iii. View Test Results:

   - The results will be displayed in the terminal. You can also generate a report by running:
   
```
npx playwright show-report
```

## Testing Functionalities

### 1. **Test Game Functionality**
   - Get All Games: Test the API endpoint to retrieve all games and validate the response.
   - Create Game: Test creating a new game and ensure the response is as expected.
   - Get Game By Id: Verify that retrieving a game by ID works correctly.
   - Edit Game: Test editing an existing game and confirm the changes.
   - Delete Game: Ensure that deleting a game is handled correctly.
     
### 2. **Test Comment Functionality**
   - Test Newly Created Game with No Comments: Verify that new games have no comments initially.
   - Post New Comment: Test posting a new comment and check the response.
   - Comments For Specific Game: Verify comments for a specific game.

## Optimization

   - Refactor code to reuse variables and avoid redundancy.
   - Use dynamic values for test data to ensure tests are resilient and less dependent on hard-coded values.
   - Consider creating helper functions to simplify repetitive tasks.
     
## Contributing
Contributions are welcome! If you have any improvements or bug fixes, feel free to open a pull request.

## License
This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or suggestions, please open an issue in the repository.

### Happy Testing! 🚀
