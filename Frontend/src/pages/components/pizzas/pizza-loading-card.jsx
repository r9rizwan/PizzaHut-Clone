export const PizzaLoadingCard = () => {
  return (
    <div className="duration-50 h-[420px] w-full animate-pulse rounded-lg border border-gray-300 bg-gray-100">
      <div className="h-[240px] w-full bg-gray-300"></div>
      <div className="mt-4">
        <div className="h-8 w-1/2 rounded-r-lg bg-gray-300"></div>
        <div className="mt-4 h-12 w-11/12 rounded-r-lg bg-gray-300"></div>
        <div className="mx-5 mt-4 flex justify-between">
          <div className="h-8 w-14 rounded-lg bg-gray-300"></div>
          <div className="h-8 w-14 rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};
