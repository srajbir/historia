'use client';
import React, { useState, useEffect } from 'react';
export default function Progressbar() {
    const [scroll, setScroll] = useState(0);
    const handleScroll = () => {
        const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        setScroll(progress);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="w-full h-[2px] fixed top-0 left-0 z-50 bg-transparent">
            <div className="h-full bg-blue-500 transition-all ease-out" style={{ width: `${scroll}%` }}/>
        </div>
    );
}