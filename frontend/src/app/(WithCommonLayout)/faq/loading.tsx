import LoadingSpinner from "@/components/modules/LoadingSpinner/LoadingSpinner";
const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default loading;
