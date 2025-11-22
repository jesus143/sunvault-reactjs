"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, ShieldCheck, Battery, Phone, Box } from "lucide-react";

export default function SolarLandingPage() {
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
        <Button size="lg" className="rounded-2xl px-8 py-6 text-lg shadow-xl">
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
                  <h3 className="text-lg font-bold text-gray-900 mb-2">☀️ Important: Daytime vs Nighttime Power</h3>
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
                </ul>
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
                </ul>
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
                </ul>
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
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500 italic">Can power multiple appliances simultaneously (190W load: ~5 hrs)</p>
                </div>
              </div>
            </CardContent>
          </Card>
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

      {/* Contact Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex flex-col items-center">
            <Phone className="w-10 h-10 mb-4 text-yellow-500" />
            <p className="text-lg font-semibold">Talk to a SolarVault Specialist</p>
            <p className="text-gray-600 mt-2">📞 09069171024</p>
            <p className="text-gray-600">📧 m.jesus.erwin.suarez@email.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
