import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';
import logo from '@/app/logo.png';

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.mailgun.supportEmail, the link won't be displayed.

const Footer = () => {
  return (
    <footer className=' w-full border-t border-base-content/10'>
      <div className='max-w-5xl  mx-auto px-2 pb-10 pt-20'>
        <div className=' flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col'>
          <div className='w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left'>
            <Link
              className='flex items-center gap-2 shrink-0 '
              href='/'
              title={`${config.appName} homepage`}>
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className='w-full sdm:w-[70%] -ml-1 grayscale-0'
                priority={true}
                width={130}
                height={70}
              />
            </Link>
            <p className='mt-3 text-xs text-base-content/60'>
              Practice USA F1 visa interview with VisaInterviewAI's AI Visa
              officer and get instant and realistic feedback on mock inteviews
            </p>
            <p className='mt-4 text-xs text-base-content/60'>
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
          <div className='flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center'>
            <div className='lg:w-1/3 md:w-1/2 w-full px-4'>
              <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
                LINKS
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm'>
                <Link
                  href='/'
                  className='link link-hover'>
                  Visa Officer AI
                </Link>
                <Link
                  href='/#pricing'
                  className='link link-hover'>
                  Pricing
                </Link>
                {/* {config.mailgun.supportEmail && ( */}
                <a
                  href={`mailto:sagarjaid321@gmail.com`}
                  target='_blank'
                  className='link link-hover'
                  aria-label='Contact Support'>
                  Support
                </a>
                {/* )} */}
              </div>
            </div>

            <div className='lg:w-1/3 md:w-1/2 w-full px-4'>
              <div className='footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3'>
                LEGAL
              </div>

              <div className='flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
