import React from 'react';
import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import ToDoChart from './ToDos/chart/toDoPieChart';
import { AllToDosList } from './ToDos/listToDos';
import { EuiTabbedContent, EuiTabbedContentTab } from '@elastic/eui';
import ToDoTableChart from './ToDos/chart/toDoTableChart';


interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const CustomPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
}: CustomPluginAppDeps) => {
  const onClickHandler = async () => {
    const data = await http.get('/api/custom_plugin/getToDos', { query: { toDoState: "toStart", offSet: 0, size: 5 } });
    // Use the core http service to make a response to the server API.
    console.log(data);
  };

  const tabs = [
    {
      id: 'tab1',
      name: 'Tab 1',
      content: <AllToDosList http={http}></AllToDosList>,
    },
    {
      id: 'tab2',
      name: 'Tab 2',
      content: <div><ToDoChart http={http}></ToDoChart><ToDoTableChart http={http}></ToDoTableChart></div>
      ,
    },
  ];

  return (
    <>
      <EuiTabbedContent tabs={tabs} initialSelectedTab={tabs[0]}>
        {(selectedTab) => (
          <>
            {tabs.map((tab) => (
              <EuiTabbedContentTab
                key={tab.id}
                onClick={() => selectedTab.onSelect(tab)}
                isSelected={tab.id === selectedTab.id}
                id={tab.id}
                data-test-subj={`tab-${tab.id}`}
                aria-controls={`tabpanel-${tab.id}`}
              >
                {tab.name}
              </EuiTabbedContentTab>
            ))}
            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`tabpanel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                hidden={tab.id !== selectedTab.id}
              >
                {tab.content}
              </div>
            ))}
          </>
        )}
      </EuiTabbedContent>

    </>
  )
};