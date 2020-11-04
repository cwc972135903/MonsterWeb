/*
 * @Descripttion: 
 * @version: 
 * @Author: wenchao.chai
 * @Date: 2019-10-21 17:43:30
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-09-02 13:49:29
 */
//-----------------------------------------主体-财务信息-------------------------------
/**
 * @name: 报表类型
 * @return: 
 * @other: 
 */ 

export default{
    /**
     * @name: 报表类型
     * @return: 
     * @other: 
     */
    quarterOptions: [   
          { value: "1", label: "一季报" },
          { value: "2", label: "半年报" },
          { value: "3", label: "三季报" },
          { value: "4", label: "年报" }
    ],

    quarterOptionsForCredit: [   
        { value: "01-01", label: "一季报" },
        { value: "04-01", label: "半年报" },
        { value: "07-01", label: "三季报" },
        { value: "10-01", label: "年报" }
    ],
     /**
     * @name: 通用是否
     * @return: 
     * @other: 
     */
    YOrNOptions: [   
        { value: "1", label: "是" },
        { value: "0", label: "否" }
    ],
   
    /**
     * @name: 数据分类
     * @return: 
     * @other: 
     */
    dataSourceOptions: [   
        { value: "0", label: "原始数据" },
        { value: "2", label: "用户调整数据" },
        
    ],
    /**
     * @name: 单位系数
     * @return: 
     * @other: 
     */
    unitOptions: [   
        { value: "1", label: "元" },
        { value: "10000", label: "万元" },
        { value: "100000000", label: "亿元" },
        
    ],
     /**
     * @name: 报表分类
     * @return: 
     * @other: 
     */
    mTypeOptions: [   
        { value: "", label: "请选择" },
        { value: "0", label: "母公司报表" },
        { value: "1", label: "合并报表" }
        
    ],
     /**
     * @name: 数据频次
     * @return: 
     * @other: 
     */
    freqOptions: [   
        { value: "B", label: "批次" },
    
        
    ],
    /**
     * @name: 会计准则
     * @return: 
     * @other: 
     */
    fTypeOptions: [   
        { value: "2_1", label: "大陆新会计准则" },
        { value: "2_0", label: "大陆旧会计准则" }
        
    ],
    /**
     * @name: 对象类型 tcrt_type
     * @other: 
     */
    objectTypeOptions:[
        { value: "5", label: "宏观" },
        { value: "4", label: "行业" },
        { value: "30", label: "区域" },
        { value: "1", label: "主体" },
        { value: "90", label: "个人" },
        { value: "0", label: "债券" },
        { value: "26", label: "债权计划" },
        { value: "28", label: "信托计划" },
        { value: "200", label: "资管计划" },
        { value: "27", label: "理财产品" },
        { value: "29", label: "ABS" },
        { value: "91", label: "股权投资" },
        { value: "94", label: "不动产金融产品" },
        { value: "92", label: "不动产投资计划" },
        { value: "95", label: "协议存款" },
        { value: "96", label: "其他产品" },
        { value: "300", label: "融资融券" },
        { value: "301", label: "股票质押" },
        { value: "302", label: "约定回购" },
        { value: "400", label: "租赁类" },
        { value: "30000", label: "融资类" },
        { value: "20000", label: "非标另类" } 
    ]
 }


