
-- Create services table for storing service information
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  category text,
  price_range text,
  image_url text,
  features text[],
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user favorites table
CREATE TABLE public.user_favorites (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  service_id uuid REFERENCES public.services NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, service_id)
);

-- Create service requests table
CREATE TABLE public.service_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  service_id uuid REFERENCES public.services,
  title text NOT NULL,
  description text,
  status text DEFAULT 'pending',
  priority text DEFAULT 'medium',
  requested_date date,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create files table for document/media storage
CREATE TABLE public.files (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  file_path text NOT NULL,
  file_type text,
  file_size bigint,
  uploaded_by uuid REFERENCES auth.users,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Services policies (public read, admin write)
CREATE POLICY "Anyone can view services" 
  ON public.services 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage services" 
  ON public.services 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- User favorites policies
CREATE POLICY "Users can view their own favorites" 
  ON public.user_favorites 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites" 
  ON public.user_favorites 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Service requests policies
CREATE POLICY "Users can view their own requests" 
  ON public.service_requests 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own requests" 
  ON public.service_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests" 
  ON public.service_requests 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all requests" 
  ON public.service_requests 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can update all requests" 
  ON public.service_requests 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Files policies
CREATE POLICY "Users can view files they uploaded" 
  ON public.files 
  FOR SELECT 
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can upload files" 
  ON public.files 
  FOR INSERT 
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Admins can view all files" 
  ON public.files 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can manage all files" 
  ON public.files 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Storage policies
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all files"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- Insert some sample services
INSERT INTO public.services (name, description, category, price_range, features) VALUES
('Business Consulting', 'Strategic business planning and optimization services', 'Consulting', '$200-500/hour', ARRAY['Strategy Development', 'Market Analysis', 'Process Optimization']),
('Web Development', 'Custom website and web application development', 'Technology', '$50-150/hour', ARRAY['Responsive Design', 'E-commerce', 'CMS Integration']),
('Digital Marketing', 'Comprehensive digital marketing and SEO services', 'Marketing', '$100-300/hour', ARRAY['SEO Optimization', 'Social Media Management', 'Content Creation']),
('Financial Planning', 'Personal and business financial advisory services', 'Finance', '$150-400/hour', ARRAY['Investment Planning', 'Tax Strategy', 'Risk Management']);

-- Create a function for AI-powered service search
CREATE OR REPLACE FUNCTION search_services(search_query text)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  category text,
  price_range text,
  features text[],
  relevance_score float
) 
LANGUAGE sql
AS $$
  SELECT 
    s.id,
    s.name,
    s.description,
    s.category,
    s.price_range,
    s.features,
    (
      CASE 
        WHEN s.name ILIKE '%' || search_query || '%' THEN 3
        ELSE 0
      END +
      CASE 
        WHEN s.description ILIKE '%' || search_query || '%' THEN 2
        ELSE 0
      END +
      CASE 
        WHEN s.category ILIKE '%' || search_query || '%' THEN 1.5
        ELSE 0
      END +
      CASE 
        WHEN EXISTS (
          SELECT 1 FROM unnest(s.features) feature 
          WHERE feature ILIKE '%' || search_query || '%'
        ) THEN 1
        ELSE 0
      END
    )::float AS relevance_score
  FROM public.services s
  WHERE 
    s.name ILIKE '%' || search_query || '%'
    OR s.description ILIKE '%' || search_query || '%'
    OR s.category ILIKE '%' || search_query || '%'
    OR EXISTS (
      SELECT 1 FROM unnest(s.features) feature 
      WHERE feature ILIKE '%' || search_query || '%'
    )
  ORDER BY relevance_score DESC, s.name;
$$;
