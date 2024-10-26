

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Footer Logo and Description */}
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-400">Renewable Invest</h2>
              <p className="text-gray-400 mt-2">
                Invest in local renewable projects and contribute to a sustainable future.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="mb-6 md:mb-0 text-center">
              <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
              <ul className="space-y-2 mt-4">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/projects" className="hover:text-white">Projects</a></li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-300">Get in Touch</h3>
              <p className="text-gray-400 mt-2">Email: contact@renewableinvest.com</p>
              <p className="text-gray-400">Phone: +1 234 567 890</p>
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
  
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
            © 2024 Renewable Invest. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };

export default Footer