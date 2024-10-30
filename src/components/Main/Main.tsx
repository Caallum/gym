"use client";

export default function MainPage() {
  return (
    <>
      <div className="md:w-[95%] h-full w-full absolute left-1/2 -translate-x-1/2 md:mt-2">
        <div className="md:rounded-lg sm:rounded-b-lg navbar bg-base-200">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl">Gym Website</a>
          </div>
          <div className="navbar-end">
            <a href="/api/logout" className="btn btn-error">
              Logout
            </a>
          </div>
        </div>
        <div className="bg-base-300 rounded-lg w-full h-full my-3">
          
        </div>
      </div>
    </>
  );
}
