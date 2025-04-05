"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
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

const BlogCard = ({
  title,
  description,
  social_image,
  canonical_url,
}: BlogCardProps) => {
  return (
    <Link href={canonical_url} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg transition duration-300 cursor-pointer border border-gray-200 rounded-lg overflow-hidden">
        {/* Blog Cover Image */}
        <CardHeader className="relative h-48">
          <Image
            src={social_image || "/images/blog-placeholder.jpg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </CardHeader>

        {/* Blog Content */}
        <CardContent className="p-5">
          {/* Description (Truncated for UI) */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
