import React from "react";
import { getGitHubInstallUrl, getGitHubUrl } from "../../../utils/oauth/github";
import { Dropdown, Space } from "antd";
import { useLocation } from "react-router-dom";
import { EllipsisOutlined, GithubOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const GitHubConnecter = (props) => {
  const { connectedGitInfo } = props;
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const items = [
    {
      label: <a href={getGitHubUrl(from)}>Connect new organization...</a>,
      key: "0",
    },
    {
      label: (
        <a target="_blank" href={`https://github.com/apps/logwise-dev-app/installations/new`}>
          Configure integration...
        </a>
      ),
      key: "1",
    },
  ];

  const getEmailShortWord = (email) => {
    if (!email) return "";
    const result = email.match(/([^@]+)/)[1];
    return result;
  };

  const getEmailMark = (email) => {
    if (!email) return "";
    const result = email.substring(0, 2).toUpperCase();
    return result;
  };

  const getDate = (date) => {
    const __date = new Date(date);
    const result = dayjs(__date).format("MMM D");
    return result;
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <GithubOutlined className="mr-3" />
          <p className="text-[13px]"> Connect Logwise with GitHub pull requests</p>
          {connectedGitInfo?.git_request_status === true ? (
            <span className="bg-[#26a544] text-[12px] font-medium px-[3px] mx-3 rounded-[4px]">
              Enabled
            </span>
          ) : (
            <></>
          )}
        </div>
        {connectedGitInfo?.git_request_status === true ? (
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <span className="flex justify-center items-center h-[26px] w-[26px] rounded-md hover:bg-[#3b3e53]">
                <EllipsisOutlined />
              </span>
            </a>
          </Dropdown>
        ) : (
          <button
            className="btn-primary rounded-md text-[13px] px-[14px] py-[6px]"
            onClick={() => {
              window.location.href = getGitHubUrl(from);
            }}
          >
            Connect
          </button>
        )}
      </div>
      {connectedGitInfo?.git_request_status === true ? (
        <div className="px-[16px] py-[12px] mt-[12px] border border-1 border-slate-600 rounded-md bg-[#303243]">
          <div className="flex justify-start items-center">
            <img
              alt="avatar"
              src={connectedGitInfo?.git_avatar_url}
              className="h-[20px] w-[20px] rounded-sm mr-[12px]"
            ></img>
            <span className="flex justify-start items-center gap-2">
              <span className="text-[13px]">
                {getEmailShortWord(connectedGitInfo?.git_username)}
              </span>
              <span className="flex justify-start items-center gap-1">
                <span className="text-[13px] text-slate-400">Enabled by</span>
                <span className="bg-[#b662c7] h-[18px] w-[18px] rounded-full flex justify-center items-center">
                  <span className="text-[9px] font-medium">
                    {getEmailMark(
                      connectedGitInfo?.git_email
                        ? connectedGitInfo?.git_email
                        : connectedGitInfo?.git_username
                    )}
                  </span>
                </span>
                <span className="text-[13px]">
                  {getEmailShortWord(
                    connectedGitInfo?.git_email
                      ? connectedGitInfo?.git_email
                      : connectedGitInfo?.git_username
                  )}
                </span>
                <span className="text-[13px] text-slate-400">{`on ${getDate(
                  connectedGitInfo?.git_request_date
                )}`}</span>
              </span>
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default GitHubConnecter;
