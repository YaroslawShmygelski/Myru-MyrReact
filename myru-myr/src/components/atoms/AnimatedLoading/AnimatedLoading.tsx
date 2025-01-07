import { LoaderCircle } from "lucide-react";

export const AnimatedLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <LoaderCircle
          size={64}
          className="text-blue-500 animate-spin mx-auto mb-4"
        />
        <div className="text-gray-700 text-xl font-semibold">Loading...</div>
      </div>
    </div>
  );
};
