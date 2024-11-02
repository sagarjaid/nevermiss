'use client';

import { useState, useRef } from 'react';
import type { JSX } from 'react';
import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  type?: 'video' | 'image';
  path?: string;
  format?: string;
  alt?: string;
  svg?: JSX.Element;
}

const Arrow = ({ extraStyle }: { extraStyle: string }) => {
  return (
    <svg
      className={`shrink-0 w-12 opacity-70 ${extraStyle}`}
      viewBox='0 0 138 138'
      fill='black'
      xmlns='http://www.w3.org/2000/svg'>
      <g>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z'
        />
      </g>
    </svg>
  );
};
const Step = ({ emoji, text }: { emoji: string; text: string }) => {
  return (
    <div className='w-full md:w-48 flex flex-col gap-2 items-center justify-center'>
      <span className='text-4xl'>{emoji}</span>
      <h3 className='font-bold'>{text}</h3>
    </div>
  );
};

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: 'Set Goals/task',
    description:
      'Send transactional emails, setup your DNS to avoid spam folder (DKIM, DMARC, SPF in subdomain), and listen to webhook to receive & forward emails',
    type: 'video',
    path: 'https://d3m8mk7e1mf7xn.cloudfront.net/app/newsletter.webm',
    format: 'video/webm',
    svg: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'>
        <path
          strokeLinecap='round'
          d='M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25'
        />
      </svg>
    ),
  },
  {
    title: 'Set frequency of followups',
    description:
      "Create checkout sessions, handle webhooks to update user's account (subscriptions, one-time payments...) and tips to setup your account & reduce chargebacks",
    type: 'image',
    path: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
    alt: 'A computer',
    svg: (
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
          d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
        />
      </svg>
    ),
  },
  {
    title: 'Track progress call by call',
    description:
      'Magic links setup, login with Google walkthrough, save user in MongoDB/Supabase, private/protected pages & API calls',
    svg: (
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
          d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
        />
      </svg>
    ),
  },
  {
    title: 'Stay positive and on track',
    description:
      'Components, animations & sections (like this features section), 20+ themes with daisyUI, automatic dark mode',
    svg: (
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
          d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
        />
      </svg>
    ),
  },
] as Feature[];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({
  feature,
  isOpen,
  setFeatureSelected,
}: {
  index: number;
  feature: Feature;
  isOpen: boolean;
  setFeatureSelected: () => void;
}) => {
  const accordion = useRef(null);
  const { title, description, svg } = feature;

  return (
    <li>
      <button
        className='relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg'
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}>
        <span className={`duration-100 ${isOpen ? 'text-primary' : ''}`}>
          {svg}
        </span>
        <span
          className={`flex-1 text-base-content ${
            isOpen ? 'text-primary font-semibold' : ''
          }`}>
          <h3 className='inline'>{title}</h3>
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out text-base-content-secondary text-left overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }>
        <div className='pb-5 leading-relaxed'>{description}</div>
      </div>
    </li>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }: { feature: Feature }) => {
  const { type, path, format, alt } = feature;
  const style = 'rounded-2xl aspect-square w-full sm:w-[26rem]';
  const size = {
    width: 500,
    height: 500,
  };

  if (type === 'video') {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}>
        <source
          src={path}
          type={format}
        />
      </video>
    );
  } else if (type === 'image') {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState<number>(0);

  return (
    <>
      <section className=' '>
        <div className='max-w-7xl mx-auto px-8 py-16 md:py-32 text-center'>
          <h2 className='max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8 leading-10'>
            Staying on track been never easy, Let AI do the followups
          </h2>
          <p className='max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20'>
            Let AI do the followups
          </p>

          <div className=' flex flex-col md:flex-row gap-12 md:gap-24'>
            <div className='grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20'>
              <ul className='w-full'>
                {features.map((feature, i) => (
                  <Item
                    key={feature.title}
                    index={i}
                    feature={feature}
                    isOpen={featureSelected === i}
                    setFeatureSelected={() => setFeatureSelected(i)}
                  />
                ))}
              </ul>

              <Media
                feature={features[featureSelected]}
                key={featureSelected}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesAccordion;
