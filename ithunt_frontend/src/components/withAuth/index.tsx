import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const Wrapper: React.FC<any> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [token, setToken] = useState<string | null>(null);

        useEffect(() => {
            // 从 localStorage 中获取 token
            const userData = JSON.parse(localStorage.getItem("user") || "{}");

            //const storedToken = localStorage.getItem('token');
            if (userData) {
                setToken(userData.token);
                setLoading(false);
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
