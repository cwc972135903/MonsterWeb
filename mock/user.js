const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
};

const users = {
  "admin-token": {
    roles: ["admin"],
    codes: ["PagePermission", "DirectivePermission", "RolePermission", "Icons"], //菜单权限code
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin"
  },
  "editor-token": {
    roles: ["editor"],
    codes: ["DirectivePermission"], //菜单权限code
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor"
  }
};

export default [
  // user login
  // {
  //   url: "/user/login",
  //   type: "post",
  //   response: config => {
  //     const { username } = config.body;
  //     const token = tokens[username];

  //     // mock error
  //     if (!token) {
  //       return {
  //         code: 60204,
  //         message: "Account and password are incorrect."
  //       };
  //     }

  //     return {
  //       code: 20000,
  //       data: token
  //     };
  //   }
  // },

  // get user info
  // {
  //   url: "/user/info.*",
  //   type: "get",
  //   response: config => {
  //     const { token } = config.query;
  //     let info = users[token];
  //     //这里默认返回个admin的roleInfo
  //     if (!info) {
  //       info = {
  //         roles: ["admin", "inline-edit", "ieclass-add", "ieclass-delete", "ieclass-edit", 
  //                "ie-edit", "ie-add", "ie-delete", "ie-change","ie-stop", "ie-check",  
  //                "ie-errconfig", "ratingstepclass-add", "ratingstepclass-edit", "ratingstepclass-delete",
  //                "ratingstep-add","ratingstep-edit", "ratingstep-delete","ratingstepcom-add",
  //                ], //按钮权限
  //         codes: [
  //           "PagePermission",
  //           "DirectivePermission",
  //           "RolePermission",
  //           "Icons",
  //           "ratingModel",  
  //           "integrationElementList", 
  //           "ratingModelList",
  //           "ratingStepList" ,
  //           "ratingModelTemplate",
  //           "ratingModelEdit"
  //         ], //菜单权限code
  //         introduction: "I am a super administrator",
  //         avatar:
  //           "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  //         name: "Super Admin"
  //       };
  //     }

  //     // mock error
  //     if (!info) {
  //       return {
  //         code: 50008,
  //         message: "Login failed, unable to get user details.123123",
  //         info: info
  //       };
  //     }

  //     return {
  //       code: 20000,
  //       data: info
  //     };
  //   }
  // },

  // user logout
  {
    url: "/user/logout",
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },
  {
    url: "/user/department",
    type: "get",
    response: config => {
      return {
        code: 20000,
        data: [
          {
            id: "5853AC691B53400D819C4183F5D60F5F",
            label: "衡泰软件",
            children: [
              {
                id: "87A238131F044BE2B004486BA32910EB",
                label: "研发部"
              },
              {
                id: "CB85CD7E2B734D66B961AD93E5DAF472",
                label: "行政部"
              }
            ]
          },
          {
            id: "82AFE4029A3C0E31E050007F0100433E",
            label: "人保集团"
          }
        ]
      };
    }
  },
  {
    url: "/user/account",
    type: "get",
    response: config => {
      return {
        code: 20000,
        data: [
          {
            value: "lyyxzb",
            label: "lyyxzb"
          },
          {
            value: "adminzhj",
            label: "adminzhj"
          },
          {
            value: "qiaoyan",
            label: "qiaoyan"
          }
        ]
      };
    }
  }
];
