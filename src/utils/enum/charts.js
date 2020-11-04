/*
 * @Descripttion: 图表相关的enum
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-07-31 11:11:24
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2019-08-02 15:13:17
 */

 

export default{
  /**
   * @name: 布局图类型 type相同表示该类型属于同种实现（同个组件实现），有些简单的类型就用一个组件实现了，特殊的组件可能需要独立的组件实现
   * @param {type} 
   * @return: 
   * @other: 
   */
  chartTypeOptions: [   
        { value: "vLine", label: "vLine-折线图", type:"normal" },
        { value: "vPie", label: "vPie-饼图", type:"normal" },
        { value: "vHistogram", label: "vHistogram-柱状图", type:"normal" }
   ]  
}