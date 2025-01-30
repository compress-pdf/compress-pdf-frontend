import {
  INVALID_FILE_TYPE,
  PASSWORD_PROTECTED_FILE,
} from '@/constants/messages/constants';

describe('Hero Section E2E Tests', () => {
  // Ensure the site is visited before each test
  beforeEach(() => {
    cy.viewport(1920, 1080); // Set the viewport size to desktop
    cy.visit('/'); // Adjust the URL to the correct location of your app
  });

  describe('File Upload and Validation Tests', () => {
    describe('File Upload Functionality', () => {
      it('Uploads a valid PDF', () => {
        // Upload a valid PDF file
        cy.get('#file-upload').selectFile('cypress/fixtures/generic.pdf', {
          force: true,
        });

        // Ensure no error toast is displayed for a valid PDF
        cy.get('.toast-message').should('not.exist');
      });

      it('Tries to upload a non-PDF file', () => {
        // Try uploading a non-PDF file
        cy.get('#file-upload').selectFile('cypress/fixtures/non-pdf-file.txt', {
          force: true,
        });

        // Check for the toast indicating that only PDFs are allowed
        cy.get('.toast-message').should('contain.text', INVALID_FILE_TYPE);
      });

      it('Tries to upload a corrupted PDF', () => {
        // Try uploading a corrupted PDF file
        cy.get('#file-upload').selectFile('cypress/fixtures/corrupted.pdf', {
          force: true,
        });

        // Check for the toast indicating the PDF is corrupted
        cy.get('.toast-message').should(
          'contain.text',
          'Corrupted PDFs cannot be compressed.'
        );
      });

      it('Tries to upload a password-protected PDF', () => {
        // Try uploading a password-protected PDF
        cy.get('#file-upload').selectFile(
          'cypress/fixtures/generic-protected.pdf',
          {
            force: true,
          }
        );

        // Check for the toast indicating the PDF is password-protected
        cy.get('.toast-message').should(
          'contain.text',
          PASSWORD_PROTECTED_FILE
        );
      });

      it('Tries to upload too many files', () => {
        // Try uploading too many files at once
        cy.get('#file-upload').selectFile(
          [
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
          ],
          { force: true }
        );

        // Check for the toast indicating the maximum number of files was exceeded
        cy.get('.toast-message').should(
          'contain.text',
          'Maximum upload limit exceeded: Only 4 files are allowed.'
        );
      });

      it('Handles multiple errors with multiple toasts', () => {
        // Attempt to upload multiple files with errors at once
        cy.get('#file-upload').selectFile(
          [
            'cypress/fixtures/corrupted.pdf',
            'cypress/fixtures/generic-protected.pdf',
          ],
          {
            force: true,
          }
        );

        // Check for the toast indicating the PDF is corrupted
        cy.get('.toast-message').should(
          'contain.text',
          'Corrupted PDFs cannot be compressed.'
        );

        // Check for the toast indicating the PDF is password protected
        cy.get('.toast-message').should(
          'contain.text',
          PASSWORD_PROTECTED_FILE
        );
      });

      // Uncomment this test if you want to include size limit checks
      // it('Tries to upload files exceeding the size limit', () => {
      //   // Try uploading a file that exceeds the size limit
      //   cy.get('#file-upload').selectFile('cypress/fixtures/large-file.pdf', {
      //     force: true,
      //   });

      //   // Check for the toast indicating the maximum file size was exceeded
      //   cy.get('.toast-message').should(
      //     'contain.text',
      //     'Maximum size limit exceeded: Total size must be under X MB.'
      //   );
      // });
    });

    describe('Drag and Drop Functionality', () => {
      it('Uploads a valid PDF via drag and drop', () => {
        cy.get('#file-drop').selectFile('cypress/fixtures/generic.pdf', {
          action: 'drag-drop',
        });

        // Ensure no error toast is displayed for a valid PDF
        cy.get('.toast-message').should('not.exist');
      });

      it('Tries to upload a non-PDF file via drag and drop', () => {
        cy.get('#file-drop').selectFile('cypress/fixtures/non-pdf-file.txt', {
          action: 'drag-drop',
        });

        // Check for the toast indicating that only PDFs are allowed
        cy.get('.toast-message').should('contain.text', INVALID_FILE_TYPE);
      });

      // it.only('Tries to upload corrupted and protected PDFs via drag and drop 100 times', () => {
      //   const files = [
      //     'cypress/fixtures/corrupted.pdf',
      //     'cypress/fixtures/generic-protected.pdf'
      //   ];

      //   for (let i = 0; i < 100; i++) {
      //     const fileToUpload = files[i % 2]; // Alternate between the two files

      //     cy.get('#file-drop').selectFile(fileToUpload, {
      //       action: 'drag-drop',
      //     });

      //     // Check for the appropriate toast message based on the file type
      //     if (fileToUpload === 'cypress/fixtures/corrupted.pdf') {
      //       cy.get('.toast-message').should(
      //         'contain.text',
      //         'Corrupted PDFs cannot be compressed.'
      //       );
      //     } else {
      //       cy.get('.toast-message').should(
      //         'contain.text',
      //         PASSWORD_PROTECTED_FILE
      //       );
      //     }
      //   }
      // });

      it('Tries to upload a corrupted PDF via drag and drop', () => {
        cy.get('#file-drop').selectFile('cypress/fixtures/corrupted.pdf', {
          action: 'drag-drop',
        });

        // Check for the toast indicating the PDF is corrupted
        cy.get('.toast-message').should(
          'contain.text',
          'Corrupted PDFs cannot be compressed.'
        );
      });

      it('Tries to upload a password-protected PDF via drag and drop', () => {
        cy.get('#file-drop').selectFile(
          'cypress/fixtures/generic-protected.pdf',
          {
            action: 'drag-drop',
          }
        );

        // Check for the toast indicating the PDF is password-protected
        cy.get('.toast-message').should(
          'contain.text',
          PASSWORD_PROTECTED_FILE
        );
      });

      it('Tries to upload too many files via drag and drop', () => {
        cy.get('#file-drop').selectFile(
          [
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
            'cypress/fixtures/generic.pdf',
          ],
          { action: 'drag-drop' }
        );

        // Check for the toast indicating the maximum number of files was exceeded
        cy.get('.toast-message').should(
          'contain.text',
          'Maximum upload limit exceeded: Only 4 files are allowed.'
        );
      });

      it('Handles multiple errors with multiple toasts via drag and drop', () => {
        // Attempt to upload multiple files with errors at once via drag and drop
        cy.get('#file-drop').selectFile(
          [
            'cypress/fixtures/corrupted.pdf',
            'cypress/fixtures/generic-protected.pdf',
          ],
          {
            action: 'drag-drop',
          }
        );

        // Check for the toast indicating the PDF is corrupted
        cy.get('.toast-message').should(
          'contain.text',
          'Corrupted PDFs cannot be compressed.'
        );

        // Check for the toast indicating the PDF is password protected
        cy.get('.toast-message').should(
          'contain.text',
          PASSWORD_PROTECTED_FILE
        );
      });

      // Uncomment this test if you want to include size limit checks
      // it('Tries to upload files exceeding the size limit via drag and drop', () => {
      //   cy.get('#file-drop').selectFile('cypress/fixtures/large-file.pdf', {
      //     action: 'drag-drop',
      //   });

      //   // Check for the toast indicating the maximum file size was exceeded
      //   cy.get('.toast-message').should(
      //     'contain.text',
      //     'Maximum size limit exceeded: Total size must be under X MB.'
      //   );
      // });
    });
  });

  describe('URL Modal E2E Tests', () => {
    // Set up before each test
    beforeEach(() => {
      cy.viewport(1920, 1080); // Set viewport size
      cy.visit('/'); // Adjust the URL to the correct location of your app
    });

    describe('URL Modal Functionality', () => {
      it('Opens the URL modal', () => {
        // Click on the button to open the modal
        cy.get('#open-url-modal').click();

        // Check if the modal opens
        cy.get('#home-url-paste').should('be.visible');
      });

      it('Submits a valid PDF URL', () => {
        // Open the modal
        cy.get('#open-url-modal').click();

        // Enter a valid PDF URL
        cy.get('#url').type('https://pdfobject.com/pdf/sample.pdf');

        // Click on the continue button
        cy.get('#continue-with-url').click();

        // Check that no validation errors are shown
        cy.get('.text-red-500').should('not.exist');
      });

      it('Submits a non-PDF URL', () => {
        // Open the modal
        cy.get('#open-url-modal').click();

        // Enter a non-PDF URL
        cy.get('#url').type(
          'https://example-files.online-convert.com/document/txt/example.txt'
        );

        // Click on the continue button
        cy.get('#continue-with-url').click();

        // Check for the validation error message
        cy.get('.text-red-500').should(
          'contain.text',
          'Please provide a valid PDF link!'
        );

        // Ensure the modal is still open
        cy.get('#home-url-paste').should('be.visible');
      });

      it('Submits an invalid URL', () => {
        // Open the modal
        cy.get('#open-url-modal').click();

        // Enter an invalid URL
        cy.get('#url').type('https://invalid-url.com/invalid.pdf');

        // Click on the continue button
        cy.get('#continue-with-url').click();

        // Check for the validation error message
        cy.get('.text-red-500').should(
          'contain.text',
          'Please provide a valid PDF link!'
        );

        // Ensure the modal is still open
        cy.get('#home-url-paste').should('be.visible');
      });

      // Uncomment this test if you want to include size limit checks
      // it('Submits a PDF file that exceeds the file size limit', () => {
      //   // Open the modal
      //   cy.get('#open-url-modal').click();

      //   // Enter a PDF URL that exceeds the file size limit
      //   cy.get('#url').type('https://example.com/large-file.pdf');

      //   // Click on the continue button
      //   cy.get('#continue-with-url').click();

      //   // Check for the file size limit error message
      //   cy.get('.text-red-500').should(
      //     'contain.text',
      //     'Maximum file size exceeded (limit: X MB).'
      //   );

      //   // Ensure the modal is still open
      //   cy.get('#home-url-paste').should('be.visible');
      // });

      // it('Handles multiple validation errors with multiple messages', () => {
      //   // Open the modal
      //   cy.get('#open-url-modal').click();

      //   // Enter an invalid non-PDF URL that is inaccessible
      //   cy.get('#url').type('https://invalid-url.com/sample.txt');

      //   // Click on the continue button
      //   cy.get('#continue-with-url').click();

      //   // Check for multiple validation error messages
      //   cy.get('.text-red-500').should(
      //     'contain.text',
      //     'Please provide a valid PDF link!'
      //   );
      //   cy.get('.text-red-500').should(
      //     'contain.text',
      //     'The link is not valid or accessible.'
      //   );

      //   // Ensure the modal is still open
      //   cy.get('#home-url-paste').should('be.visible');
      // });

      // it('Handles password-protected PDF files', () => {
      //   // This test can be added if password-protection detection is implemented in the validation
      // });
    });
  });
});

// Test the title and description
// describe('Title and Intro Text', () => {
//   it('should display the correct title in an h1 tag', () => {
//     cy.get('h1').should(
//       'contain',
//       'Compress PDF Files Without Losing Quality'
//     );
//   });
//   it('should display the correct description in a p tag', () => {
//     cy.get('p').should('contain', 'Reduce Size, Not the Quality');
//   });
// });

// Test responsiveness for mobile and desktop
// describe('Mobile and Theme Responsiveness', () => {
//   it('should adapt to dark mode', () => {
//     cy.get('html').invoke('attr', 'class', 'dark'); // Trigger dark mode
//     cy.get('body').should('have.css', 'background-color', 'rgb(35, 35, 35)'); // Check dark background color
//   });
//   it('should adapt to light mode', () => {
//     cy.get('html').invoke('attr', 'class', 'light'); // Trigger light mode
//     cy.get('body').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); // Check light background color
//   });
// });
