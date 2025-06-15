
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schemaType?: 'LocalBusiness' | 'WebPage' | 'AboutPage' | 'ContactPage' | 'Service' | 'Article' | 'FAQPage';
  breadcrumbs?: Array<{ name: string; url: string }>;
  services?: Array<{ name: string; description: string; price?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  reviews?: Array<{ rating: number; author: string; text: string; date: string }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  image = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop",
  type = "website",
  author = "ServiceMaster Pro",
  publishedTime,
  modifiedTime,
  schemaType = "WebPage",
  breadcrumbs,
  services,
  faqs,
  reviews
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://servicemasterpro.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  // Base organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    "name": "ServiceMaster Pro",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/icon-512.png`,
      "width": 512,
      "height": 512
    },
    "description": "Professional home services platform connecting customers with verified service providers",
    "telephone": "(555) 123-4567",
    "email": "contact@servicemasterpro.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Service Street",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$50-$500",
    "areaServed": {
      "@type": "State",
      "name": "Your State"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "372",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://facebook.com/servicemasterpro",
      "https://twitter.com/servicemasterpro",
      "https://linkedin.com/company/servicemasterpro"
    ]
  };

  // Generate page-specific schema
  const generatePageSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "@id": fullCanonical,
      "url": fullCanonical,
      "name": title,
      "description": description,
      "image": fullImage,
      "publisher": {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullCanonical
      }
    };

    // Add breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      baseSchema["breadcrumb"] = {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": `${siteUrl}${crumb.url}`
        }))
      };
    }

    // Add services if provided
    if (services && services.length > 0) {
      baseSchema["hasOfferCatalog"] = {
        "@type": "OfferCatalog",
        "name": "Professional Services",
        "itemListElement": services.map((service, index) => ({
          "@type": "Offer",
          "position": index + 1,
          "itemOffered": {
            "@type": "Service",
            "name": service.name,
            "description": service.description,
            ...(service.price && { "offers": {
              "@type": "Offer",
              "price": service.price,
              "priceCurrency": "USD"
            }})
          }
        }))
      };
    }

    // Add FAQs if provided
    if (faqs && faqs.length > 0) {
      baseSchema["mainEntity"] = faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }));
    }

    // Add reviews if provided
    if (reviews && reviews.length > 0) {
      baseSchema["review"] = reviews.map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewBody": review.text,
        "datePublished": review.date
      }));
    }

    // Add article-specific properties
    if (schemaType === "Article") {
      baseSchema["author"] = {
        "@type": "Person",
        "name": author
      };
      if (publishedTime) baseSchema["datePublished"] = publishedTime;
      if (modifiedTime) baseSchema["dateModified"] = modifiedTime;
    }

    return baseSchema;
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "ServiceMaster Pro",
    "description": "Professional home services platform",
    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/services?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="ServiceMaster Pro" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@servicemasterpro" />
      <meta name="twitter:creator" content="@servicemasterpro" />
      
      {/* Article Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Structured Data - Page Specific */}
      <script type="application/ld+json">
        {JSON.stringify(generatePageSchema())}
      </script>
    </Helmet>
  );
};

export default SEOHead;
