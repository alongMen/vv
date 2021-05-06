<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="rgb(179,159,157)"
            text-color="#ffffff"
            active-text-color="#FE8724"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" class="icons"> </i>
                        <span slot="title"> {{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '首页'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: 'car',
                    title: '购物车',
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'order',
                    title: '我的订单'
                },
                {
                    icon: 'el-icon-phone-outline',
                    index: 'pre',
                    title: '我的预约'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'member',
                    title: '会员中心'
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'help',
                    title: '帮助中心'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped lang="less">
.sidebar {
    display: block;
    border-radius: 3px;
    position: absolute;
    left: 10px;
    top: 80px;
    bottom: 10px;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
    .icons{
        color:#ffffff;
    }
}
</style>
