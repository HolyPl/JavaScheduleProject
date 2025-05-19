<script setup>
    // 展示用户所有日程 导入pinia
    import { defineUser } from "../store/userStore";
    import { defineSchdule } from "../store/schduleStore";
    import { ref, reactive, onMounted, onUpdated } from "vue";
    import request from "../utils/request.js";

    let sysUser = defineUser();
    let sysSchedule = defineSchdule();

    // 挂载完毕后，应该立即查询当前用户的所有日程信息，赋值给pinia
    onMounted(async () => {
        // 发送异步请求，获得当前用户的所有日程记录
        // 请求的是后端的服务，即SysScheduleController findAllSchedule
        let { data } = await request.get("/schedule/findAllSchedule", {
            params: { uid: sysUser.uid },
        });
        sysSchedule.itemList = data.data.itemList;
        // 下面能够响应日程信息

        // 或者利用showSchedule方法
    });

    // 查询当前用户所有日程信息，并展示到视图的方法
    async function showSchedule() {
        let { data } = await request.get("/schedule/findAllSchedule", {
            params: { uid: sysUser.uid },
        });
        sysSchedule.itemList = data.data.itemList;
    }

    // 为当前用户增加一个空的日程记录
    async function addItem() {
        let { data } = await request.get("schedule/addDefaultSchedule", {
            params: { uid: sysUser.uid },
        });

        if (data.code == 200) {
            // 增加成功，刷新页面数据
            await showSchedule();
        } else {
            alert("增加失败");
        }
    }

    async function updateItem(index) {
        // 找到要修改的数据，发送给服务端，更新进入数据库即可
        let { data } = await request.post(
            "schedule/updateSchedule",
            sysSchedule.itemList[index],
        );
        if (data.code == 200) {
            showSchedule();
        } else {
            alert("更新失败");
        }
    }

    async function deleteItem(index) {
        let sid_ = sysSchedule.itemList[index].sid;
        console.log(sid_);
        let { data } = await request.get("/schedule/deleteSchedule", {
            params: { sid: sid_ },
        });
        console.log(data);

        if (data.code == 200) {
            console.log(data);
            showSchedule();
            alert("删除成功");
        } else {
            alert("删除失败");
        }
    }
</script>

<template>
    <div>
        <h3 class="ht">您的日程如下</h3>
        <table class="tab" cellspacing="0px">
            <thead>
                <tr class="ltr">
                    <th>编号</th>
                    <th>内容</th>
                    <th>进度</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <!-- 此处需要展示日程数据 -->
                <tr
                    class="ltr"
                    v-for="(item, index) in sysSchedule.itemList"
                    :key="index"
                >
                    <td v-text="index + 1"></td>
                    <td>
                        <input type="text" v-model="item.title" />
                        <!-- 这样我们能够修改title，直接影响pinia数据 -->
                    </td>
                    <td>
                        <!-- 显示completed，表示是否完成，能通过radio勾选并双向绑定，更新完成情况 -->
                        <input
                            type="radio"
                            value="1"
                            v-model="item.completed"
                        />已完成
                        <input
                            type="radio"
                            value="0"
                            v-model="item.completed"
                        />未完成
                    </td>
                    <td class="buttonContainer">
                        <button class="btn1" @click="deleteItem(index)">
                            删除
                        </button>
                        <button class="btn1" @click="updateItem(index)">
                            保存修改
                        </button>
                        <!-- 因为有很多个保存修改，且事件都一样，为了区分，我们需要把索引传进去 -->
                    </td>
                </tr>

                <tr class="ltr buttonContainer">
                    <td colspan="4">
                        <button class="btn1" @click="addItem()">
                            新增日程
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .ht {
        text-align: center;
        color: cadetblue;
        font-family: 幼圆;
    }
    .tab {
        width: 80%;
        border: 5px solid cadetblue;
        margin: 0px auto;
        border-radius: 5px;
        font-family: 幼圆;
    }
    .ltr td {
        border: 1px solid powderblue;
    }
    .ipt {
        border: 0px;
        width: 50%;
    }
    .btn1 {
        border: 2px solid powderblue;
        border-radius: 4px;
        width: 100px;
        background-color: antiquewhite;
    }
    #usernameMsg,
    #userPwdMsg {
        color: gold;
    }

    .buttonContainer {
        text-align: center;
    }
</style>
