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
import ButtonAccount from './ButtonAccount';
import { usePathname } from 'next/navigation';

import MobileNav from './MobileNav';

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

  const pathName = usePathname();

  const pricingSvg = (
    <svg
      className='w-5 h-5'
      fill='none'
      strokeWidth={1.5}
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3'
      />
    </svg>
  );

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
          <div className='flex items-center justify-center gap-4'>
            {pathName.endsWith('/') ? (
              <>
                <a
                  href='/#pricing'
                  className='flex items-center gap-2 hover:bg-base-300 duration-200
              p-2 w-fit rounded-lg font-medium'>
                  {pricingSvg}
                  <span>Pricing</span>
                </a>
                <ButtonAccount />
              </>
            ) : (
              <>
                <ButtonAccount />
              </>
            )}
          </div>

          {/* <a
            href='/interview/91739730173'
            className='flex gap-2 bg-white justify-center items-center w-fit hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              viewBox='0 0 48 48'>
              <path
                fill='#FFC107'
                d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
              />
              <path
                fill='#FF3D00'
                d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
              />
              <path
                fill='#4CAF50'
                d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
              />
              <path
                fill='#1976D2'
                d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
              />
            </svg>
            <span>Start 1 FREE Interview</span>
          </a> */}
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${isOpen ? '' : 'hidden'}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full p-4 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}>
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
          <div className='flex flex-col h-full justify-between pt-4 pb-10'>
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
            </div> */}

            <MobileNav />

            <div className='pt-10 pl-1.5'>
              <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
                LEGAL
              </div>

              <div className='flex flex-col justify-center items-start gap-2.5  text-xs'>
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
                  href='/#pricing'
                  className='link link-hover'>
                  Pricing
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
            </div>

            {/* <div className='divider'></div> */}
            {/* Your CTA on small screens */}
            {/* <div className='flex flex-col'>{cta}</div> */}
            {/* <a
              href='/interview/91739730173'
              className='flex gap-2 bg-white hover:bg-slate-50 p-2 w-fit px-3.5 border cursor-pointer border-black rounded-md'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                viewBox='0 0 48 48'>
                <path
                  fill='#FFC107'
                  d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
                />
                <path
                  fill='#FF3D00'
                  d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
                />
                <path
                  fill='#4CAF50'
                  d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
                />
                <path
                  fill='#1976D2'
                  d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
                />
              </svg>
              <span>Continue with Google</span>
              <span>Start 1 FREE Interview</span>
            </a> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
