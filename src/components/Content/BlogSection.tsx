
"use client";

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import LazyImage from '@/components/Performance/LazyImage';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Essential Home Maintenance Tips for Every Season',
    excerpt: 'Learn how to keep your home in perfect condition year-round with our comprehensive seasonal maintenance guide.',
    author: 'Sarah Chen',
    publishDate: '2024-06-10',
    readTime: '5 min read',
    category: 'Home Maintenance',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'When to Call a Professional vs DIY: A Complete Guide',
    excerpt: 'Understand when you can tackle home repairs yourself and when it\'s time to call in the experts.',
    author: 'Michael Rodriguez',
    publishDate: '2024-06-08',
    readTime: '7 min read',
    category: 'DIY vs Professional',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop&auto=format&q=80'
  },
  {
    id: '3',
    title: 'Top 10 Energy-Saving Home Improvements',
    excerpt: 'Discover the most effective ways to reduce your energy bills while increasing your home\'s value.',
    author: 'Emily Johnson',
    publishDate: '2024-06-05',
    readTime: '6 min read',
    category: 'Energy Efficiency',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&auto=format&q=80'
  },
  {
    id: '4',
    title: 'Spring Cleaning: A Room-by-Room Professional Guide',
    excerpt: 'Get your home spotless with our detailed spring cleaning checklist used by professional cleaners.',
    author: 'David Kim',
    publishDate: '2024-06-02',
    readTime: '8 min read',
    category: 'Cleaning',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=400&fit=crop&auto=format&q=80'
  }
];

export const BlogSection: React.FC = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Home Maintenance': 'bg-blue-100 text-blue-800',
      'DIY vs Professional': 'bg-green-100 text-green-800',
      'Energy Efficiency': 'bg-yellow-100 text-yellow-800',
      'Cleaning': 'bg-purple-100 text-purple-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Latest Insights
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Expert Tips & Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest home service tips, maintenance guides, and industry insights from our experts.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12 animate-fade-in">
            <Card className="overflow-hidden border-2 border-primary/20 hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <LazyImage
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(featuredPost.category)}`}>
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="outline" className={`self-start mb-3 ${getCategoryColor(featuredPost.category)}`}>
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button className="self-start hover-glow">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {regularPosts.map((post, index) => (
            <Card key={post.id} className={`overflow-hidden hover-lift animate-fade-in animate-delay-${index * 100 + 200}`}>
              <div className="relative">
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}>
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 leading-tight hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-between group">
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="hover-lift">
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
