import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Link } from 'react-router-dom';

const features = [
  { title: 'Jobs search made easy', description: 'Find jobs effortlessly with tailored filters and smart recommendations.' },
  { title: 'Job Alerts To Stay Updated', description: 'Receive notifications for new job postings that match your profile.' },
  { title: 'Companies Collab Benefits', description: 'Discover companies that prioritize inclusivity and collaboration.' },
  { title: 'Stay Connected With Experts', description: 'Join a network of experts to get career advice and support.' },
  { title: 'Grow & Upskill With Us', description: 'Access resources and programs to advance your career skills.' },
  { title: 'Experience Sharing Communities', description: 'Engage in communities to share experiences and learn together.' }
];

const jobTips = [
  'Tailor your resume to each job application, highlighting relevant skills and experiences.',
  'Build a strong LinkedIn profile and connect with recruiters in your field.',
  'Consider freelance or internship opportunities to gain experience if you’re just starting out.',
  'Practice common interview questions and prepare examples that showcase your skills.',
  'Stay consistent and apply to several positions regularly to increase your chances.'
];

const LearnMore = () => {
  return (
    <div className='relative min-h-screen flex flex-col bg-black text-white'>
      <Navbar className='fixed top-0 left-0 w-full z-10' />
      
      <div className='flex-grow pt-16 pb-16 px-8'>
        {/* About Cubicles Section */}
        <h1 className='text-4xl font-bold mb-6'>About Cubicles</h1>
        <p className='text-lg mb-8'>
          Cubicles is committed to creating an inclusive and accessible job search platform for everyone. We believe in empowering job seekers by providing tools that make the job search process smoother, faster, and more accessible. With a focus on inclusivity, we aim to connect people with opportunities that suit their skills and aspirations.
        </p>
        
        {/* Feature List Section */}
        <h2 className='text-3xl font-semibold mb-6'>Our Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
          {features.map((feature, index) => (
            <div key={index} className='p-6 bg-violet-700 rounded-lg shadow-md'>
              <h3 className='text-2xl font-semibold mb-2'>{feature.title}</h3>
              <p className='text-base'>{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Tips to Get a Job Faster Section */}
        <h2 className='text-3xl font-semibold mb-6'>Best Ways to Get a Job Faster</h2>
        <ul className='list-disc list-inside mb-8 space-y-3'>
          {jobTips.map((tip, index) => (
            <li key={index} className='text-base'>
              {tip}
            </li>
          ))}
        </ul>
        <p className='text-lg mb-8'>
          By following these tips, you can increase your chances of landing a job that fits your profile and interests. Cubicles is here to support you with tools and resources designed to simplify your job search and keep you moving forward.
        </p>

        <Link to='/jobs'>
            <button className='mt-10 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200'>
            Explore Job Listings
            </button>
        </Link>
      </div>

      <Footer className='fixed bottom-0 left-0 w-full z-10' />
    </div>
  );
}

export default LearnMore;
