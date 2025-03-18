import AbstractRestApi from "./AbstractRestApi";

class Login extends AbstractRestApi {
  collection = "login";
};

export const api = new Login();