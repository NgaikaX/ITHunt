import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const Wrapper: React.FC<any> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [token, setToken] = useState<string | null>(null);

        useEffect(() => {
            // 从 localStorage 中获取 token
            const userData = JSON.parse(localStorage.getItem("user") || "{}");

            if (userData.token) {
                try {
                    const decodedToken: DecodedToken = jwtDecode(userData.token);

                    // 检查 token 是否过期
                    if (decodedToken.exp * 1000 < Date.now()) {
                        // token 已经过期
                        localStorage.removeItem("user"); // 清除过期的 token
                        router.push('/login');
                    } else {
                        setToken(userData.token);
                        setLoading(false);
                    }
                } catch (error) {
                    // 如果解码失败，清除 token 并重定向到登录页面
                    localStorage.removeItem("user");
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }
        }, [router]);

        if (loading) {
            return <div>Loading...</div>; // 可以使用一个实际的加载组件
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
