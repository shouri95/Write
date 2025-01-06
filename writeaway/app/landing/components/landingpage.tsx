import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Feather, Users, BarChart } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed w-full bg-white/90 backdrop-blur-md z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="text-3xl font-bold text-gray-900 flex items-center">
                <Feather className="h-8 w-8 text-red-600 mr-2" />
                WriteAway
              </a>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">Features</a>
              <a href="#testimonials" className="text-base font-medium text-gray-500 hover:text-gray-900">Testimonials</a>
              <a href="#pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">Pricing</a>
            </nav>
            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900 mr-8">
                Log in
              </a>
              <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8 bg-gradient overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl mb-6 text-shadow animate-fade-in">
              Craft Your <span className="text-red-600">Masterpiece</span> with Precision
            </h1>
            <p className="text-xl text-gray-600 mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
              WriteAway empowers screenwriters with cutting-edge tools and an intuitive interface. 
              From concept to final draft, elevate your storytelling.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
              Start Your Free Trial
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="mt-20 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <img src="/placeholder.svg?height=600&width=1200" alt="WriteAway Interface" className="rounded-lg shadow-2xl mx-auto" />
          </div>
          <div className="custom-shape-divider-bottom-1635791024">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
        </section>

        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Elevate Your Writing Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Feather className="h-10 w-10 text-red-600" />,
                  title: "Intuitive Formatting",
                  description: "Focus on your story with our intelligent, industry-standard formatting that adapts as you write."
                },
                {
                  icon: <Users className="h-10 w-10 text-red-600" />,
                  title: "Collaborative Writing",
                  description: "Seamlessly work with co-writers in real-time, with advanced version control and commenting systems."
                },
                {
                  icon: <BarChart className="h-10 w-10 text-red-600" />,
                  title: "Smart Analytics",
                  description: "Gain deep insights into your writing patterns, character arcs, and story structure with our AI-powered analytics."
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover-lift">
                  <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">Trusted by Award-Winning Writers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "WriteAway transformed my writing process. It's an indispensable tool for any serious screenwriter.",
                  author: "Emma Thompson",
                  title: "Academy Award Winner"
                },
                {
                  quote: "The collaborative features in WriteAway made our latest project a breeze. It's a game-changer.",
                  author: "Jordan Peele",
                  title: "Writer & Director"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <p className="text-xl italic mb-4">{testimonial.quote}</p>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">Choose Your Writing Journey</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Starter",
                  price: "$9.99",
                  features: ["Basic formatting", "Cloud storage", "Export to PDF"]
                },
                {
                  title: "Professional",
                  price: "$19.99",
                  features: ["Advanced formatting", "Collaboration tools", "Analytics dashboard", "Priority support"]
                },
                {
                  title: "Studio",
                  price: "$49.99",
                  features: ["All Professional features", "Custom branding", "API access", "Dedicated account manager"]
                }
              ].map((plan, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover-lift">
                  <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-base font-normal">/month</span></p>
                  <ul className="text-left mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-2">
                        <ChevronRight className="h-5 w-5 text-red-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Choose Plan</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Write Your Masterpiece?</h2>
            <p className="text-xl mb-10">
              Join thousands of writers who trust WriteAway for their screenplays. Start your free trial today.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
              Get Started for Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400">&copy; 2024 WriteAway. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

