"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, ShieldCheck, Battery, Phone } from "lucide-react";

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
          SolarVault — Clean, Powerful, Reliable Energy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-2xl mx-auto mb-8"
        >
          Power your home or business with high‑efficiency solar panel systems designed for savings, sustainability, and long‑term performance.
        </motion.p>
        <Button size="lg" className="rounded-2xl px-8 py-6 text-lg shadow-xl">
          Get a Free Quote
        </Button>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SolarVault?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 text-center">
              <Sun className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Efficiency Panels</h3>
              <p className="text-gray-600">Maximize sunlight conversion with industry‑grade solar technology.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 text-center">
              <Battery className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Battery Backup Ready</h3>
              <p className="text-gray-600">Store energy efficiently to keep your home powered even at night.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Durable. Weather‑Proof.</h3>
              <p className="text-gray-600">Built to last with strong materials for any climate conditions.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Saving With Solar Today</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Reduce your electricity bill by up to 70% and enjoy energy independence.
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
            <p className="text-lg font-semibold">Talk to our Solar Experts</p>
            <p className="text-gray-600 mt-2">📞 0912‑345‑6789</p>
            <p className="text-gray-600">📧 solarvault@email.com</p>
          </div>
        </div>
      </section>
 
    </div>
  );
}
