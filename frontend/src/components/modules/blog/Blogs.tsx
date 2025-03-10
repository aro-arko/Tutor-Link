"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  social_image?: string;
  readable_publish_date: string;
  canonical_url: string;
  user: {
    name: string;
    profile_image?: string;
  };
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://dev.to/api/articles?tag=education&per_page=6"
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        Blogs & Resources
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Explore educational tips, platform updates, and industry news.
      </p>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} {...blog} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
