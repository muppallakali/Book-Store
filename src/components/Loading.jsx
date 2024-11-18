import React from 'react';

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-ping w-16 h-16 rounded-full bg-green-400"></div>
        </div>
    );
}
