'use client';

import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ButtonSignin from './ButtonSignin';
import logo from '@/app/logo.png';

import config from '@/config';
import Navbar from './Navbar';
import NavbarMobile from './NavbarMobile';

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: '/#pricing',
    label: 'Pricing',
  },
  {
    href: '/#testimonials',
    label: 'Reviews',
  },
  {
    href: '/#faq',
    label: 'FAQ',
  },
];

// const cta: JSX.Element = <ButtonSignin />;

const cta: JSX.Element = <ButtonSignin extraStyle='btn-primary' />;

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <header className='w-full'>
      <nav
        className='flex items-center justify-between px-4 py-3 w-full'
        aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link
            className='flex items-center gap-2 shrink-0 '
            href='/'
            title={`${config.appName} homepage`}>
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className='w-full'
              priority={true}
              width={130}
              height={70}
            />
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5'
            onClick={() => setIsOpen(true)}>
            <span className='sr-only'>Open main menu</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-base-content'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>
        </div>

        {/* Your links on large screens
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover"
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div> */}

        {/* CTA on large screens */}
        <div className='hidden lg:flex lg:justify-end lg:flex-1 text-xs'>
          {cta}
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${isOpen ? '' : 'hidden'}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full p-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}>
          {/* Your logo/name on small screens */}
          <div className='flex items-center justify-between'>
            <Link
              className='flex items-center gap-2 shrink-0 '
              href='/'
              title={`${config.appName} homepage`}>
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className='w-full'
                priority={true}
                width={130}
                height={70}
              />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5'
              onClick={() => setIsOpen(false)}>
              <span className='sr-only'>Close menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Your links on small screens */}
          <div className='flow-root mt-6'>
            {/* <div className='flex flex-col gap-2.5'>
              <div className='bg-white p-1.5 rounded-md hover:bg-gray-50 flex gap-2'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  strokeWidth={2}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
                <button>Monetized</button>
              </div>
              <div className='bg-white  p-1.5 rounded-md hover:bg-gray-50 flex gap-2'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  strokeWidth={2}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 5.25v13.5m-7.5-13.5v13.5'
                  />
                </svg>

                <button>Not yet Monetized</button>
              </div>

              <div className='bg-white p-1.5 rounded-md hover:bg-gray-50 flex gap-2'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  strokeWidth={2}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                  />
                </svg>
                <button>Demonetized</button>
              </div>
            </div>

            <div className='pt-10'>
              <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
                LEGAL
              </div>

              <div className='flex flex-col justify-center items-start gap-2.5 mb-10 text-xs'>
                <Link
                  href='/tos'
                  className='link link-hover'>
                  Terms of services
                </Link>
                <Link
                  href='/privacy-policy'
                  className='link link-hover'>
                  Privacy policy
                </Link>
                <Link
                  href='/privacy-policy'
                  className='link link-hover'>
                  Support
                </Link>
                <Link
                  href='/privacy-policy'
                  className='link link-hover'>
                  Build by Sagar Jaid
                </Link>
              </div>
            </div> */}

            {/* <NavbarMobile /> */}

            <div className='divider'></div>
            {/* Your CTA on small screens */}
            <div className='flex flex-col'>{cta}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
