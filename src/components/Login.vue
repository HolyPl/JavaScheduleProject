<script setup>
    import { reactive, ref } from "vue";
    import request from "../utils/request.js";
    import { useRouter } from "vue-router";
    import { defineUser } from "../store/userStore.js";

    let sysUser = defineUser();

    const router = useRouter();

    // 登录用户信息
    const loginUser = reactive({
        username: "",
        userPwd: "",
        // v-model="loginUser.username"
        // v-model="loginUser.userPwd"
    });

    // 错误提示信息
    const usernameMsg = ref("");
    //   <span id="usernameMsg" v-text="usernameMsg"></span>
    const userPwdMsg = ref("");

    // 验证用户名
    function checkUsername() {
        let usernameReg = /^[a-zA-Z0-9]{5,10}$/;
        if (!loginUser.username.trim()) {
            usernameMsg.value = "用户名不能为空";
            return false;
        } else if (!usernameReg.test(loginUser.username)) {
            usernameMsg.value = "格式有误";
            return false;
        } else {
            usernameMsg.value = "OK";
            return true;
        }
    }

    // 验证密码
    function checkUserPwd() {
        let userPwdReg = /^[0-9]{6}$/;
        if (!loginUser.userPwd.trim()) {
            userPwdMsg.value = "密码不能为空";
            return false;
        } else if (!userPwdReg.test(loginUser.userPwd)) {
            userPwdMsg.value = "格式有误";
            return false;
        } else {
            userPwdMsg.value = "OK";
            return true;
        }
    }

    // 登入的方法
    async function login() {
        // 表单数据格式都正确再提交
        let flag1 = checkUsername();
        let flag2 = checkUserPwd();
        if (!(flag1 && flag2)) {
            return;
        }

        // 我们使用异步的axios发请求，并将loginUser放到服务器上
        // 在SysUserController有login() 接收用户登入请求，完成登入的业务接口
        let { data } = await request.post("user/login", loginUser);
        console.log(data);
        // {code: 200, message: 'success', data: null}
        if (data.code == 501) {
            alert("用户名有误");
        } else if (data.code == 503) {
            alert("密码有误");
        } else if (data.code == 200) {
            // 登入成功后，应该把当前的用户信息存在userStore中
            // 用户信息由后端返回
            console.log(data);
            /**data:最外层
             * {code: 200, message: 'success', data: {…}}
                code: 200
                data: {loginUser: {…}} 内层data 注意
                message: "success"
                [[Prototype]]: Object
             */
            // 获取登入的用户信息，更新到pinia
            sysUser.uid = data.data.loginUser.uid;
            sysUser.username = data.data.loginUser.username;

            // 跳转到showSchedule，利用编程式路由
            router.push("/showSchedule");
        } else {
            alert("未知错误");
        }
    }
</script>

<template>
    <div>
        <h3 class="ht">请登录</h3>
        <table class="tab" cellspacing="0px">
            <tr class="ltr">
                <td>请输入账号</td>
                <td>
                    <input
                        class="ipt"
                        type="text"
                        v-model="loginUser.username"
                        @blur="checkUsername()"
                    />
                    <span id="usernameMsg" v-text="usernameMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td>请输入密码</td>
                <td>
                    <input
                        class="ipt"
                        type="password"
                        v-model="loginUser.userPwd"
                        @blur="checkUserPwd()"
                    />
                    <span id="userPwdMsg" v-text="userPwdMsg"></span>
                </td>
            </tr>
            <tr class="ltr">
                <td colspan="2" class="buttonContainer">
                    <input
                        class="btn1"
                        type="button"
                        @click="login()"
                        value="登录"
                    />
                    <input class="btn1" type="button" value="重置" />
                    <router-link to="/regist">
                        <button class="btn1">去注册</button>
                    </router-link>
                </td>
            </tr>
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
        width: 500px;
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
        width: 60px;
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
