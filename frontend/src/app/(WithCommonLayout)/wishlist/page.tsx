import WishList from "@/components/modules/wishlist/WishList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your wish list",
};

const WishListPage = () => {
  return (
    <div>
      <WishList />
    </div>
  );
};

export default WishListPage;
