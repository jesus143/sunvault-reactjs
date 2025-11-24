"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Battery, Phone, Box, Settings, Target, Zap, Mail, MessageCircle } from "lucide-react";
import { useUserActivityTracking } from "@/hooks/useUserActivityTracking";
export default function SolarLandingPage() {
  // useUserActivityTracking();
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-yellow-300 to-orange-500 py-24 px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4"
        >
          SolarVault — Portable Solar Power in a Box
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-2xl mx-auto mb-8"
        >
          A compact, plug-and-play solar setup that brings clean power anywhere. 
          From 100W to 1000W — SolarVault makes solar energy simple, affordable, and portable.
        </motion.p>
        <Button 
          
        size="lg" className="rounded-2xl px-8 py-6 text-lg shadow-xl">
          Get a Free Quote
        </Button>

        <img src={'./images/solar-box-b1.png'} width={500} height={200} />
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why SolarVault?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 text-center">
              <Box className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Portable Power Box</h3>
              <p className="text-gray-600">
                We compress full solar setups into one compact, lightweight box — easy to move, install, and use anywhere.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 text-center">
              <Sun className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Plug-and-Play Solar</h3>
              <p className="text-gray-600">
                Simply connect your solar panels and you're powered. No complex wiring, no engineers needed.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 text-center">
              <Battery className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hybrid Ready</h3>
              <p className="text-gray-600">
                Use solar + use from electric provider as a backup. Perfect for homes, businesses, and off-grid setups.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Power Range */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your Power</h2>
        <p className="text-center text-gray-600 mb-6">
          From basic home backup to full portable power solutions. See how long your appliances can run.
        </p>

        {/* Important Notice */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <Card className="rounded-2xl shadow-md bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Sun className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">☀️ Important: Daytime vs Nighttime Power & Hybrid</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">During Sunny Days:</span> You can use your appliances 
                      <span className="font-bold text-green-600"> non-stop, unlimited hours</span> because the solar panels 
                      power your devices directly while simultaneously charging the battery.
                    </p>
                    <p>
                      <span className="font-semibold">Runtime Hours Shown Below:</span> These hours are for 
                      <span className="font-bold text-blue-600"> battery-only operation at night</span> (when there's no sunlight). 
                      The battery capacity determines how long your appliances can run after sunset.
                    </p>
                    <p>
                      <span className="font-semibold"> Hybrid: </span> 
                      <span className="font-bold text-blue-600">Once low battery </span>  
                      System will automatically shift the power to your electric provider such as (ILPI, LANECO & MERALCO)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
          {/* 100W Power Station */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">100W</h3>
                <p className="text-sm text-gray-500 mb-2">Battery: 150Wh</p>
                <p className="text-sm text-gray-600 italic">Best for: Lights & Charging</p>
              </div>
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">Battery Runtime (Nighttime):</h4>
                <p className="text-xs text-gray-500 mb-3 italic">Hours on battery only (no sun)</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between">
                    <span className="text-gray-600">LED Bulb (10W)</span>
                    <span className="font-semibold">~15 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Phone Charging (5W)</span>
                    <span className="font-semibold">~30 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">WiFi Router (10W)</span>
                    <span className="font-semibold">~15 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Small Fan (30W)</span>
                    <span className="font-semibold">~5 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Radio (15W)</span>
                    <span className="font-semibold">~10 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Computer Monitor (20W)</span>
                    <span className="font-semibold">~{Math.round(150/20)} hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">And more..</span>
                  </li>
                </ul>
                <hr className="mt-5" />
                <p className="mt-2 text-xs text-green-500 mb-3 italic">Unlimited if day time (with sun)</p> 


                <p className="text-2xl"> ₱ 10,500</p>
              </div>
            </CardContent>
          </Card>

          {/* 300W Power Station */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">300W</h3>
                <p className="text-sm text-gray-500 mb-2">Battery: 300Wh</p>
                <p className="text-sm text-gray-600 italic">Perfect for: Light Appliances</p>
              </div>
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">Battery Runtime (Nighttime):</h4>
                <p className="text-xs text-gray-500 mb-3 italic">Hours on battery only (no sun)</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between">
                    <span className="text-gray-600">LED Bulb (10W)</span>
                    <span className="font-semibold">~30 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Radio (15W)</span>
                    <span className="font-semibold">~20 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">TV 32"-42" (70W)</span>
                    <span className="font-semibold">~4 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">WiFi Router (10W)</span>
                    <span className="font-semibold">~30 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Phone Charging (5W)</span>
                    <span className="font-semibold">~60 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Small Fan (30W)</span>
                    <span className="font-semibold">~10 hrs</span>
                  </li>
                <li className="flex justify-between">
                    <span className="text-gray-600">And more..</span>
                  </li>
                </ul>
                <hr className="mt-5" />
                <p className="mt-2 text-xs text-green-500 mb-3 italic">Unlimited if day time (with sun)</p> 

                <p className="text-2xl"> ₱ 14,500</p>
              </div>
            </CardContent>
          </Card>

          {/* 500W Power Station */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">500W</h3>
                <p className="text-sm text-gray-500 mb-2">Battery: 600Wh</p>
                <p className="text-sm text-gray-600 italic">Great for: Medium Loads</p>
              </div>
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">Battery Runtime (Nighttime):</h4>
                <p className="text-xs text-gray-500 mb-3 italic">Hours on battery only (no sun)</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between">
                    <span className="text-gray-600">LED Bulb (10W)</span>
                    <span className="font-semibold">~60 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Radio (15W)</span>
                    <span className="font-semibold">~40 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">TV 32"-42" (70W)</span>
                    <span className="font-semibold">~8 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Mini Ref (80W)</span>
                    <span className="font-semibold">~7 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">WiFi Router (10W)</span>
                    <span className="font-semibold">~60 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Phone Charging (5W)</span>
                    <span className="font-semibold">~120 hrs</span>
                  </li>
                <li className="flex justify-between">
                    <span className="text-gray-600">And more..</span>
                  </li>
                </ul>
                <hr className="mt-5" />
                <p className="mt-2 text-xs text-green-500 mb-3 italic">Unlimited if day time (with sun)</p> 
                <p className="text-2xl"> ₱ 19,500</p>
              </div>
            </CardContent>
          </Card>

          {/* 1000W Power Station */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow border-2 border-yellow-400">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">1000W</h3>
                <p className="text-sm text-gray-500 mb-2">Battery: 1000Wh</p>
                <p className="text-sm text-yellow-600 font-semibold italic">Most Popular: Full Home Power</p>
              </div>
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">Battery Runtime (Nighttime):</h4>
                <p className="text-xs text-gray-500 mb-3 italic">Hours on battery only (no sun)</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between">
                    <span className="text-gray-600">LED Bulb (10W)</span>
                    <span className="font-semibold">~100 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Radio (15W)</span>
                    <span className="font-semibold">~66 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">TV 32"-42" (70W)</span>
                    <span className="font-semibold">~14 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Mini Ref (80W)</span>
                    <span className="font-semibold">~12 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">WiFi Router (10W)</span>
                    <span className="font-semibold">~100 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Phone Charging (5W)</span>
                    <span className="font-semibold">~200 hrs</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Freezer (100W)</span>
                    <span className="font-semibold">~{Math.round(1000/100)} hrs</span>
                  </li>
                <li className="flex justify-between">
                    <span className="text-gray-600">And more..</span>
                  </li>
                </ul>  
                <hr className="mt-5" />
                <p className="mt-2 text-xs text-green-500 mb-3 italic">Unlimited if day time (with sun)</p> 
                <p className="text-2xl"> ₱ 29,500</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customizable Power Station - Below the grid */}
        <div className="max-w-4xl mx-auto px-6 mt-8">
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Settings className="w-16 h-16 text-purple-600 flex-shrink-0" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-2">Custom Power Solution</h3>
                  <p className="text-sm text-gray-500 mb-4">1000W+ • Fully Customizable</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">✓</span>
                        <span>Full house or office power</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">✓</span>
                        <span>Multiple appliances & AC units</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">✓</span>
                        <span>Extended battery capacity</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">✓</span>
                        <span>Commercial-grade systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">✓</span>
                        <span>Scalable power output</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">✓</span>
                        <span>Professional installation support</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 italic mb-4">
                    Tell us your power needs and we'll design a custom solution perfect for your home or office.
                  </p>
                  <Button size="lg" className="rounded-lg bg-purple-600 hover:bg-purple-700 text-white px-8">
                    Request Custom Quote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow border-2 border-yellow-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <Zap className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We transform bulky, complex solar panel installations into compact, portable power boxes — 
                    just like how computers evolved from room-sized mainframes to sleek laptops you can take anywhere.
                  </p>
                  <p className="leading-relaxed">
                    Our mission is to make clean energy <strong className="text-gray-900">affordable, accessible, and simple</strong> for every Filipino household. 
                    We compress entire solar setups into portable boxes that anyone can install in minutes — 
                    no technical expertise, no expensive installation fees, no complex wiring.
                  </p>
                  <p className="leading-relaxed">
                    Simply place the box, connect the panels, and power your home. Move it anywhere you need. 
                    Connect it to your electric provider for hybrid power. <strong className="text-gray-900">Clean energy made simple, portable, and affordable.</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow border-2 border-orange-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-orange-100">
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We envision a Philippines where every household has access to affordable solar power — 
                    from 100W for basic needs to 1000W+ for full home and office solutions.
                  </p>
                  <p className="leading-relaxed">
                    Our vision is to democratize clean energy by offering solar power solutions that are:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-1">•</span>
                      <span><strong>Affordable</strong> — no expensive installation costs or upfront fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-1">•</span>
                      <span><strong>Portable</strong> — take your power anywhere, install it anywhere</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-1">•</span>
                      <span><strong>Simple</strong> — plug-and-play setup that anyone can do</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-1">•</span>
                      <span><strong>Flexible</strong> — use solar-only, hybrid, or grid backup</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    We believe that clean energy should be accessible to everyone, not just those who can afford 
                    expensive installations. That's why we're building portable solar power boxes that make 
                    independence affordable and achievable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Affordable Power. Zero Hassle.</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          SolarVault gives every Filipino household a clean and portable power solution without expensive installation.
        </p>
        <Button size="lg" className="rounded-2xl px-10 py-6 text-lg">
          Request Installation
        </Button>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Founder</h2>
          
          <Card className="rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Founder Image */}
                <div className="md:w-1/3 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-8">
                  <div className="relative w-48 h-48 md:w-full md:h-full max-w-xs mx-auto">
                    <div className="rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 aspect-square">
                       <img src={'./images/me.png'} width={500} height={200} />
                    </div>
                  </div>
                </div>
                
                {/* Founder Information */}
                <div className="md:w-2/3 p-8 md:p-10">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Jesus Erwin Suarez</h3>
                  <p className="text-yellow-600 font-semibold mb-4">Founder & CEO</p>
                  
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">
                      With a passion for making clean energy accessible to every Filipino household, 
                      I founded SolarVault to solve a problem I saw firsthand: traditional solar installations 
                      are too expensive, too complex, and too permanent.
                    </p>
                    <p className="leading-relaxed">
                      Our mission is simple — <strong className="text-gray-900">bring portable, affordable solar power 
                      to every home and business in the Philippines.</strong> We believe that clean energy shouldn't 
                      require expensive installation or technical expertise. That's why we designed SolarVault 
                      as a portable, plug-and-play solution.
                    </p>
                    <p className="leading-relaxed">
                      Whether you need 100W for basic lighting or 1000W+ for your entire home, we're here 
                      to help you find the perfect solar solution that fits your needs and budget.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Direct Contact:</strong> 📧 m.jesus.erwin.suarez@email.com | 📞 09069171024
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to power your home or business with clean, portable solar energy? 
              Contact us today and let's find the perfect SolarVault solution for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Phone Contact */}
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-full bg-yellow-500 text-white flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Call Us</h3>
                    <p className="text-gray-600 mb-4">
                      Speak directly with our SolarVault specialists. We're here to answer your questions 
                      and help you choose the right power solution.
                    </p>
                    <a 
                      href="tel:09069171024" 
                      className="inline-flex items-center gap-2 text-lg font-semibold text-yellow-600 hover:text-yellow-700 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      09069171024
                    </a>
                    <p className="text-sm text-gray-500 mt-2">Available for inquiries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Contact */}
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-full bg-orange-500 text-white flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Email Us</h3>
                    <p className="text-gray-600 mb-4">
                      Send us a message and we'll get back to you within 24 hours with a personalized quote 
                      and recommendations.
                    </p>
                    <a 
                      href="mailto:m.jesus.erwin.suarez@email.com" 
                      className="inline-flex items-center gap-2 text-lg font-semibold text-orange-600 hover:text-orange-700 transition-colors break-all"
                    >
                      <Mail className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm md:text-base">m.jesus.erwin.suarez@email.com</span>
                    </a>
                    <p className="text-sm text-gray-500 mt-2">We respond within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info Card */}
          <Card className="rounded-2xl shadow-md bg-white border border-gray-200">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="p-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Talk to a SolarVault Specialist</h3>
                  <p className="text-gray-600">
                    Whether you need 100W for basic needs or 1000W+ for your entire home or office, 
                    our team is ready to help you find the perfect portable solar solution. Get a free 
                    consultation and personalized quote today.
                  </p>
                </div>
                <Button size="lg" className="rounded-xl px-8 py-6 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                  Get Free Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
