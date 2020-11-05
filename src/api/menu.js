/*
 * @Descripttion: 菜单
 * @version:
 * @Author: wenchao.chai
 * @Date: 2019-04-20 13:38:30
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-11-05 17:36:57
 */

import request from "@/utils/request";
import { buildTree } from "@/utils/arrayHelper";

/**
 * @name: temp menu for dev
 * @param {type}
 * @return:
 * @other:
 */
const devMenus = [
  /** when your routing map is too long, you can split it into small modules **/
  {
    path: "/demo",
    componentPath: "/layout",
    redirect: "/demo/normal",
    isLayout: true,
    alwaysShow: true,
    meta: {
      title: "demoLayout",
      icon: "example"
    },
    children: [
      // 增删改查的标准化开发demo
      {
        path: "normal",
        componentPath: "/demo/normal/list",
        name: "NormalList",
        meta: {
          title: "normalList",
          icon: "edit"
        }
      },
      {
        path: "demo12",
        componentPath: "/demo/normal/list",
        name: "demo12",
        meta: {
          title: "demo12",
          icon: "edit"
        }
      },
      // dialog内请求列表跟表单示例
      {
        path: "dialog",
        componentPath: "/demo/dialogRequest/list",
        name: "DialogList",
        meta: {
          title: "dialogList",
          icon: "edit"
        }
      },
      // 左右布局的标准化开发demo
      {
        path: "leftRight",
        componentPath: "/demo/leftRight/list",
        name: "LeftRight",
        meta: {
          title: "leftRight",
          icon: "edit"
        }
      },
      // 左右布局（左边树）
      {
        path: "leftRightTree",
        componentPath: "/demo/leftRight/listTree",
        name: "LeftRightTree",
        meta: {
          title: "leftRightTree",
          icon: "edit"
        }
      },
      // 拖拽table demo
      {
        path: "dragTable",
        componentPath: "/demo/dragTable/dragTable",
        name: "DragTable",
        meta: {
          title: "dragTable",
          icon: "edit"
        }
      },
      // // 树表格demo 开发示例
      // {
      //   path: "tableTree",
      //   componentPath: "/demo/tableTree/list",
      //   name: "TableTreeDemo",
      //   meta: {
      //     title: "tableTreeDemo",
      //     icon: "edit"
      //   }
      // }
    ]
  },
  {
    path: "/components",
    componentPath: "/layout",
    redirect: "noredirect",
    name: "ComponentDemo",
    isLayout: true,
    meta: {
      title: "components",
      icon: "example"
    },
    children: [
      //---------------temp above---------------
      {
        path: "numberPercentDemo",
        componentPath: "/components-demo/numberPrecent",
        name: "NumberPercentDemo",
        meta: { title: "numberPrecent" }
      },

      {
        path: "numberPrefixDemo",
        componentPath: "/components-demo/numberPrefix",
        name: "numberPrefixDemo",
        meta: { title: "numberPrefix" }
      },
      {
        path: "uploadDemo",
        componentPath: "/components-demo/uploader",
        name: "UploadDemo",
        meta: { title: "uploadDemo" }
      },
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
      },
      {
        path: "fullScreen-Dialog",
        componentPath: "/components-demo/fullscreenDialog",
        name: "FullScreenDialogDemo",
        meta: { title: "fullScreenDialog" }
      },
      {
        path: "dateQuick-Picker",
        componentPath: "/components-demo/dateQuickPickerDemo",
        name: "DateQuickPickerDemo",
        meta: { title: "dateQuickPickerDemo" }
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
  }
];

/**
 * @name: constant menu
 * @param {type}
 * @return:
 * @other:
 */
const constantMenus = [{ path: "*", redirect: "/404", hidden: true }];

// server api
export function getMenu() {
  
  
  //todo：暂时使用本地菜单
  let menuTree = [];
  let response = {
    data:[],
    code:"200",
    msg:"success"
  };
  if (window.env.VUE_ENV == "dev") {
    // menuTree = menuTree.concat(devMenus);
       menuTree = devMenus;
   }
   response.data = menuTree;
   return new Promise((resolve, reject) => {
    resolve(response);
  })
  // return request({
  //   url: "/menu/list/render",
  //   method: "get"
  // }).then(response => {
  //   if (response.data != null && response.data.length > 0) {
  //     let responseData = [];
  //     response.data.forEach(menu => {
  //       let item = {
  //         id: menu.pk_menu_id,
  //         pId: menu.pk_menu_pid,
  //         path: menu.path,
  //         componentPath: menu.component_path,
  //         name: menu.name
  //       };
  //       if (menu.redirect) {
  //         item["redirect"] = menu.redirect;
  //       }
  //       if (menu.always_show) {
  //         item["alwaysShow"] = menu.always_show == "1" ? true : false;
  //       }
  //       if (menu.is_layout) {
  //         item["isLayout"] = menu.is_layout == "1" ? true : false;
  //       }
  //       if (menu.meta_title || menu.meta_icon) {
  //         item.meta = {};
  //         if (menu.meta_title) {
  //           item.meta["title"] = menu.meta_title;
  //         }
  //         if (menu.meta_icon) {
  //           item.meta["icon"] = menu.meta_icon;
  //         }
  //         if (menu.meta_code) {
  //           item.meta["code"] = menu.meta_code;
  //         }
  //         if (menu.meta_component_code) {
  //           item.meta["componentCode"] = menu.meta_component_code;
  //         }
  //       }
  //       if (menu.hidden) {
  //         item["hidden"] = menu.hidden == "1" ? true : false;
  //       }
  //       responseData.push(item);
  //     });
  //     let treeData = buildTree(responseData);
  //     //let menuTree = treeData.concat(constantMenus);
  //     let menuTree = [];
  //     //env判断是否显示demo menu
  //     if (window.env.VUE_ENV == "dev") {
  //      // menuTree = menuTree.concat(devMenus);
  //         menuTree = devMenu;
  //     }
  //     response.data = menuTree;
  //   }
   
  // });
}

/**
 * @name: 获取菜单 tree data 用于页面render
 * @param {type}
 * @return:
 * @other:
 */
// export function getMenu() {
//     // return getMenuMock();
//     return getMenuServer();
// }
