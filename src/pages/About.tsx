
import React from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Heart,
  Target,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import LazyImage from '@/components/Performance/LazyImage';

const About = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Cities Served", icon: Target },
    { number: "4.9★", label: "Average Rating", icon: Star },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Every professional is background-checked, insured, and verified for your complete peace of mind."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We maintain the highest standards with 100% satisfaction guarantee on all services."
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "Same-day service available with rapid response times when you need help most."
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "Your satisfaction is our priority. We go above and beyond to exceed expectations."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&auto=format&q=80",
      bio: "Former VP at ServiceTech, passionate about connecting people with trusted professionals."
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format&q=80",
      bio: "15+ years in service operations, ensuring seamless experiences for customers and providers."
    },
    {
      name: "Emily Johnson",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format&q=80",
      bio: "Tech innovator focused on building scalable platforms that make service booking effortless."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize home services"
    },
    {
      year: "2021",
      title: "1,000 Customers",
      description: "Reached our first major milestone in customer satisfaction"
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Expanded services to 25+ cities across the country"
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched AI-powered matching for optimal service connections"
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as the #1 trusted service platform nationwide"
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" }
  ];

  const faqs = [
    {
      question: "When was ServiceMaster Pro founded?",
      answer: "ServiceMaster Pro was founded in 2020 with a mission to revolutionize the home services industry by connecting customers with verified professionals."
    },
    {
      question: "How many customers does ServiceMaster Pro serve?",
      answer: "We proudly serve over 10,000 customers across 50+ cities nationwide, with a 4.8-star average rating."
    },
    {
      question: "What makes ServiceMaster Pro different?",
      answer: "Our commitment to quality through rigorous background checks, 100% satisfaction guarantee, and 24/7 customer support sets us apart."
    },
    {
      question: "How does ServiceMaster Pro verify professionals?",
      answer: "Every professional undergoes background checks, insurance verification, and skill assessments before joining our platform."
    }
  ];

  return (
    <>
      <SEOHead
        title="About Us - ServiceMaster Pro | Trusted Professional Services Since 2020"
        description="Learn about ServiceMaster Pro's mission to connect you with verified professionals. Our story, values, and commitment to quality service since 2020. Serving 10,000+ customers nationwide."
        keywords="about servicemasterpro, company history, professional services, trusted platform, verified professionals, home services company"
        canonical="/about"
        schemaType="AboutPage"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        publishedTime="2020-01-01T00:00:00Z"
        modifiedTime="2024-03-15T10:00:00Z"
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 gradient-bg-subtle opacity-50"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  Est. 2020 • Trusted by 10,000+ Customers
                </Badge>
              </div>
              
              <h1 className="animate-fade-in animate-delay-100 text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                Connecting You with
                <br />
                <span className="gradient-text">Trusted Professionals</span>
              </h1>
              
              <p className="animate-fade-in animate-delay-200 text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Since 2020, we've been on a mission to make professional services accessible, 
                reliable, and affordable for everyone. Your satisfaction is our success.
              </p>

              <div className="animate-fade-in animate-delay-300 flex flex-wrap justify-center gap-8 mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-primary mr-2" />
                      <span className="text-3xl font-bold">{stat.number}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  ServiceMaster Pro was born from a simple frustration: finding reliable, 
                  trustworthy professionals shouldn't be a gamble. Our founders experienced 
                  firsthand the challenges of connecting with quality service providers.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We set out to create a platform where customers could book services with 
                  confidence, knowing every professional is verified, insured, and committed 
                  to excellence. Today, we're proud to be the most trusted name in professional services.
                </p>
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">Background-checked professionals</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">100% satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">24/7 customer support</span>
                </div>
              </div>
              
              <div className="animate-fade-in animate-delay-200">
                <LazyImage
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format&q=80"
                  alt="ServiceMaster Pro team working together"
                  className="rounded-xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and every decision we make
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className={`card-professional text-center animate-fade-in animate-delay-${index * 100 + 100}`}>
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 gradient-bg rounded-full flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Passionate professionals dedicated to transforming the service industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className={`card-professional text-center animate-fade-in animate-delay-${index * 100 + 200}`}>
                  <CardContent className="pt-6">
                    <LazyImage
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Key milestones that shaped ServiceMaster Pro into the platform it is today
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>
                
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    
                    {/* Content */}
                    <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                      <Card className={`card-professional animate-fade-in animate-delay-${index * 100 + 300}`}>
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-2">{milestone.year}</Badge>
                          <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ServiceMaster Pro for their service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-4 text-lg hover-lift"
                asChild
              >
                <Link to="/services">
                  Browse Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-white/30 text-white hover:bg-white/10 hover-lift" 
                asChild
              >
                <Link to="/auth">Join as Professional</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
