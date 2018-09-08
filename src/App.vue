<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'App',
	created(){
		//去掉首页loading
		document.body.removeChild(document.getElementById('loading'));
	}
}
</script>

<style lang="less">

	html,body,#app {
		height: 100%;
		font:14px/1.5 'Helvetica Neue',Helvetica,Arial,'Microsoft Yahei','Hiragino Sans GB','Heiti SC','WenQuanYi Micro Hei',sans-serif;
	}
	*{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	
</style>
