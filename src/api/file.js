/*
 * @Descripttion: 文件下载API
 * @version:
 * @Author: wenchao.chai
 * @Date: 2019-07-05 13:34:03
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-07-16 16:43:19
 */
import request from "@/utils/request";
import { getDate } from "@/utils/dateHelper";

/**
 * @name: 文件下载
 * @param {api} 后台接口
 * @param {param} 请求参数
 * @param {fileName} 文件名称.xlsx (后缀需加上)
 * @return:
 * @other:
 */
export function fileDownload(api, param, fileName) {
  for (const key in param) {
    if (param.hasOwnProperty(key)) {
      param[key] = param[key] || "";
    }
  }
  let defaultFileName = `下载_${getDate()}.xlsx`; //未指定名称时的默认名称
  return request({
    url: api,
    method: "post",
    data: param,
    transformRequest: [
      function(data) {
        // 将数据转换为表单数据
        let ret = "";
        for (let prop in data) {
          if (typeof data[prop] === "object") {
            ret +=
              encodeURIComponent(prop) +
              "=" +
              encodeURIComponent(JSON.stringify(data[prop])) +
              "&";
          } else {
            ret +=
              encodeURIComponent(prop) +
              "=" +
              encodeURIComponent(data[prop]) +
              "&";
          }
        }
        return ret;
      }
    ],
    responseType: "arraybuffer"
  })
    .then(response => {
      let url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute(
        "download",
        decodeURIComponent(fileName || param.fileName || defaultFileName)
      ); // 获取并设置下载文件名
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => {});
}
