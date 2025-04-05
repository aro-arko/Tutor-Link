import Blogs from "@/components/modules/blogs/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs and articles",
};

const blogPage = () => {
  return (
    <div>
      <Blogs />
    </div>
  );
};

export default blogPage;
