import React from "react";

function ErrorPage() {
  return (
    <div className="flex justify-center">
      <div className="w-[360px] py-[200px]">
        <div>
          <p className="text-[60px] font-semibold text-center">404</p>
          <p className="text-[16px] text-center">
            Oops. This page has gone missing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
