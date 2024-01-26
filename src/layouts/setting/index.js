import { Outlet, useNavigate } from "react-router-dom";
import Lucide from "../../base-components/lucide";

function SettingLayout() {
  const navigateTo = useNavigate();

  return (
    <div className="bg-[#191a23] flex justify-start overflow-hidden w-full h-[100vh]">
      {/* BEGIN: Side Menu */}
      <div className="w-[300px] border-r border-[#344054] h-full px-2">
        <nav className="flex flex-col h-full">
          <div className="h-[65px] flex items-center px-2 py-4">
            <div
              className="flex justify-between items-center"
              onClick={() => {
                navigateTo("/dashboard");
              }}
            >
              <Lucide className="w-[18px] h-[18px] text-slate-300" icon={"ChevronLeft"} />
              <div className="text-[24px] px-[20px] cursor-default">Settings</div>
            </div>
          </div>
          <div className="grow p-2">
            <div className=" hover:bg-[#262736] rounded-md flex justify-start items-center px-2 py-2">
              <Lucide className="w-[18px] h-[18px] text-slate-300 mx-2" icon={"ChevronDown"} />
              <p className="text-[13px] cursor-default">Integrations</p>
            </div>
            <div className="flex flex-col">
              <div
                className=" hover:bg-[#262736] rounded-md flex justify-start items-center px-2 py-2 ml-10"
                onClick={() => {
                  navigateTo("/setting/integrations/github");
                }}
              >
                <p className="text-[13px] cursor-default">Github</p>
              </div>
              <div className=" hover:bg-[#262736] rounded-md flex justify-start items-center px-2 py-2 ml-10">
                <p className="text-[13px] cursor-default">GitLab</p>
              </div>
              <div
                className=" hover:bg-[#262736] rounded-md flex justify-start items-center px-2 py-2 ml-10"
                onClick={() => {
                  navigateTo("/setting/integrations/sentry");
                }}
              >
                <p className="text-[13px] cursor-default">Sentry</p>
              </div>
              <div className=" hover:bg-[#262736] rounded-md flex justify-start items-center px-2 py-2 ml-10">
                <p className="text-[13px] cursor-default">Figma</p>
              </div>
            </div>
          </div>
          <div className="h-[40px]"></div>
        </nav>
      </div>

      {/* END: Side Menu */}
      {/* BEGIN: Content */}
      <div className=" grow h-full content overflow-y-auto">
        <Outlet />
      </div>
      {/* END: Content */}
    </div>
  );
}

export default SettingLayout;
