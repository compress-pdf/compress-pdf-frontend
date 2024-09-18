const GradientOne = () => {
  return (
    <div className="gradient-container absolute w-full inset-0 -z-40 hidden xl:flex overflow-clip">
      <div className="left-oval">
        <div className="left-shape bg-[#195bff30] dark:bg-[#195bff30]"></div>
      </div>
      <div className="right-oval">
        <div className="right-shape bg-[#ffab4530] dark:bg-[#195bff30]"></div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default GradientOne;
