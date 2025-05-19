// 专门存储用户日程信息的pinia
import {defineStore} from 'pinia'

export const defineSchdule=defineStore(
    "schduleList",
    {
        state:()=>{
            return{ 
            // 存储信息，查看数据库 应该存储日程
            itemList:[
                // {
                //     sid:1,
                //     uid:1,
                //     title:'学习java',
                //     completed:0
                // },
                // {
                //     sid:1,
                //     uid:1,
                //     title:'学习java',
                //     completed:0
                // },
                // {
                //     sid:1,
                //     uid:1,
                //     title:'学习java',
                //     completed:0
                // }
            
                ]
            }
        },
        getters:{

        },
        actions:{

        }
    }
)