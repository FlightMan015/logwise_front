import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGithubDataApi, fetchGithubReposWithTokenApi } from "../../../apis/github";
import axios from "axios";
import GitHubConnecter from "./git_connect_status";
import GithubCommitConnecter from "./git_commit_connect_status";
import {
  findGithubInfo,
  findGithubRepoById,
  insertGithubInfo,
  insertGithubRepoInfo,
  updateGithubInfo,
  updateGithubRepoById,
} from "../../../services/github.service";

function GithubIntegration() {
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [init, setInit] = useState(false);
  const [connectedGitInfo, setConnectedGitInfo] = useState({
    git_installation_id: null,
    git_access_token: null,
    git_avatar_url: null,
    git_username: null,
    git_email: null,
    git_id: null,
    git_request_status: null,
    git_request_date: null,
    git_commit_status: null,
    git_commit_date: null,
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
      findGithubInfo().then((res) => {
        const git_data = res.data[0];
        setConnectedGitInfo({
          git_installation_id: git_data.git_installation_id,
          git_access_token: git_data.git_access_token,
          git_avatar_url: git_data.git_avatar_url,
          git_username: git_data.git_username,
          git_email: git_data.git_email,
          git_id: git_data.git_id,
          git_request_status: git_data.git_request_status,
          git_request_date: git_data.created_at,
          git_commit_status: git_data.git_commit_status,
          git_commit_date: git_data.git_commit_date,
        });
      });
    }
    // eslint-disable-next-line
  }, [init]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const installationId = searchParams.get("installation_id");

    if (code) {
      localStorage.setItem("github_code", code);
      localStorage.setItem("github_installation_id", installationId);
      console.log("git_code", code);
      console.log("git_state", state);
      console.log("redirect_url", process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URL);

      const githubInfo = {
        git_code: code,
        git_installation_id: installationId,
      };

      findGithubInfo().then((res) => {
        if (res.data.length >= 1) {
          updateGithubInfo(githubInfo).then((res) => {});
        } else {
          insertGithubInfo(githubInfo).then((res) => {
            console.log("githubs_info", res);
            localStorage.setItem("githubs_db_info", res.data);
          });
        }
      });

      axios
        .post("/api/git_access_token", {
          code,
        })
        .then((res) => {
          console.log("git_token", res.data);
          const access_token = res.data.access_token;
          localStorage.setItem("git_access_token", access_token);

          fetchGithubDataApi(access_token).then((res) => {
            console.log("github_data", res.data);
            console.log("github_data", res.data);
            const git_data = res.data;

            const info = {
              git_access_token: access_token,
              git_avatar_url: git_data.avatar_url,
              git_username: git_data.login,
              git_email: git_data.email,
              git_id: git_data.id,
              git_request_status: true,
            };

            updateGithubInfo(info)
              .then((res) => {
                setConnectedGitInfo({
                  ...connectedGitInfo,
                  ...info,
                });
                // const url = `https://github.com/settings/installations/${installationId}`;
                // const newTab = window.open(url, "_blank");
                // newTab.focus();
              })
              .catch((err) => {
                console.log("err", err);
              });
          });

          fetchGithubReposWithTokenApi(access_token).then((res) => {
            const repos = [...res.data];
            localStorage.setItem("git_repos", JSON.stringify(repos));
            if (repos.length >= 1) {
              repos.forEach((repo) => {
                const info = {
                  repo_id: repo.id,
                  repo_url: repo.html_url,
                  repo_name: repo.name,
                  repo_full_name: repo.full_name,
                };
                findGithubRepoById(repo.id).then((res) => {
                  if (res.data.length > 0) {
                    updateGithubRepoById(info);
                  } else {
                    insertGithubRepoInfo(info);
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
          <div className="text-[24px]">Github</div>
          <div className="text-[13px] ">Integrate Logwise in to your github pull request</div>
          <div className="h-[20px]"></div>
          <div className="px-[20px] py-[16px] border border-1 border-slate-600 rounded-md bg-[#20212e]">
            <p className="text-[14px]">How does it works</p>
            <p className="h-[14px]"></p>
            <p className="text-[12px] text-[#9c9eac]">
              {
                "Link Logwise issues to GitHub pull requests. Automate your PR workflow so that issues update when PRs are drafted, opened, merged and when reviews are requested. You can link single or multiple issues to a specific PR. The integration also autolinks Linear issue IDs in GitHub conversations."
              }
            </p>
            <p className="h-[16px]"></p>
            <p className="text-[12px]">{"Read more"}</p>
          </div>
          <div className="my-[32px] border-b border-slate-600"></div>
          <div className="px-[20px] py-[16px] border border-1 border-slate-600 rounded-md bg-[#20212e]">
            <GitHubConnecter connectedGitInfo={connectedGitInfo} />
          </div>
          <div className="h-[20px]"></div>
          <div className="px-[20px] py-[16px] border border-1 border-slate-600 rounded-md bg-[#20212e]">
            <GithubCommitConnecter
              connectedGitInfo={connectedGitInfo}
              setConnectedGitInfo={setConnectedGitInfo}
            />
          </div>
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

export default GithubIntegration;
