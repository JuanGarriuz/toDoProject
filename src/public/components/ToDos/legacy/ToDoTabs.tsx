import React, { useState, useMemo } from 'react';
import {
    EuiTabs,
    EuiTab,
} from '@elastic/eui';




const tabs = [

    {
        id: 'inProgress',
        name: 'inProgress',
        href: '#/navigation/tabs#inProgress',
        content: (
            <></>
        )
    },

    {
        id: 'toStart',
        name: 'toStart',
        href: '#/navigation/tabs#toStart',
        content: (
            <></>
        )
    },
];

export default function ToDoTabs() {

    const [selectedTabId, setSelectedTabId] = useState('inProgress');
    const selectedTabContent = useMemo(() => {
        return tabs.find((obj) => obj.id === selectedTabId)?.content;
    }, [selectedTabId]);



    const renderTabs = () => {
        return tabs.map((tab, index) => (
            <EuiTab
                key={index}
                href={tab.href}
                onClick={() => onSelectedTabChanged(tab.id)}
                isSelected={tab.id === selectedTabId}
            >
                {tab.name}
            </EuiTab>
        ));
    };

    const onSelectedTabChanged = (id: string) => {
        setSelectedTabId(id);
    };


    return (
        <>
            <EuiTabs>{renderTabs()}</EuiTabs>
            {selectedTabContent}
        </>
    );
}
