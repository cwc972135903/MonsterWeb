const menus = [
  {
    path: "/demo",
    componentPath: "/layout",
    redirect: "/demo/normal",
    alwaysShow: true,
    isLayout: true,
    meta: {
      title: "demoLayout",
      icon: "example"
    },
    children: [
      {
        path: "normal",
        componentPath: "/demo/normal/list",
        name: "NormalList",
        meta: { title: "normalList", icon: "edit" }
      },
      {
        path: "dialog",
        componentPath: "/demo/dialogRequest/list",
        name: "DialogList",
        meta: { title: "dialogList", icon: "edit" }
      },
      {
        path: "leftRight",
        componentPath: "/demo/leftRight/list",
        name: "LeftRight",
        meta: { title: "leftRight", icon: "edit" }
      }
    ]
  },
  {
    path: "/layoutManage",
    componentPath: "/layout",
    redirect: "noredirect",
    alwaysShow: true,
    isLayout: true,
    meta: {
      title: "layoutManage",
      icon: "example"
    },
    children: [ 
      {
        //布局配置字段
        path: "fieldSetting",
        componentPath: "/layout/layoutField/fieldSetting",
        name: "FieldSetting",
        meta: { title: "fieldSetting", icon: "edit" }
      },
      {
        //布局配置组件
        path: "layoutGroupSetting",
        componentPath: "/layout/layoutGroup/layoutGroupSetting",
        name: "LayoutGroupSetting",
        meta: { title: "layoutGroupSetting", icon: "edit", myParam: "test" }
      },
      {
        //布局配置页面
        path: "layoutsetting",
        componentPath: "/layout/layoutSetting/layoutSetting",
        name: "LayoutSetting",
        meta: { title: "layoutSetting", icon: "edit" }
      },
      {
        //布局配置字段列表管理
        path: "fieldList",
        componentPath: "/layout/layoutField/list",
        name: "FieldList",
        meta: { title: "fieldList", icon: "edit" }
      },
      {
        //布局组件列表管理
        path: "layoutComponentList",
        componentPath: "/layout/layoutSetting/list",
        name: "LayoutComponentList",
        meta: { title: "layoutComponentList", icon: "edit" }
      },  
      { 
        //配置页面单独做菜单，模式跟配置组件单独做菜单格式一样
        //componentCode即account。 区别componentPath为type对应的不同路径
        //desktop页面  
        path: "myDesktop",
        componentPath: "/sys/desktop/index",
        name: "myDesktop",
        meta: {
          title: "myDesktop",
          icon: "edit",
          componentCode: ""//针对type=desktop而已，componentCode(即account)可为空
        }
      }, 
    ]
  },
  {
    path: "/sys",
    componentPath: "/layout",
    redirect: "/sys/userlist",
    alwaysShow: true,
    isLayout: true,
    meta: {
      title: "sysManage",
      icon: "example"
    },
    children: [
      {
        path: "menu",
        componentPath: "/sys/menu/list",
        name: "MenuList",
        meta: { title: "menuList", icon: "edit" }
      },
      {
        path: "userlist",
        componentPath: "/user/userList",
        name: "UserList",
        meta: { title: "userList", icon: "edit" }
      }, 
      //name这里两个name一致（为了keeplive）会有警告，暂时未发现不适之处，后期若有问题可考虑用重定向
      // {
      //   path: "layoutGroupTemplate1",
      //   componentPath: "/layout/layoutGroupTemplate",
      //   name: "LayoutGroupTemplate",
      //   meta: { title: "配置组件1", icon: "edit", componentCode: "userList" }
      // },
      {
        path: "layoutGroupTemplate1",
        componentPath: "/layout/layoutGroupTemplate",
        name: "LayoutGroupTemplate1",
        meta: {
          title: "templateTest1",
          icon: "edit",
          componentCode: "userList"
        }
      },
      {
        path: "layoutGroupTemplate2",
        componentPath: "/layout/layoutGroupTemplate",
        name: "LayoutGroupTemplate2",
        meta: {
          title: "用户列表公共接口",
          icon: "edit",
          componentCode: "userListWithSql"
        }
      },
      {
        path: "layoutGroupTemplate3",
        componentPath: "/layout/layoutGroupTemplate",
        name: "LayoutGroupTemplate3",
        meta: {
          title: "用户单体表单查询",
          icon: "edit",
          componentCode: "userDetailWithSql"
        }
      }
      //  {
      //   path: "layoutGroupTemplate4",
      //   componentPath: "/layout/layoutGroupTemplate",
      //   name: "LayoutGroupTemplate4",
      //   meta: { title: "配置组件4", icon: "edit", componentCode: "userListWithSql" }
      // }
    ]
  },
  {
    path: "/rating/object/manage",
    componentPath: "/layout",
    redirect: "/rating/object/manage/corplist",
    alwaysShow: true,
    isLayout: true,
    meta: {
      title: "ratingObjManage",
      icon: "example"
    },
    children: [
      {
        //主体数据查询
        path: "corplist",
        componentPath: "/layout/layoutGroupTemplate",
        name: "corplist",
        meta: { title: "corplist", icon: "edit", componentCode: "list_corp" }
      },
      {
        //债券查询列表
        path: "bondlist",
        componentPath: "/layout/layoutGroupTemplate",
        name: "bondlist",
        meta: { title: "bondlist", icon: "edit", componentCode: "TBOND_LIST" }
      },
      {
        //非标查询列表
        path: "nonstandardlist",
        componentPath: "/layout/layoutGroupTemplate",
        name: "nonstandardlist",
        meta: {
          title: "nonstandardlist",
          icon: "edit",
          componentCode: "NON_STANDARD_LIST"
        }
      },
      // 下面这两个为特殊的，如果type=dataMnage的配置页面要发布成菜单，用其单独的组件。
      {
        //详情页 更新
        path: "dataManageLayoutIndex/:id", //"edit/:id(\\d+)",
        componentPath: "/dataManage/dataManageLayoutIndex",
        name: "DataManageLayoutIndex",
        meta: { title: "dataManageLayoutIndex" },
        hidden: true
      },
      {
        //详情页 新增
        path: "dataManageLayoutAdd/:account",
        componentPath: "/dataManage/dataManageLayoutAdd",
        name: "DataManageLayoutAdd",
        meta: { title: "dataManageLayoutAdd" },
        hidden: true
      }
    ]
  },
  {
    path: "/creditRating",
    componentPath: "/layout",
    redirect: "/creditRating/integrationElementList",
    alwaysShow: true,
    isLayout: true,
    meta: {
      title: "ratingModel",
      icon: "table",
      code: "ratingModel"
    },
    children: [
      {
        //积分要素列表
        path: "integrationElementList",
        componentPath:"/creditRating/integrationElement/integrationElementList",
        name: "integrationElementList",
        meta: {
          title: "integrationElementList",
          icon: "component",
          code: "integrationElementList"
        }
      },
      {
        //模型模板设置页面
        path: "ratingModelTemplate",
        componentPath: "/creditRating/ratingModel/ratingModelTemplate",
        name: "ratingModelTemplate",
        meta: {
          title: "ratingModelTemplate",
          icon: "documentation",
          code: "ratingModelTemplate",
          modelType: "18"
        }
      },
      {
        //评级模型设置页面
        path: "ratingModelList",
        componentPath: "/creditRating/ratingModel/ratingModelList",
        name: "ratingModelList",
        meta: {
          title: "ratingModelList",
          icon: "table",
          code: "ratingModelList"
        }
      },
      {
        //评级模型编辑页面
        path: "ratingModelEdit",
        componentPath: "/creditRating/ratingModel/ratingModelEdit",
        name: "ratingModelEdit",
        meta: {
          title: "ratingModelEdit",
          icon: "table",
          code: "ratingModelEdit"
        },
        hidden: true
      }
    ]
  },
  {
    path: "/rating",
    componentPath: "/rating",
    redirect: "/rating/corp",
    alwaysShow: true,
    isLayout: true,
    meta: {
      title: "ratingManage",
      icon: "example"
    },
    children: [
      {
        path: "corp",
        componentPath: "/rating/corp/rating",
        name: "RatingCorp",
        meta: { title: "ratingCorp", icon: "edit" }
      },
      {
        path: "inputRatingResult",
        componentPath: "/rating/inputRatingResult/list",
        name: "RatingResultInput",
        meta: { title: "RatingResultInput", icon: "edit" }
      },
      {
        path: "bond",
        componentPath: "/rating/bond/rating",
        name: "RatingBond",
        meta: { title: "ratingBond", icon: "edit" }
      },
      {
        //评级步骤配置页面
        path: "ratingStepList",
        componentPath: "/creditRating/ratingModel/ratingStepList",
        name: "ratingStepList",
        meta: { title: "ratingStepList", icon: "table", code: "ratingStepList" }
      }
    ]
  },
  {
    path: "/permission",
    componentPath: "/layout",
    redirect: "/permission/index",
    alwaysShow: true, // will always show the root menu
    isLayout: true,
    meta: {
      title: "permission",
      icon: "lock"
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        componentPath: "/permission/page",
        name: "PagePermission",
        meta: {
          title: "pagePermission",
          code: "PagePermission"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "directive",
        componentPath: "/permission/directive",
        name: "DirectivePermission",
        meta: {
          title: "directivePermission",
          code: "DirectivePermission"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "role",
        componentPath: "/permission/role",
        name: "RolePermission",
        meta: {
          title: "rolePermission",
          code: "RolePermission"
          // roles: ['admin']
        }
      }
    ]
  },

  {
    path: "/icon",
    componentPath: "/layout",
    isLayout: true,
    children: [
      {
        path: "index",
        componentPath: "/svg-icons/index",
        name: "Icons",
        meta: { title: "icons", icon: "icon", noCache: true, code: "Icons" }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: "/components",
    componentPath: "/layout",
    redirect: "noredirect",
    name: "ComponentDemo",
    isLayout: true,
    meta: {
      title: "components",
      icon: "component"
    },
    children: [
      {
        path: "codemirrorSql",
        componentPath: "/components-demo/codemirrorSql",
        name: "CodeMirrorSqlDemo",
        meta: { title: "codemirrorSql" }
      },
      {
        path: "selecttree",
        componentPath: "/components-demo/selecttree",
        name: "SelectTree",
        meta: { title: "selecttree" }
      },
      {
        path: "tinymce",
        componentPath: "/components-demo/tinymce",
        name: "TinymceDemo",
        meta: { title: "tinymce" }
      },
      {
        path: "markdown",
        componentPath: "/components-demo/markdown",
        name: "MarkdownDemo",
        meta: { title: "markdown" }
      },
      {
        path: "json-editor",
        componentPath: "/components-demo/jsonEditor",
        name: "JsonEditorDemo",
        meta: { title: "jsonEditor" }
      },
      {
        path: "splitpane",
        componentPath: "/components-demo/splitpane",
        name: "SplitpaneDemo",
        meta: { title: "splitPane" }
      },
      {
        path: "avatar-upload",
        componentPath: "/components-demo/avatarUpload",
        name: "AvatarUploadDemo",
        meta: { title: "avatarUpload" }
      },
      {
        path: "dropzone",
        componentPath: "/components-demo/dropzone",
        name: "DropzoneDemo",
        meta: { title: "dropzone" }
      },
      {
        path: "sticky",
        componentPath: "/components-demo/sticky",
        name: "StickyDemo",
        meta: { title: "sticky" }
      },
      {
        path: "count-to",
        componentPath: "/components-demo/countTo",
        name: "CountToDemo",
        meta: { title: "countTo" }
      },
      {
        path: "mixin",
        componentPath: "/components-demo/mixin",
        name: "ComponentMixinDemo",
        meta: { title: "componentMixin" }
      },
      {
        path: "back-to-top",
        componentPath: "/components-demo/backToTop",
        name: "BackToTopDemo",
        meta: { title: "backToTop" }
      },
      {
        path: "drag-dialog",
        componentPath: "/components-demo/dragDialog",
        name: "DragDialogDemo",
        meta: { title: "dragDialog" }
      },
      {
        path: "drag-select",
        componentPath: "/components-demo/dragSelect",
        name: "DragSelectDemo",
        meta: { title: "dragSelect" }
      },
      {
        path: "dnd-list",
        componentPath: "/components-demo/dndList",
        name: "DndListDemo",
        meta: { title: "dndList" }
      },
      {
        path: "drag-kanban",
        componentPath: "/components-demo/dragKanban",
        name: "DragKanbanDemo",
        meta: { title: "dragKanban" }
      }
    ]
  },
  {
    path: "/charts",
    componentPath: "/layout",
    redirect: "noredirect",
    name: "Charts",
    isLayout: true,
    meta: {
      title: "charts",
      icon: "chart"
    },
    children: [
      {
        path: "keyboard",
        componentPath: "/charts/keyboard",
        name: "KeyboardChart",
        meta: { title: "keyboardChart", noCache: true }
      },
      {
        path: "line",
        componentPath: "/charts/line",
        name: "LineChart",
        meta: { title: "lineChart", noCache: true }
      },
      {
        path: "mixchart",
        componentPath: "/charts/mixChart",
        name: "MixChart",
        meta: { title: "mixChart", noCache: true }
      }
    ]
  },
  {
    path: "/nested",
    componentPath: "/layout",
    redirect: "/nested/menu1/menu1-1",
    name: "Nested",
    isLayout: true,
    meta: {
      title: "nested",
      icon: "nested"
    },
    children: [
      {
        path: "menu1",
        componentPath: "/nested/menu1/index", // Parent router-view
        // componentPath: "/layout",
        name: "Menu1",
        meta: { title: "menu1" },
        redirect: "/nested/menu1/menu1-1",
        children: [
          {
            path: "menu1-1",
            componentPath: "/nested/menu1/menu1-1",
            name: "Menu1-1",
            meta: { title: "menu1-1" }
          },
          {
            path: "menu1-2",
            componentPath: "/nested/menu1/menu1-2",
            // componentPath: "/layout",
            name: "Menu1-2",
            redirect: "/nested/menu1/menu1-2/menu1-2-1",
            meta: { title: "menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                componentPath: "/nested/menu1/menu1-2/menu1-2-1",
                name: "Menu1-2-1",
                meta: { title: "menu1-2-1" }
              },
              {
                path: "menu1-2-2",
                componentPath: "/nested/menu1/menu1-2/menu1-2-2",
                name: "Menu1-2-2",
                meta: { title: "menu1-2-2" }
              }
            ]
          },
          {
            path: "menu1-3",
            componentPath: "/nested/menu1/menu1-3",
            name: "Menu1-3",
            meta: { title: "menu1-3" }
          }
        ]
      },
      {
        path: "menu2",
        name: "Menu2",
        componentPath: "/nested/menu2/index",
        meta: { title: "menu2" }
      }
    ]
  },
  {
    path: "/table",
    componentPath: "/layout",
    redirect: "/table/complex-table",
    isLayout: true,
    name: "Table",
    meta: {
      title: "Table",
      icon: "table"
    },
    children: [
      {
        path: "dynamic-table",
        componentPath: "/table/dynamicTable/index",
        name: "DynamicTable",
        meta: { title: "dynamicTable" }
      },
      {
        path: "drag-table",
        componentPath: "/table/dragTable",
        name: "DragTable",
        meta: { title: "dragTable" }
      },
      {
        path: "inline-edit-table",
        componentPath: "/table/inlineEditTable",
        name: "InlineEditTable",
        meta: { title: "inlineEditTable" }
      },
      {
        path: "complex-table",
        componentPath: "/table/complexTable",
        name: "ComplexTable",
        meta: { title: "complexTable" }
      }
    ]
  },

  {
    path: "/example",
    componentPath: "/layout",
    redirect: "/example/list",
    name: "Example",
    isLayout: true,
    meta: {
      title: "example",
      icon: "example"
    },
    children: [
      {
        path: "create",
        componentPath: "/example/create",
        name: "CreateArticle",
        meta: { title: "createArticle", icon: "edit" }
      },
      {
        path: "edit/:id(\\d+)",
        componentPath: "/example/edit",
        name: "EditArticle",
        meta: { title: "editArticle" }, //noCache: true
        hidden: true
      },
      {
        path: "list",
        componentPath: "/example/list",
        name: "ArticleList",
        meta: { title: "articleList", icon: "list" }
      }
    ]
  },

  {
    path: "/tab",
    componentPath: "/layout",
    isLayout: true,
    children: [
      {
        path: "index",
        componentPath: "/tab/index",
        name: "Tab",
        meta: { title: "tab", icon: "tab" }
      }
    ]
  },

  {
    path: "/error",
    componentPath: "/layout",
    redirect: "noredirect",
    name: "ErrorPages",
    isLayout: true,
    meta: {
      title: "errorPages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        componentPath: "/errorPage/401",
        name: "Page401",
        meta: { title: "page401", noCache: true }
      },
      {
        path: "404",
        componentPath: "/errorPage/404",
        name: "Page404",
        meta: { title: "page404", noCache: true }
      }
    ]
  },

  {
    path: "/error-log",
    componentPath: "/layout",
    redirect: "noredirect",
    isLayout: true,
    children: [
      {
        path: "log",
        componentPath: "/errorLog/index",
        name: "ErrorLog",
        meta: { title: "errorLog", icon: "bug" }
      }
    ]
  },

  {
    path: "/excel",
    componentPath: "/layout",
    redirect: "/excel/export-excel",
    name: "Excel",
    isLayout: true,
    meta: {
      title: "excel",
      icon: "excel"
    },
    children: [
      {
        path: "export-excel",
        componentPath: "/excel/exportExcel",
        name: "ExportExcel",
        meta: { title: "exportExcel" }
      },
      {
        path: "export-selected-excel",
        componentPath: "/excel/selectExcel",
        name: "SelectExcel",
        meta: { title: "selectExcel" }
      },
      {
        path: "export-merge-header",
        componentPath: "/excel/mergeHeader",
        name: "MergeHeader",
        meta: { title: "mergeHeader" }
      },
      {
        path: "upload-excel",
        componentPath: "/excel/uploadExcel",
        name: "UploadExcel",
        meta: { title: "uploadExcel" }
      }
    ]
  },

  {
    path: "/zip",
    componentPath: "/layout",
    redirect: "/zip/download",
    alwaysShow: true,
    isLayout: true,
    meta: { title: "zip", icon: "zip" },
    children: [
      {
        path: "download",
        componentPath: "/zip/index",
        name: "ExportZip",
        meta: { title: "exportZip" }
      }
    ]
  },

  {
    path: "/pdf",
    componentPath: "/layout",
    redirect: "/pdf/index",
    isLayout: true,
    children: [
      {
        path: "index",
        componentPath: "/pdf/index",
        name: "PDF",
        meta: { title: "pdf", icon: "pdf" }
      }
    ]
  },
  {
    path: "/pdf/download",
    componentPath: "/pdf/download",
    hidden: true
  },

  {
    path: "/theme",
    componentPath: "/layout",
    redirect: "noredirect",
    isLayout: true,
    children: [
      {
        path: "index",
        componentPath: "/theme/index",
        name: "Theme",
        meta: { title: "theme", icon: "theme" }
      }
    ]
  },

  {
    path: "/clipboard",
    componentPath: "/layout",
    redirect: "noredirect",
    isLayout: true,
    children: [
      {
        path: "index",
        componentPath: "/clipboard/index",
        name: "ClipboardDemo",
        meta: { title: "clipboardDemo", icon: "clipboard" }
      }
    ]
  },

  {
    path: "/i18n",
    componentPath: "/layout",
    isLayout: true,
    children: [
      {
        path: "index",
        componentPath: "/i18n-demo/index",
        name: "I18n",
        meta: { title: "i18n", icon: "international" }
      }
    ]
  },
  {
    path: "external-link",
    componentPath: "/layout",
    children: [
      {
        path: "https://github.com/PanJiaChen/vue-element-admin",
        meta: { title: "externalLink", icon: "link" }
      }
    ]
  },
  {
    path: "/iframe1",
    componentPath: "/layout",
    isLayout: true,
    redirect: "/iframe",
    alwaysShow: true,
    meta: {
      title: "iframe",
      icon: "people"
    },
    children: [
      {
        path: ":https:www.baidu.com",
        componentPath: "/iframe/index",
        name: "Myiframe",
        meta: {
          title: "baidu",
          icon: "people"
        }
      },
      {
        path: ":localhost:5009/xquant.web/src/pages/base/index.html",
        componentPath: "/iframe/index",
        name: "innerIframe",
        meta: {
          title: "bZhi2",
          icon: "people"
        }
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];

export default [
  // mock get all routes form server
  // {
  //   url: "/menu",
  //   type: "get",
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: menus
  //     };
  //   }
  // }
];
