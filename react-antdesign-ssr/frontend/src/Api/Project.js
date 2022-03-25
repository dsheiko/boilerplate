import AbstractRestApi from "./AbstractRestApi";

class Project extends AbstractRestApi {
  collection = "projects";
};

export const api = new Project();