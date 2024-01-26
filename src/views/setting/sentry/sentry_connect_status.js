import React from "react";
import { Dropdown } from "antd";
import { EllipsisOutlined, GithubOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getSentryOAuthUrl } from "../../../utils/oauth/sentry";
import { updateSentryInfo, fetchSentryInfo } from "../../../services/sentry.service";
import {
  fetchSentryAuthTokenApi,
  fetchSentryProjectsApi,
  fetchSentryRefreshTokenApi,
} from "../../../apis/sentry";
import {
  findSentryProjectById,
  insertSentryProjectInfo,
  updateSentryProjectById,
} from "../../../services/sentry.service";

const SentryConnecter = (props) => {
  const { connectedSentryInfo } = props;
  // eslint-disable-next-line
  const items = [
    {
      label: (
        <a
          onClick={() => {
            fetchSentryInfo().then((res) => {
              if (res.data?.length > 0) {
                const sentryInfo = res.data[0];
                const code = sentryInfo.sentry_code;
                const install_id = sentryInfo.sentry_installation_id;
                const refresh_token = sentryInfo.sentry_refresh_token;

                fetchSentryRefreshTokenApi(refresh_token, install_id).then((res) => {
                  const token = res.data.token;
                  const refresh_token = res.data.refreshToken;
                  localStorage.setItem("sentry_access_token", token);
                  localStorage.setItem("sentry_refresh_token", refresh_token);
                  const sentryInfo = {
                    sentry_token: token,
                    sentry_refresh_token: refresh_token,
                  };
                  updateSentryInfo(sentryInfo).then((res) => {
                    console.log("add sentry token", res.data);
                  });
                });
              }
            });
          }}
        >
          Refresh Token
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          onClick={() => {
            fetchSentryProjectsApi().then((res) => {
              const projects = [...res.data];
              if (projects.length > 0) {
                projects.forEach((project, index) => {
                  const projectInfo = {
                    project_id: project.id,
                    project_name: project.name,
                    project_slug: project.slug,
                    organization_id: project.organization.id,
                    organization_slug: project.organization.slug,
                  };
                  findSentryProjectById(project.id).then((res) => {
                    const projects = [...res.data];
                    if (projects.length === 0) {
                      insertSentryProjectInfo(projectInfo);
                    } else {
                      updateSentryProjectById(projectInfo);
                    }
                  });
                });
              }
            });
          }}
        >
          Refetch Projects
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a
          onClick={() => {
            fetchSentryInfo().then((res) => {
              if (res.data?.length > 0) {
                const sentryInfo = res.data[0];
                const code = sentryInfo.sentry_code;
                const install_id = sentryInfo.sentry_installation_id;
                const refresh_token = sentryInfo.sentry_refresh_token;

                fetchSentryAuthTokenApi(code, install_id).then((res) => {
                  const token = res.data.token;
                  const refresh_token = res.data.refreshToken;
                  localStorage.setItem("sentry_access_token", token);
                  localStorage.setItem("sentry_refresh_token", refresh_token);
                  const sentryInfo = {
                    sentry_token: token,
                    sentry_refresh_token: refresh_token,
                  };
                  updateSentryInfo(sentryInfo).then((res) => {
                    console.log("add sentry token", res.data);
                  });
                });
              }
            });
          }}
        >
          Refetch Token
        </a>
      ),
      key: "2",
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
          <p className="text-[13px]"> Connect Logwise with Sentry pull requests</p>
          {connectedSentryInfo?.sentry_connect_status === true ? (
            <span className="bg-[#26a544] text-[12px] font-medium px-[3px] mx-3 rounded-[4px]">
              Enabled
            </span>
          ) : (
            <></>
          )}
        </div>
        {connectedSentryInfo?.sentry_connect_status === true ? (
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
              window.location.href = getSentryOAuthUrl();
            }}
          >
            Connect
          </button>
        )}
      </div>
      {connectedSentryInfo?.sentry_connect_status === true ? (
        <div className="px-[16px] py-[12px] mt-[12px] border border-1 border-slate-600 rounded-md bg-[#303243]">
          <div className="flex justify-start items-center">
            <span className="flex justify-start items-center gap-2">
              <span className="text-[13px]">
                {getEmailShortWord(connectedSentryInfo?.git_username)}
              </span>
              <span className="flex justify-start items-center gap-1">
                <span className="text-[13px] text-slate-400">Enabled by</span>
                <span className="bg-[#b662c7] h-[18px] w-[18px] rounded-full flex justify-center items-center">
                  <span className="text-[9px] font-medium">
                    {getEmailMark(
                      connectedSentryInfo?.git_email
                        ? connectedSentryInfo?.git_email
                        : connectedSentryInfo?.git_username
                    )}
                  </span>
                </span>
                <span className="text-[13px]">
                  {getEmailShortWord(
                    connectedSentryInfo?.git_email
                      ? connectedSentryInfo?.git_email
                      : connectedSentryInfo?.git_username
                  )}
                </span>
                <span className="text-[13px] text-slate-400">{`on ${getDate(
                  connectedSentryInfo?.sentry_connect_date
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

export default SentryConnecter;
