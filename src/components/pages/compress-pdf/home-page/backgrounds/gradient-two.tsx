const GradientTwo = () => {
  return (
    <div className="gradient-container absolute w-full inset-0 -z-40 hidden xl:flex overflow-clip max-h-[90vh]">
      <div className="left-oval">
        <div className="left-shape bg-[#195bff30] dark:bg-[#4a1c1c]"></div>
      </div>
      <div className="right-oval">
        <div className="right-shape bg-[#ffedda] dark:bg-[#503426]"></div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default GradientTwo;
