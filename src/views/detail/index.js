import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "../../services/user.service";
import { findGithubRepoWithProject } from "../../services/github.service";
import { findSentryProjectInfo } from "../../services/sentry.service";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CONNECT_SENTRY_GITHUB } from "../../utils/constants";
import {
  connectExistedSentryProjectWithGitHubRepo,
  connectNewSentryWithGitHubRepo,
} from "../../apis/sentry";

function MyDetail() {
  const [init, setInit] = useState(false);
  const [githubRepos, setGithubRepos] = useState([]);
  const [sentryProjects, setSentryProjects] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectOption, setConnectOption] = useState(CONNECT_SENTRY_GITHUB.new_project);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (connectOption === CONNECT_SENTRY_GITHUB.new_project) {
      const repositoryId = selectedRepo.repo_full_name;
      const organizationSlug = sentryProjects[0].organization_slug;
      connectNewSentryWithGitHubRepo(organizationSlug, repositoryId).then((res) => {
        console.log("connectNewProject", res.data);
      });
    } else {
      let selectedProject;
      const __project = sentryProjects.filter((project) => project.checked === true);
      if (__project.length === 0) return;
      selectedProject = __project[0];
      const repositoryId = selectedRepo.repo_full_name;
      const projectSlug = selectedProject.project_slug;
      const organizationSlug = sentryProjects[0].organization_slug;
      connectExistedSentryProjectWithGitHubRepo(organizationSlug, projectSlug, repositoryId).then(
        (res) => {
          console.log("connectExistedSentry", res.data);
        }
      );
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      getUserInfo();
      findGithubRepoWithProject().then((res) => {
        const repos = res.data;
        setGithubRepos([...repos]);
      });
      findSentryProjectInfo().then((res) => {
        const __projects = [...res.data];
        let projects = [];
        __projects.forEach((project, index) => {
          projects.push({
            ...project,
            checked: false,
          });
        });
        setSentryProjects([...projects]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  const getUserInfo = () => {
    getUser()
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const changeOptionHandler = (e) => {
    if (parseInt(e.target.value) === CONNECT_SENTRY_GITHUB.new_project) {
      setConnectOption(CONNECT_SENTRY_GITHUB.new_project);
    } else {
      setConnectOption(CONNECT_SENTRY_GITHUB.existed_project);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="h-[64px] flex items-center px-8">
        <p className="text-[14px]">GitHub repositories & Sentry projects</p>
      </div>
      <div className="">
        <div className="border-t-[1px] border-slate-600">
          <div className="border-b-[1px] border-t-[1px] px-8 border-[#212234] bg-[#20212e] h-[40px] flex items-center p-2">
            <p className="text-[13px]">Github Repositories</p>
          </div>
          <div>
            {githubRepos.length > 0 &&
              githubRepos?.map((repo, index) => (
                <div
                  key={"repo-" + index}
                  className="border-b-[1px]  px-14 border-[#212234] h-[44px] flex items-center justify-between p-2"
                >
                  <p className="text-[13px]">{repo.repo_name}</p>
                  <span
                    className="flex justify-center items-center h-[26px] w-[26px] rounded-md hover:bg-[#3b3e53]"
                    onClick={() => {
                      setSelectedRepo(repo);
                      showModal();
                    }}
                  >
                    <PlusOutlined className="text-slate-600 text-[14px] font-medium hover:text-slate-400 p-[6px]" />
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="border-t-[1px] border-b-[1px] border-slate-600">
          <div className="border-b-[1px] border-t-[1px] px-8 border-[#212234] bg-[#20212e] h-[40px] flex items-center p-2">
            <p className="text-[13px]">Sentry Projects</p>
          </div>
          <div>
            {sentryProjects.length > 0 &&
              sentryProjects?.map((project, index) => (
                <div
                  key={"project-" + index}
                  className="border-b-[1px]  px-14 border-[#212234] h-[44px] flex items-center p-2"
                >
                  <p className="text-[13px]">{project.project_name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="h-[80px]"></div>
      <Modal
        title="Connect to Sentry project"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex justify-around">
          <label className="flex items-center">
            <input
              type="radio"
              value={CONNECT_SENTRY_GITHUB.new_project}
              checked={connectOption === CONNECT_SENTRY_GITHUB.new_project}
              onChange={changeOptionHandler}
              className="custom-radio"
            />
            <p className="text-[13px] pl-2">New project</p>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value={CONNECT_SENTRY_GITHUB.existed_project}
              checked={connectOption === CONNECT_SENTRY_GITHUB.existed_project}
              onChange={changeOptionHandler}
              className="custom-radio"
            />
            <p className="text-[13px] pl-2">Existed project</p>
          </label>
        </div>
        <div
          className={`mt-[20px] py-[0px] border border-1 border-slate-600 rounded-md h-[160px] overflow-y-auto ${
            connectOption === CONNECT_SENTRY_GITHUB.new_project ? "bg-[#262735]" : "bg-[#191a23]"
          }`}
        >
          {sentryProjects.map((project, index) => (
            <div
              key={"sentry-project-" + index}
              className="border-b-[1px]  px-6 border-[#212234] h-[36px] flex items-center"
              onClick={() => {
                if (connectOption === CONNECT_SENTRY_GITHUB.new_project) return;
                let __projects = [];
                sentryProjects.forEach((origin_project, origin_index) => {
                  if (origin_index === index) {
                    __projects.push({
                      ...origin_project,
                      checked: true,
                    });
                  } else {
                    __projects.push({
                      ...origin_project,
                      checked: false,
                    });
                  }
                });
                setSentryProjects([...__projects]);
              }}
            >
              <input type="radio" checked={project.checked} readOnly className="custom-radio" />
              <p className="text-[13px] ml-4 cursor-default text-ellipsis overflow-hidden">
                {project.project_name}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default MyDetail;
