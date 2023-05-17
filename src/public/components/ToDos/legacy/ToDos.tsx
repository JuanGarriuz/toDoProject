import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui';
import React from 'react';

type Props = {
    todo_name: string;
    todo_description: string;
    todo_id:string;
    todo_status:string;
}


export default function ToDo(props: Props) {
    return (
        <EuiFlexGroup gutterSize="l">
            <EuiFlexItem>
                <EuiPanel>
                    <EuiText>
                        <div id={props.todo_id}>
                            <h1>{props.todo_name}</h1>
                            <p>{props.todo_status}</p>
                            <EuiSpacer />
                            <EuiText>
                                <p>
                                    {props.todo_description}
                                </p>
                            </EuiText>
                        </div>
                    </EuiText>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>

    );
}