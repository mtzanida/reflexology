"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Heart, Zap, Shield, Smile } from "lucide-react"
import Image from "next/image"

export default function ReflexologyWebsite() {
  const phoneNumber = "+14155551212" // Replace with your husband's actual phone number

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">John Smith</h1>
                <p className="text-sm text-green-600">Certified Reflexologist</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </a>
              <a href="#services" className="text-gray-600 hover:text-green-600 transition-colors">
                Services
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-green-600 transition-colors">
                Benefits
              </a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Restore Balance Through
                <span className="text-green-600 block">Natural Healing</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience the ancient art of reflexology with personalized treatments designed to promote wellness,
                reduce stress, and restore your body's natural balance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
                >
                  Book Appointment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Relaxing reflexology treatment showing hands massaging feet"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Professional reflexologist working on client's hands"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">About John Smith</h3>
              <p className="text-gray-600 leading-relaxed">
                With over 10 years of experience in reflexology and holistic wellness, I am dedicated to helping clients
                achieve optimal health through the power of therapeutic touch. My approach combines traditional
                reflexology techniques with modern understanding of the body's healing mechanisms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I hold certifications from the International Reflexology Association and continue to expand my knowledge
                through ongoing education in complementary healing practices.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Reflexology Treatment</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the healing power of foot reflexology through personalized treatments designed to promote
              wellness and restore balance.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                  <Heart className="h-6 w-6 text-green-600" />
                  <span>Foot Reflexology</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6 text-lg">
                  Traditional foot reflexology targeting specific pressure points to promote overall wellness, reduce
                  stress, and restore your body's natural balance through therapeutic touch.
                </CardDescription>
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <div className="text-lg font-semibold text-green-700">Session Duration: 40 minutes</div>
                </div>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
                >
                  Book Your Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Benefits of Reflexology</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reflexology offers numerous health benefits by stimulating specific pressure points that correspond to
              different organs and systems in your body.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Stress Relief</h4>
              <p className="text-gray-600">Reduce stress and anxiety through targeted pressure point therapy.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Improved Circulation</h4>
              <p className="text-gray-600">
                Enhance blood flow and promote better oxygen delivery throughout the body.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Pain Management</h4>
              <p className="text-gray-600">Natural pain relief for headaches, back pain, and chronic conditions.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Smile className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800">Better Sleep</h4>
              <p className="text-gray-600">Promote relaxation and improve sleep quality through therapeutic touch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">What Clients Say</h3>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-medium">5.0 on Google Reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Replace these with your actual Google reviews */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Paste your actual Google review text here. John's reflexology sessions have been life-changing..."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Sarah M.</div>
                    <div className="text-sm text-gray-500">Google Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Paste your second Google review here. Professional, knowledgeable, and truly caring..."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">DL</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">David L.</div>
                    <div className="text-sm text-gray-500">Google Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Paste your third Google review here. I was skeptical at first, but after just a few sessions..."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Maria R.</div>
                    <div className="text-sm text-gray-500">Google Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              onClick={() => window.open("https://www.google.com/search?q=your+business+name+reviews", "_blank")}
            >
              Read More Reviews on Google
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ready to begin your journey to wellness? Contact me to schedule your reflexology session or to learn
                  more about how reflexology can benefit you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Phone</div>
                    <div className="text-gray-600">(555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Email</div>
                    <div className="text-gray-600">john@reflexologyhealing.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Location</div>
                    <div className="text-gray-600">
                      123 Wellness Street
                      <br />
                      Peaceful City, PC 12345
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Hours</div>
                    <div className="text-gray-600">
                      Mon-Fri: 9:00 AM - 7:00 PM
                      <br />
                      Sat: 10:00 AM - 4:00 PM
                      <br />
                      Sun: By Appointment
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Interested Service</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select a service</option>
                    <option>Foot Reflexology</option>
                    <option>Hand Reflexology</option>
                    <option>Full Body Session</option>
                    <option>Consultation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your wellness goals or any specific concerns..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-green-400" />
              <div>
                <div className="font-semibold">John Smith Reflexology</div>
                <div className="text-sm text-gray-400">Certified Reflexologist</div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} John Smith Reflexology. All rights reserved.
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Licensed & Insured | Member of International Reflexology Association
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
