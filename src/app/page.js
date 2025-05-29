import HeroSection from "@/components/hero";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="mt-40">
      
      {/* Hero Section */}
        <HeroSection />

       {/* stats Section */}
        <section className="py-20 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-emerald-900">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-emerald-300 via-teal-400 to-blue-500 animate-gradient">
                <CardContent className="space-y-4 pt-4 text-blue-800 ">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-neutral-50">{feature.title}</h3>
                  <p className="text-gray-100">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     {/* How It works -- Section */}
      <section className="py-20 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto my-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Testimonials Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-800">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonialsData, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                     src={testimonialsData.image}
                     alt={testimonialsData.name}
                     width={40}
                     height={40}
                     className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonialsData.name}</div>
                      <div className="text-sm text-gray-600">{testimonialsData.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonialsData.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-700 animate-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Ready To Take Control Of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with FinIntel
          </p>
          <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-white text-teal-800 hover:bg-blue-50
            animate-bounce"
          >
            Start a Free Trial
          </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}