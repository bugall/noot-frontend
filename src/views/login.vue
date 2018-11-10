<template>
  <Row type="flex" justify="center" align="middle" class="login" @keydown.enter.native="submitLogin">
    <Col :xs="{span:22}" style="width: 368px;">
    <Alert type="error" show-icon v-if="error">{{errorMsg}}</Alert>
  
    <Row class="login-form" v-if="!socialLogining">
      <Tabs v-model="tabName">
        <TabPane label="账户密码登录" name="username" icon="md-person">
          <Form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
            <FormItem prop="username">
              <Input v-model="form.username" prefix="ios-contact" size="large" clearable placeholder="请输入用户名" autocomplete="off" />
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" prefix="ios-lock" size="large" clearable placeholder="请输入密码" autocomplete="off" />
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="手机号登录" name="phone" icon="ios-phone-portrait">
          <Form ref="phoneLoginForm" :model="form" :rules="rules" class="form">
            <FormItem prop="phone">
              <Input v-model="form.phone" prefix="ios-phone-portrait" size="large" clearable placeholder="请输入手机号" />
            </FormItem>
            <FormItem prop="code" :error="errorCode">
              <Row type="flex" justify="space-between" class="code-row-bg">
                <Input v-model="form.code" prefix="ios-mail-outline" size="large" clearable placeholder="请输入短信验证码" :maxlength="maxLength" class="input-verify" />
                <Button size="large" :loading="sending" @click="sendVerify" v-if="!sended" class="send-verify">
                  <span v-if="!sending">获取验证码</span>
                  <span v-else>发送中</span>
                </Button>
                <Button size="large" disabled v-if="sended" class="count-verify">{{countButton}}</Button>
              </Row>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
  
      <Row type="flex" justify="space-between" class="code-row-bg">
        <Checkbox v-model="saveLogin" size="large">自动登录</Checkbox>
        <Dropdown trigger="click" @on-click="handleDropDown">
          <a class="forget-pass">
            忘记密码
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="showAccount">体验测试账号</DropdownItem>
            <DropdownItem name="resetByphone">使用手机号重置密码(付费)</DropdownItem>
            <DropdownItem name="resetByEmail">使用邮箱重置密码(付费)</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Row>
      <Row>
        <Button class="login-btn" type="primary" size="large" :loading="loading" @click="submitLogin" long>
                            <span v-if="!loading">登录</span>
                            <span v-else>登录中...</span>
                        </Button>
      </Row>
    </Row>
    </Col>
  </Row>
</template>

<script>
import Cookies from "js-cookie";
import {
  login,
  userInfo,
  githubLogin,
  qqLogin,
  weiboLogin,
  getJWT,
  sendSms,
  smsLogin
} from "@/api/index";
import util from "@/libs/util.js";
export default {
  data() {
    const validatephone = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      socialLogining: false,
      error: false,
      errorMsg: "",
      tabName: "username",
      saveLogin: true,
      loading: false,
      sending: false,
      sended: false,
      count: 60,
      countButton: "60 s",
      maxLength: 6,
      errorCode: "",
      form: {
        username: "test或test2 可注册",
        password: "123456",
        phone: "捐赠获取完整版功能",
        code: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: validatephone,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    showErrorMsg(msg) {
      this.error = true;
      this.errorMsg = msg;
    },
    sendVerify() {
      this.$refs.phoneLoginForm.validate(valid => {
        if (valid) {
          this.showErrorMsg("请捐赠获取完整版")
        }
      });
    },
    countDown() {
      let that = this;
      if (this.count === 0) {
        this.sended = false;
        this.count = 60;
        return;
      } else {
        this.countButton = this.count + " s";
        this.count--;
      }
      setTimeout(function() {
        that.countDown();
      }, 1000);
    },
    submitLogin() {
      if (this.tabName === "username") {
        this.$refs.usernameLoginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            login({
              username: this.form.username,
              password: this.form.password,
              saveLogin: this.saveLogin
            }).then(res => {
              if (res.message ===  'success') {
                this.setStore("accessToken", res.data);
                // 获取用户信息
                userInfo().then(res => {
                  if (res.message ===  'success') {
                    // 避免超过大小限制
                    delete res.data.permissions;
                    if (this.saveLogin) {
                      // 保存7天
                      Cookies.set("userInfo", JSON.stringify(res.data), {
                        expires: 7
                      });
                    } else {
                      Cookies.set("userInfo", JSON.stringify(res.data));
                    }
                    this.setStore("userInfo", res.data);
                    this.$store.commit("setAvatarPath", res.data.avatar);
                    // 加载菜单
                    util.initRouter(this);
                    this.$router.push({
                      name: "home_index"
                    });
                  } else {
                    this.loading = false;
                  }
                });
              } else {
                this.loading = false;
              }
            });
          }
        });
      } else if (this.tabName === "phone") {
        this.$refs.phoneLoginForm.validate(valid => {
          if (valid) {
            if (this.form.code === "") {
              this.errorCode = "验证码不能为空";
              return;
            } else {
              login({
                phone: this.form.phone,
                code: this.form.code
              }).then(res => {
                console.log(res);
                if (res.message === 'success') {
                  this.setStore("accessToken", res.data.access_token);
                  // 获取用户信息
                  userInfo().then(res => {
                    if (res.message === 'success') {
                      if (this.saveLogin) {
                        // 保存7天
                        Cookies.set("userInfo", JSON.stringify(res.data), {
                          expires: 7
                        });
                      } else {
                        Cookies.set("userInfo", JSON.stringify(res.data));
                      }
                      this.setStore("userInfo", res.data);
                      this.$store.commit("setAvatarPath", res.data.avatar);
                      // 加载菜单
                      util.initRouter(this);
                      this.$router.push({
                        name: "home_index"
                      });
                    } else {
                      this.loading = false;
                    }
                  });
                } else {
                  this.loading = false;
                }
              });
              this.errorCode = "";
            }
          }
        });
      }
    },
    relatedLogin() {
      
    },
    handleDropDown(v) {
      if (v == "showAccount") {
        this.showAccount();
      } else if (v == "resetByphone") {
        this.showErrorMsg("请捐赠获取完整版")
      } else if (v == "resetByEmail") {
        this.showErrorMsg("请捐赠获取完整版")
      }
    },
    showAccount() {
      this.$Notice.info({
        title: "体验账号密码",
        desc:
          "账号1：test 密码：123456 <br>账号2：test2 密码：123456 已开放注册！",
        duration: 10
      });
    },
    showMessage() {
      this.$Notice.success({
        title: "已升级至iView3.0",
        desc: "完善多项功能，包括部门管理、定时任务、前端模版等 修复已知BUG",
        duration: 5
      });
    }
  },
  mounted() {
    this.showMessage();
    this.showAccount();
    this.relatedLogin();
  }
};
</script>

<style lang="less">
@import "./login.less";
</style>
