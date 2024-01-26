import { Outlet, useNavigate } from "react-router-dom";
import Lucide from "../../base-components/lucide";
import UserSetting from "./user_setting";

function SideMenu() {
  const navigateTo = useNavigate();

  return (
    <div className="bg-[#191a23] flex justify-start overflow-hidden w-full h-[100vh]">
      {/* BEGIN: Side Menu */}
      <div className="w-[300px] border-r border-[#344054] h-full px-2">
        <nav className="flex flex-col h-full">
          <div className="h-[100px] flex flex-col px-2 py-4 mb-4">
            <div className="flex justify-between items-center mb-[10px]">
              <div className=" hover:bg-[#262736] rounded-md flex justify-start items-center p-2">
                <div className=" rounded w-[18px] h-[18px] bg-[#4a9429] mr-2"></div>
                <p className="text-[12px] cursor-default">WorkSpace</p>
              </div>
              <div className="hover:bg-[#262736] rounded-md flex justify-center items-center p-1 w-[30px] h-[30px]">
                <UserSetting />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="grow bg-[#252636] h-[28px] mr-2 rounded-md border border-[#344054] flex items-center">
                <Lucide className="w-[18px] h-[18px] mx-2 text-slate-300" icon={"FileEdit"} />
              </div>
              <div className="rounded-md flex justify-center items-center w-[30px] h-[30px]">
                <div className="w-[28px] h-[28px] bg-[#252636] rounded-md border border-[#344054] flex items-center justify-center">
                  <Lucide className="w-[18px] h-[18px] text-slate-300" icon={"Search"} />
                </div>
              </div>
            </div>
          </div>
          <div className="grow px-2">
            <div className=" hover:bg-[#262736] rounded-md flex justify-start items-center p-2">
              <Lucide className="w-[18px] h-[18px] text-slate-300 mr-2" icon={"Inbox"} />
              <p className="text-[12px] cursor-default">Inbox</p>
            </div>
            <div className=" hover:bg-[#262736] rounded-md flex justify-start items-center p-2">
              <Lucide className="w-[18px] h-[18px] text-slate-300 mr-2" icon={"SquareDot"} />
              <p className="text-[12px] cursor-default">My issues</p>
            </div>
            <div className=" hover:bg-[#262736] rounded-md flex justify-start items-center p-2">
              <Lucide className="w-[18px] h-[18px] text-slate-300 mr-2" icon={"Files"} />
              <p className="text-[12px] cursor-default">Views</p>
            </div>
            <div
              className=" hover:bg-[#262736] rounded-md flex justify-start items-center p-2"
              onClick={() => {
                navigateTo("/setting/integrations/github");
              }}
            >
              <Lucide className="w-[18px] h-[18px] text-slate-300 mr-2" icon={"Github"} />
              <p className="text-[12px] cursor-default">Link Github</p>
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

export default SideMenu;
