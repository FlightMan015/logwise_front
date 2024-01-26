import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SentryConnecter from "./sentry_connect_status";
import SentryCommitConnecter from "./sentry_commit_connect_status";
import {
  findSentryInfo,
  findSentryProjectById,
  insertSentryInfo,
  insertSentryProjectInfo,
  updateSentryInfo,
  updateSentryProjectById,
} from "../../../services/sentry.service";
import { fetchSentryAuthTokenApi, fetchSentryProjectsWithTokenApi } from "../../../apis/sentry";

function SentryIntegration() {
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [init, setInit] = useState(false);
  const [connectedSentryInfo, setConnectedSentryInfo] = useState({
    sentry_code: null,
    sentry_installation_id: null,
    sentry_token: null,
    sentry_refresh_token: null,
    sentry_id: null,
    sentry_connect_status: null,
    sentry_connect_date: null,
  });

  // const [connectedGitInfo, setConnectedGitInfo] = useState({
  //   git_installation_id: null,
  //   git_access_token: null,
  //   git_avatar_url: "https://avatars.githubusercontent.com/u/145702824?v=4",
  //   git_username: "radian",
  //   git_email: "radian222@proton.me",
  //   git_id: null,
  //   git_request_status: true,
  //   git_request_date: "2023-09-19",
  //   git_commit_status: true,
  //   git_commit_date: null,
  // });

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      findSentryInfo().then((res) => {
        if (res.data) {
          const sentry_data = res.data[0];
          setConnectedSentryInfo({
            ...connectedSentryInfo,
            sentry_code: sentry_data.sentry_code,
            sentry_installation_id: sentry_data.sentry_installation_id,
            sentry_token: sentry_data.sentry_token,
            sentry_id: sentry_data.sentry_id,
            sentry_connect_status: sentry_data.sentry_connect_status,
            sentry_connect_date: sentry_data.created_at,
          });
        }
      });
    }
  }, [init]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const install_id = searchParams.get("installationId");

    if (code) {
      localStorage.setItem("sentry_code", code);
      localStorage.setItem("sentry_install_id", install_id);

      const sentryInfo = {
        sentry_code: code,
        sentry_installation_id: install_id,
        sentry_connect_status: true,
      };

      findSentryInfo().then((res) => {
        if (res.data.length >= 1) {
          updateSentryInfo(sentryInfo).then((res) => {});
        } else {
          insertSentryInfo(sentryInfo).then((res) => {
            console.log("sentry_info", res);
          });
        }
      });

      fetchSentryAuthTokenApi(code, install_id).then((res) => {
        const token = res.data.token;
        const refresh_token = res.data.refreshToken;
        localStorage.setItem("sentry_access_token", token);
        localStorage.setItem("sentry_refresh_token", refresh_token);
        const sentryInfo = {
          sentry_code: code,
          sentry_installation_id: install_id,
          sentry_connect_status: true,
          sentry_token: token,
          sentry_refresh_token: refresh_token,
        };
        updateSentryInfo(sentryInfo).then((res) => {
          console.log("add sentry token", res.data);
          setConnectedSentryInfo({
            ...connectedSentryInfo,
            ...sentryInfo,
          });
        });

        fetchSentryProjectsWithTokenApi(token).then((res) => {
          const projects = [...res.data];
          console.log("projects", projects);
          if (projects.length > 0) {
            projects.forEach((project, index) => {
              const projectInfo = {
                project_id: project.id,
                project_name: project.name,
                project_slug: project.slug,
                organization_id: project.organization.id,
                organization_slug: project.organization.slug,
              };
              console.log("projectInfo", projectInfo);
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
      });
    }
  }, [location]);

  return (
    <div className="flex flex-col justify-center ">
      <div className="h-[64px]"></div>
      <div className="mx-6 flex justify-center">
        <div className="w-[640px]">
          <div className="text-[24px]">Sentry</div>
          <div className="text-[13px] ">Integrate Logwise in to your Sentry pull request</div>
          <div className="h-[20px]"></div>
          <div className="px-[20px] py-[16px] border border-1 border-slate-600 rounded-md bg-[#20212e]">
            <p className="text-[14px]">How does it works</p>
            <p className="h-[14px]"></p>
            <p className="text-[12px] text-[#9c9eac]">
              {
                "Link Logwise issues to Sentry pull requests. Automate your PR workflow so that issues update when PRs are drafted, opened, merged and when reviews are requested. You can link single or multiple issues to a specific PR. The integration also autolinks Linear issue IDs in GitHub conversations."
              }
            </p>
            <p className="h-[16px]"></p>
            <p className="text-[12px]">{"Read more"}</p>
          </div>
          <div className="my-[32px] border-b border-slate-600"></div>
          <div className="px-[20px] py-[16px] border border-1 border-slate-600 rounded-md bg-[#20212e]">
            <SentryConnecter connectedSentryInfo={connectedSentryInfo} />
          </div>
          {/* <div className="h-[20px]"></div>
          <div className="px-[20px] py-[16px] border border-1 border-slate-600 rounded-md bg-[#20212e]">
            <SentryCommitConnecter
              connectedSentryInfo={connectedSentryInfo}
              setConnectedSentryInfo={setConnectedSentryInfo}
            />
          </div> */}
          <div className="my-[32px] border-b border-slate-600"></div>
          <div className="mb-[16px]">
            <p>Setting</p>
          </div>
          <div className="px-[20px] py-[16px] border border-1 border-slate-600 rounded-md bg-[#20212e]">
            <p className="text-[14px]">Branch Format</p>
            <p className="h-[14px]"></p>
            <p className="text-[12px] text-[#9c9eac]">
              {
                "Logwise helps you keep your git branch names aligned across your entire organization. Users can copy a git branch name for their issue using the"
              }
            </p>
            <div className="my-[16px] border-b border-slate-600"></div>
            <p className="text-[14px]">Branch Format</p>
            <p className="h-[4px]"></p>
            <p className="text-[12px] text-[#9c9eac]">
              {
                "Linkbacks are messages posted to your pull request which link back to the Linear issue. They also contain the preview of the issue description."
              }
            </p>
            <p className="h-[16px]"></p>
            <p className="text-[14px] py-[6px]">Private Repository</p>
            <p className="text-[14px] py-[6px]">Public Repository</p>
          </div>
        </div>
      </div>
      <div className="h-[64px]"></div>
    </div>
  );
}

export default SentryIntegration;
