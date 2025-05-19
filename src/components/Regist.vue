<script setup>
  import { ref, reactive } from "vue";
  import request from "../utils/request.js";
  import { useRouter } from "vue-router";

  const router = useRouter();

  // 响应式数据,保存用户输入的表单信息
  let registUser = reactive({
    username: "",
    userPwd: "",
  });

  // 响应式数据,保存校验的提示信息
  let reUserPwd = ref("");
  let reUserPwdMsg = ref(""); //确认密码提示信息
  let usernameMsg = ref("");
  let userPwdMsg = ref("");

  // 校验用户名的方法
  async function checkUsername() {
    // 定义正则
    let usernameReg = /^[a-zA-Z0-9]{5,10}$/;
    // 校验
    if (!usernameReg.test(registUser.username)) {
      // 提示
      usernameMsg.value = "不合法";
      return false;
    }

    // 继续校验用户名是否被占用
    // 利用导入的instance发送请求（axios拦截器）
    // 在后端controller的SysUserController有checkUsernameUsed检查是否被占用
    // 配置的是在/user下加方法名，并且通过键值对接收
    let { data } = await request.post(
      `user/checkUsernameUsed?username=${registUser.username}`,
    );
    // 下面的代码都需要等待上面的await执行完毕
    console.log(data);
    // {code: 505, message: 'usernameUsed', data: null} 说明有重复的
    if (data.code != 200) {
      usernameMsg.value = "用户名占用";
      return false;
    }

    // 通过校验
    usernameMsg.value = "OK";
    return true;
  }

  // 校验密码的方法
  function checkUserPwd() {
    // 定义正则
    let passwordReg = /^[0-9]{6}$/;
    // 校验
    if (!passwordReg.test(registUser.userPwd)) {
      // 提示
      userPwdMsg.value = "不合法";
      return false;
    }
    // 通过校验
    userPwdMsg.value = "OK";
    return true;
  }

  // 校验密码的方法
  function checkReUserPwd() {
    // 定义正则
    let passwordReg = /^[0-9]{6}$/;
    // 校验
    if (!passwordReg.test(reUserPwd.value)) {
      // 提示
      reUserPwdMsg.value = "不合法";
      return false;
    }
    console.log(registUser.userPwd, reUserPwd.value);
    // 校验
    if (!(registUser.userPwd == reUserPwd.value)) {
      // 提示
      reUserPwdMsg.value = "不一致";
      return false;
    }

    // 通过校验
    reUserPwdMsg.value = "OK";
    return true;
  }

  // 注册的方法
  async function regist() {
    // 再次校验所有的输入框是否合法
    let flag1 = await checkUsername();
    // 如果不添加await checkUsername返回的是promise对象
    let flag2 = await checkUserPwd();
    let flag3 = await checkReUserPwd();

    if (flag1 && flag2 && flag3) {
      // request.post("user/regist", registUser);
      // 在SysUserController中有regist方法，用于接收用户注册请求
      // registUser 保存用户输入的表单信息
      // post接收返回值，返回的是promise对象，
      // 我们需要的是promise对象的成功值，也就是响应回来的信息response
      // 即response的data属性，利用解构表达式
      let { data } = await request.post("user/regist", registUser);
      console.log(data);
      // {code: 200, message: 'success', data: {…}}

      if (data.code == 200) {
        // 注册成功跳转到登入页,我们利用编程式路由的方式实现
        router.push("/login");
      } else {
        alert("注册失败");
      }
    } else {
      alert("校验不通过");
    }
  }
</script>

<template>
  <div>
    <h3 class="ht">请注册</h3>

    <table class="tab" cellspacing="0px">
      <tr class="ltr">
        <td>请输入账号</td>
        <td>
          <input
            class="ipt"
            id="usernameInput"
            type="text"
            name="username"
            v-model="registUser.username"
            @blur="checkUsername()"
          />
          <!-- 校验用户名 checkUsername() -->

          <span id="usernameMsg" class="msg" v-text="usernameMsg"></span>
        </td>
      </tr>
      <tr class="ltr">
        <td>请输入密码</td>
        <td>
          <input
            class="ipt"
            id="userPwdInput"
            type="password"
            name="userPwd"
            v-model="registUser.userPwd"
            @blur="checkUserPwd()"
          />
          <span id="userPwdMsg" class="msg" v-text="userPwdMsg"></span>
        </td>
      </tr>
      <tr class="ltr">
        <td>确认密码</td>
        <td>
          <input
            class="ipt"
            id="reUserPwdInput"
            type="password"
            v-model="reUserPwd"
            @blur="checkReUserPwd()"
          />
          <span id="reUserPwdMsg" class="msg" v-text="reUserPwdMsg"></span>
        </td>
      </tr>
      <tr class="ltr">
        <td colspan="2" class="buttonContainer">
          <input class="btn1" type="button" @click="regist()" value="注册" />
          <input class="btn1" type="button" value="重置" />
          <router-link to="/login">
            <button class="btn1">去登录</button>
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
  .msg {
    color: gold;
  }
  .buttonContainer {
    text-align: center;
  }
</style>
