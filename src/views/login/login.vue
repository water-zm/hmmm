<template>
  <div class="login">
    <div class="left"></div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 148, 250, 1),
    rgba(2, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
  }
  .right {
    width: 633px;
    height: 435px;
  }
}
</style>
