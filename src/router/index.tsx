import { Navigate } from "react-router-dom";
import Home from "../components/layout/home";
import SystemIndex from "../pages/system/systemIndex.tsx";
import SysUser from "../pages/system/User";
import SysRole from "../pages/system/Role";
import SysMenu from "../pages/system/Menu";
import Bar from "../pages/system/charts/bar.tsx";
import Line from "../pages/system/charts/line.tsx";
import Pie from "../pages/system/charts/pie.tsx";
import Center from "../pages/system/account/center";
import Setting from "../pages/system/account/settings";
import Notice from "../pages/system/Notice";
import Post from "../pages/system/Post";
import DictType from "../pages/system/DictType";
import DictData from "../pages/system/DictData";
import Dept from "../pages/system/Dept";
import OperateLog from "../pages/system/OperateLog";
import LoginLog from "../pages/system/LoginLog";

// 导入你的登录页面组件（请根据实际路径调整，比如下面假设的路径）
import Login from "../pages/system/login";
// 导入你的路由守卫
import { RequireAuth } from "@/components/RequireAuth.tsx";

const routes = [
    // ==================== 1. 开放路由（免登录） ====================
    {
        path: "/login",
        title: "登录",
        element: <Login />
    },

    // ==================== 2. 受保护路由（统一由 RequireAuth 拦截） ====================
    {
        path: "/",
        element: <RequireAuth><SystemIndex /></RequireAuth>, // 使用核心父组件或空白网关进行拦截
        children: [
            // 访问根路径直接去首页
            {
                index: true,
                element: <Navigate to="/home" replace />
            },
            {
                path: "home",
                title: "首页",
                element: <Home />
            },
            // 权限管理
            {
                path: 'system',
                title: "权限管理",
                children: [
                    {
                        path: 'user',
                        title: "用户管理",
                        element: <SysUser />,
                    },
                    {
                        path: 'role',
                        title: "角色管理",
                        element: <SysRole />,
                    },
                    {
                        path: 'menu', // 【规范化】: 嵌套子路由去掉开头的斜杠和父级路径
                        title: "菜单管理",
                        element: <SysMenu />,
                    },
                    {
                        path: 'dept',
                        title: "部门管理",
                        element: <Dept />,
                    },
                    {
                        path: 'post',
                        title: "岗位管理",
                        element: <Post />,
                    },
                    {
                        path: 'dictType',
                        title: "字典类型",
                        element: <DictType />,
                    },
                    {
                        path: 'dictData',
                        title: "字典数据",
                        element: <DictData dictType={""} open={true} />,
                    },
                    {
                        path: 'notice',
                        title: "通知公告",
                        element: <Notice />,
                    },
                ],
            },
            // 日志管理
            {
                path: 'log',
                title: "日志管理",
                children: [
                    {
                        path: 'loginLog', // 【规范化】: 去掉了开头的 /log/
                        title: "登录日志",
                        element: <LoginLog />,
                    },
                    {
                        path: 'operateLog',
                        title: "操作日志",
                        element: <OperateLog />,
                    },
                ],
            },
        ]
    },

    // ==================== 3. 兜底路由 ====================
    {
        path: "*",
        element: <Navigate to="/home" replace />
    }
]

export default routes;