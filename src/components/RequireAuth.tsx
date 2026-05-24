import { Navigate, useLocation } from "react-router-dom";

// 这是一个模拟获取登录状态的函数，你需要根据你项目的实际情况修改
// 比如从 localStorage、pinia/redux、或者 cookie 中获取 token
const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // 如果有 token 视为已登录
};

interface RequireAuthProps {
    children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // 未登录，重定向到 /login
        // state 用于登录成功后，能够跳回用户原本想访问的页面
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 已登录，放行
    return <>{children}</>;
};