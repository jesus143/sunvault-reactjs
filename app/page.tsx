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
        <p className="text-center text-gray-600 mb-12">
          From basic home backup to full portable power solutions.
        </p>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[100, 300, 500, 1000].map((w) => (
            <Card key={w} className="rounded-2xl shadow-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">{w}W</h3>
                <p className="text-gray-600">
                  Ideal for {w === 100 ? "lights & charging" : 
                            w === 300 ? "appliances" :
                            w === 500 ? "heavier loads" :
                            "tools, fans, TVs, and more"}
                </p>
              </CardContent>
            </Card>
          ))}
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
