import React from 'react';

function Panel({ title, num, para, bgColor = "bg-primary" }) {
    return (
        <div className={`${bgColor} rounded-lg p-4`}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-2xl">{num}</p>
            <p className="text-sm text-muted-foreground">{para}</p>
        </div>
    );
}

export default Panel;
