import React from "react";

function HomePage() {
  return (
    <div className="flex justify-center">
      <div className="w-[800px] py-[100px]">
        <div className="my-[20px]">
          <p className="text-[80px] font-medium text-center tracking-tight leading-none ">
            Logwise is a better way to build products
          </p>
        </div>
        <div className="my-[30px]">
          <p className="text-[22px] text-center">
            Meet the new standard for modern software development.
          </p>
          <p className="text-[22px] text-center">
            Streamline issues, sprints, and product roadmaps.
          </p>
        </div>
        <div className="my-[40px] flex justify-center">
          <button
            className="px-[30px] btn-primary h-[48px] "
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            {"Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
