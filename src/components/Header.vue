<script setup>
    import { defineUser } from "../store/userStore";
    import { defineSchdule } from "../store/schduleStore";
    import { useRouter } from "vue-router";

    let router = useRouter();

    let sysUser = defineUser();
    let sysSchedule = defineSchdule();

    function logOut() {
        // 清除所有的pinia数据，跳转到登入页
        sysUser.$reset();
        sysSchedule.$reset();
        // 跳转到登入页
        router.push("/login");
    }
</script>

<template>
    <div class="container">
        <!-- 页面标题 -->
        <h1 class="ht">欢迎使用日程管理系统</h1>

        <!-- 需要修改：登入进去后不要再显示操作区域，利用pinia来判断是否登入 -->

        <!-- 操作区域 -->
        <div class="option-container">
            <!-- 登录/注册按钮 -->
            <!-- 如果sysUser.username为空，说明没有登入 -->
            <div class="option-group" v-if="sysUser.username == ''">
                <router-link to="/login">
                    <button class="b1s">登录</button>
                </router-link>
                <router-link to="/regist">
                    <button class="b1s">注册</button>
                </router-link>
            </div>

            <!-- 用户状态与操作按钮 -->
            <div class="option-group user-info" v-else>
                <span>欢迎{{ sysUser.username }}</span>
                <router-link to="/showSchedule">
                    <button class="b1b">查看我的日程</button>
                </router-link>
                <button class="b1b" @click="logOut()">退出登录</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        text-align: center; /* 整体内容居中 */
    }

    .ht {
        text-align: center;
        color: cadetblue;
        font-family: "幼圆", cursive;
        margin-bottom: 20px;
    }

    /* 操作区域整体布局 */
    .option-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    /* 每一组按钮样式 */
    .option-group {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    /* 按钮样式保持不变 */
    .b1s {
        border: 2px solid powderblue;
        border-radius: 4px;
        width: 60px;
        background-color: antiquewhite;
        padding: 5px 10px;
        cursor: pointer;
    }

    .b1b {
        border: 2px solid powderblue;
        border-radius: 4px;
        width: 100px;
        background-color: antiquewhite;
        padding: 5px 10px;
        cursor: pointer;
    }

    .user-info span {
        margin-right: 10px;
        font-weight: bold;
    }
</style>
