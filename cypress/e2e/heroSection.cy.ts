// describe('hero section tests', () => {
//   it('passes', () => {
//     cy.viewport(1920, 1080);
//     cy.visit('/');
//   });
// });

describe('Hero Section E2E Tests', () => {
  // Ensure the site is visited before each test
  beforeEach(() => {
    cy.viewport(1920, 1080); // Set the viewport size to desktop
    cy.visit('/'); // Adjust the URL to the correct location of your app
  });

  // Test the title and description
  describe('Title and Intro Text', () => {
    it('should display the correct title in an h1 tag', () => {
      cy.get('h1').should(
        'contain',
        'Compress PDF Files Without Losing Quality'
      );
    });

    it('should display the correct description in a p tag', () => {
      cy.get('p').should('contain', 'Reduce Size, Not the Quality');
    });
  });

  // Test responsiveness for mobile and desktop
  describe('Mobile and Theme Responsiveness', () => {
    it('should render correctly in mobile view', () => {
      cy.viewport('iphone-6'); // Set viewport to mobile size
      cy.get('.hero-section').should('be.visible'); // Check hero section visibility in mobile
    });

    it('should render correctly in desktop view', () => {
      cy.viewport('macbook-15'); // Set viewport to desktop size
      cy.get('.hero-section').should('be.visible'); // Check hero section visibility in desktop
    });

    it('should adapt to dark mode', () => {
      cy.get('html').invoke('attr', 'class', 'dark'); // Trigger dark mode
      cy.get('body').should('have.css', 'background-color', 'rgb(35, 35, 35)'); // Check dark background color
    });

    it('should adapt to light mode', () => {
      cy.get('html').invoke('attr', 'class', 'light'); // Trigger light mode
      cy.get('body').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)'); // Check light background color
    });
  });
});

// Test file upload and browse block responsiveness
// describe('File Browse Block', () => {
//   it('should display a responsive browse file block', () => {
//     cy.viewport('macbook-15');
//     cy.get('.browse-files-block').should('be.visible');
//     cy.viewport('iphone-6');
//     cy.get('.browse-files-block').should('be.visible');
//   });

//   it('should show tooltips with accurate titles', () => {
//     cy.get('.browse-files-block [data-tooltip]').trigger('mouseover');
//     cy.get('.tooltip').should('contain', 'Select Files');
//   });

//   it('should open a modal when clicking on link icon', () => {
//     cy.get('.browse-files-block .link-icon').click();
//     cy.get('.modal').should('be.visible');
//   });

//   it('should validate all images contain alt text', () => {
//     cy.get('img').each($img => {
//       cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
//     });
//   });
// });

// Test file preview and download
//   describe('File Preview and Download', () => {
//     it('should preview the uploaded file', () => {
//       cy.get('.file-preview').should('be.visible');
//       cy.get('.file-preview').should('contain', 'sample.pdf');
//     });

//     it('should allow the user to download the file', () => {
//       cy.get('.file-download').click();
//       cy.get('a[download]')
//         .should('have.attr', 'href')
//         .and('contain', 'sample.pdf');
//     });
//   });
// });
//   // Test validation and error handling
//   describe('Validation and Error Handling', () => {
//     it('should show an error for unsupported file types', () => {
//       cy.get('input[type="file"]').attachFile('sample.png'); // Attempt to upload an unsupported file
//       cy.get('.error-message').should('contain', 'Only PDF files are allowed');
//     });

//     it('should validate missing fields before submission', () => {
//       cy.get('.submit-url-button').click();
//       cy.get('.error-message').should('contain', 'URL is required');
//     });
//   });
// });
