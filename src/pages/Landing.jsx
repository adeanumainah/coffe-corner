import { Link } from "react-router-dom";
import { Coffee, Shield, Users, Star, MapPin, Clock, Zap } from "lucide-react";

function Landing() {
  // WhatsApp Contact
  const whatsappNumber = "6282320216812";
  const whatsappMessage = "Halo Coffee Corner! Saya ingin bertanya tentang..."; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-cream-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-br from-amber-600 to-amber-800 rounded-2xl flex items-center justify-center shadow-lg">
                <Coffee className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
                  Coffee Corner
                </h1>
                <p className="text-xs text-amber-600 font-medium">Premium Cafe Experience</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-5 py-2.5 text-amber-700 font-semibold hover:text-amber-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-md hover:shadow-lg"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Cozy coffee moment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Coffee Corner
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 mb-10 font-light max-w-3xl mx-auto">
            Where every cup tells a warm story – Seamless ordering for customers, powerful management for your cafe
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="px-10 py-4 bg-amber-700 text-white rounded-full font-medium text-lg hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start Now
            </Link>
            <Link
              to="/login"
              className="px-10 py-4 bg-white/90 text-amber-800 rounded-full font-medium text-lg hover:bg-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Signature Brews</h2>
          <p className="text-lg text-amber-700">Crafted with premium beans for every mood</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: "Espresso", desc: "Rich & bold", img: "https://media.istockphoto.com/id/2168005130/photo/heart-shaped-latte-art-in-a-white-cup-with-coffee-beans-isolated-on-wooden-table-side-view-of.jpg?s=612x612&w=0&k=20&c=hQmWzRmUpVsrEVD97Dwy7jxk6FmRJhKbA2VNh_D5V9s=" },
            { name: "Cappuccino", desc: "Silky foam art", img: "https://thumbs.dreamstime.com/b/cappuccino-latte-art-white-cup-wooden-table-coffee-drink-italian-roasting-company-product-aromatic-hot-espresso-style-351776528.jpg" },
            { name: "Cold Brew", desc: "Smooth & refreshing", img: "https://thumbs.dreamstime.com/b/warm-coffee-cup-heart-design-sits-wooden-table-cozy-cafe-morning-hours-rich-cup-coffee-topped-412430917.jpg" },
          ].map((item) => (
            <div key={item.name} className="group">
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <img src={item.img} alt={item.name} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-1">{item.name}</h3>
                  <p className="text-amber-200">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Showcase */}
      <section className="py-20 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Powerful Platform for Everyone</h2>
            <p className="text-lg text-amber-700">Admin tools + Customer app in one seamless experience</p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden">
            <div className="flex border-b border-amber-100">
              <div className="flex-1 text-center py-5 border-b-2 border-amber-600">
                <Shield className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <span className="font-semibold text-amber-700">Admin Dashboard</span>
              </div>
              <div className="flex-1 text-center py-5">
                <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <span className="font-semibold text-gray-500">Customer App</span>
              </div>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {/* Admin Side */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Today's Overview</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-700">$2,480</div>
                    <div className="text-sm text-green-600">↑ 12%</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-amber-700">42</div>
                    <div className="text-sm text-amber-600">Orders</div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-700">8</div>
                    <div className="text-sm text-yellow-600">Pending</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">34</div>
                    <div className="text-sm text-green-600">Completed</div>
                  </div>
                </div>
              </div>
              {/* Customer Side */}
              <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Coffee className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="font-bold text-gray-800">Welcome back!</h3>
                    <p className="text-sm text-gray-500">Ready for your next cup?</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/user/menu" className="bg-white rounded-xl p-5 text-center hover:shadow-md transition">
                    <Coffee className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                    <span className="font-medium">Browse Menu</span>
                  </Link>
                  <Link to="/user/orders" className="bg-white rounded-xl p-5 text-center hover:shadow-md transition">
                    <Shield className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://thumbs.dreamstime.com/b/modern-cafe-interior-minimalist-decor-artistic-accents-warm-tones-contemporary-cafe-space-stylish-furnishings-403131685.jpg"
              alt="Cozy cafe interior"
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-amber-900 mb-6">A Warm Space for Every Moment</h2>
            <p className="text-lg text-amber-800 leading-relaxed mb-8">
              From our carefully sourced beans to the cozy corners designed for relaxation, 
              Coffee Corner is more than a cafe—it's a place where stories brew and moments matter.
            </p>
            <div className="flex gap-12 text-amber-900">
              <div className="text-center">
                <Clock className="w-10 h-10 mx-auto mb-2" />
                <p className="font-medium">Open Daily</p>
                <p>7AM - 10PM</p>
              </div>
              <div className="text-center">
                <Coffee className="w-10 h-10 mx-auto mb-2" />
                <p className="font-medium">Fresh Roast</p>
                <p>Weekly</p>
              </div>
              <div className="text-center">
                <Star className="w-10 h-10 mx-auto mb-2" />
                <p className="font-medium">4.9 Rating</p>
                <p>Loved by all</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-12">What Our Guests Say</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { text: "Best latte in town! So cozy and perfect for work or friends.", name: "Sarah M." },
              { text: "Smooth cold brew and friendly vibe. My daily spot now!", name: "James L." },
              { text: "Feels like home. Fresh beans and warm atmosphere every time.", name: "Emily R." },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-amber-900 italic mb-6">"{t.text}"</p>
                <p className="font-medium text-amber-800">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-linear-to-r from-amber-700 to-amber-800 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Elevate Your Cafe Experience?
            </h2>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of cafes that have transformed their business with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-amber-700 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Sign In to Dashboard
              </Link>
            </div>
            <p className="text-amber-200 mt-8 text-sm">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Updated with Terms, Privacy, Contact (WhatsApp) */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-linear-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                <span className="text-white">☕</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Coffee Corner</h3>
                <p className="text-xs text-amber-300">
                  Brewing happiness since 2024
                </p>
              </div>
            </div>
            
            <div className="text-sm text-amber-300">
              <p>© {new Date().getFullYear()} Coffee Corner. All rights reserved.</p>
              <p className="text-xs mt-1">Made with ❤️ for coffee lovers everywhere</p>
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <a 
                href="#" 
                className="text-amber-300 hover:text-amber-100 transition-colors"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="text-amber-300 hover:text-amber-100 transition-colors"
              >
                Privacy
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-100 transition-colors"
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
