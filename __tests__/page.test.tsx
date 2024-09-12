import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import Page from '../src/app/[locale]/page';
// import { NextIntlProvider } from "next-intl";

describe('Page', () => {
  it('renders a heading', () => {
    // Mocked messages for the test. Adjust this to match the actual messages your component needs.
    const messages = {
      heading: 'Hello, World!',
    };

    // Render the page wrapped with NextIntlProvider and mock messages
    render(
      <NextIntlClientProvider locale="en-us" messages={messages}>
        <Page />
      </NextIntlClientProvider>
    );

    // Find the heading element by its role and assert that it is present in the document
    const heading = screen.getByText('Home');
    expect(heading).toBeInTheDocument();
  });
});
