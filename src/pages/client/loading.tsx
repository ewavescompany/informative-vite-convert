import PageLoader from "@/customComponents/pageLoader";

export default function Loading() {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  );
}
