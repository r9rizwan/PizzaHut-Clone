import Skeleton from "react-loading-skeleton";
import { Card } from "@/components/ui";

const SkeletonCard = () => (
  <Card className="flex flex-col p-0 m-0 h-[380px] w-full transition-all duration-300 transform shadow-lg border rounded-lg">
    {/* Image Section */}
    <div className="h-40 overflow-hidden rounded-t-lg">
      <Skeleton className="w-full h-full" />
    </div>

    {/* Content Section */}
    <div className="h-[140px] flex flex-col pb-3 px-4">
      <div className="flex flex-col flex-grow justify-center">
        {/* Title Skeleton */}
        <Skeleton className="h-6 mb-2 w-2/3" />
        {/* Description Skeleton */}
        <Skeleton className="h-4 mb-4 w-full" />
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center">
        {/* Price Skeleton */}
        <Skeleton className="h-6 w-1/3" />
        {/* Button Skeleton */}
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  </Card>
);

export default SkeletonCard;
