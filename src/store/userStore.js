// userStore.js专门用于存储用户状态信息的pinia
import {defineStore} from 'pinia'

export const defineUser=defineStore(
    "loginUser",
    {
        state:()=>{
            return{ 
            // 存储信息，查看数据库 应该存储用户的uid username
            uid:0,
            username:''
            }
        },
        getters:{

        },
        actions:{

        }
    }
)