import PageLoader from "@/customComponents/pageLoader";

function loading() {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  );
}

export default loading;
