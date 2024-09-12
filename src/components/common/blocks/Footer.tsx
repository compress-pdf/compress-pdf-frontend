import { Link } from '@/i18n/routing';

import SectionContainer from '../containers/SectionContainer';

const footerLinks = [
  { href: '#', label: 'Terms & Conditions' },
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Privacy' },
];

const Footer = () => {
  return (
    <footer className="bg-blue-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm w-full py-8 mx-auto">
      <SectionContainer className="flex justify-center items-center md:justify-between flex-col md:flex-row text-sm font-normal md:font-semibold">
        <p className="tracking-wide">© 2024 Starter Template</p>

        <ul className="flex gap-4">
          {footerLinks.map(link => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
