import React from "react";
import dayjs from "dayjs";
import { updateGithubInfo } from "../../../services/github.service";
import { GithubOutlined } from "@ant-design/icons";

const GithubCommitConnecter = (props) => {
  const { connectedGitInfo, setConnectedGitInfo } = props;

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

  const connectCommitHandler = () => {
    updateGithubInfo({
      git_commit_status: true,
      git_commit_date: new Date(),
    }).then((res) => {
      setConnectedGitInfo({
        ...connectedGitInfo,
        git_commit_status: true,
      });
    });
  };
  const disConnectCommitHandler = () => {
    updateGithubInfo({
      git_commit_status: false,
      git_commit_date: new Date(),
    }).then((res) => {
      setConnectedGitInfo({
        ...connectedGitInfo,
        git_commit_status: false,
      });
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <GithubOutlined className="mr-3" />
          <p className="text-[13px]">Connect Logwise with GitHub commits</p>
          {connectedGitInfo?.git_commit_status === true ? (
            <span className="bg-[#26a544] text-[12px] font-medium px-[3px] mx-3 rounded-[4px]">
              Enabled
            </span>
          ) : (
            <></>
          )}
        </div>
        {connectedGitInfo?.git_commit_status === true ? (
          <button
            className="btn-secondary rounded-md text-[13px] px-[14px] py-[6px]"
            onClick={disConnectCommitHandler}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="btn-primary rounded-md text-[13px] px-[14px] py-[6px]"
            onClick={connectCommitHandler}
          >
            Connect Commits
          </button>
        )}
      </div>
      {connectedGitInfo?.git_commit_status === true ? (
        <div className="ml-[24px] mt-[12px] border-t pt-[16px] px-[4px] border-slate-600">
          <div className="flex justify-start items-center">
            <span className="flex justify-start items-center gap-2">
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
                <span className="text-[13px] text-[#8687ff]">
                  {getEmailShortWord(
                    connectedGitInfo?.git_email
                      ? connectedGitInfo?.git_email
                      : connectedGitInfo?.git_username
                  )}
                </span>
                <span className="text-[13px] text-slate-400">{`on ${getDate(
                  connectedGitInfo?.git_commit_date
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

export default GithubCommitConnecter;
