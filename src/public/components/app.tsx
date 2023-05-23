import React from 'react';
import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';


import { AllToDosList } from './ToDos/listToDos';

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
    // Use the core http service to make a response to the server API.
    const data = await http.get('/api/custom_plugin/getToDos', { query: { toDoState: "toStart", offSet: 0, size: 5 } });
    console.log(data);
  };

  return (
    <>
      <AllToDosList http={http}></AllToDosList>  
    </>
  )
};