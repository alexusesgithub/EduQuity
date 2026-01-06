import Head from 'next/head';
import Link from 'next/link';
import { FaGraduationCap, FaChalkboardTeacher, FaRobot, FaChartLine } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>AI Education Equity System</title>
        <meta name="description" content="AI-powered platform for educational equity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaGraduationCap className="text-primary text-3xl" />
            <h1 className="text-2xl font-bold text-gray-800">EduEquity AI</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/auth/login" className="text-gray-600 hover:text-primary">Login</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Empowering Education Through AI</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              An intelligent platform designed to provide equitable learning experiences for all students
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/login?role=student" className="btn btn-primary px-8 py-3 text-lg rounded-full bg-white text-primary hover:bg-gray-100">
                Student Login
              </Link>
              <Link href="/auth/login?role=teacher" className="btn px-8 py-3 text-lg rounded-full bg-secondary hover:bg-secondary-dark">
                Teacher Login
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card flex flex-col items-center text-center">
                <div className="bg-primary-light p-4 rounded-full mb-4">
                  <FaRobot className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
                <p className="text-gray-600">Personalized learning experiences based on individual student needs and progress</p>
              </div>
              
              <div className="card flex flex-col items-center text-center">
                <div className="bg-secondary-light p-4 rounded-full mb-4">
                  <FaChartLine className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Advanced analytics to monitor student growth and identify areas for improvement</p>
              </div>
              
              <div className="card flex flex-col items-center text-center">
                <div className="bg-primary-light p-4 rounded-full mb-4">
                  <FaChalkboardTeacher className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Teacher Dashboard</h3>
                <p className="text-gray-600">Comprehensive tools for educators to manage classes and personalize instruction</p>
              </div>
              
              <div className="card flex flex-col items-center text-center">
                <div className="bg-secondary-light p-4 rounded-full mb-4">
                  <FaGraduationCap className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customizable for Institutions</h3>
                <p className="text-gray-600">Flexible framework that adapts to your institution's specific needs and curriculum</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">EduEquity AI</p>
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
            </div>
            <div>
              <ul className="flex space-x-6">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 