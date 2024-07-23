import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {RootState} from "@/store";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const Wrapper: React.FC<any> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const token = useSelector((state: RootState) => state.user.token);


        useEffect(() => {
            if (!token) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        }, [token, router]);

        if (loading) {
            return <div>Loading...</div>; // 可以使用一个实际的加载组件
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
