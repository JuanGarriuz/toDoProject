import { Chart, Partition, Settings } from '@elastic/charts';
import React, { useEffect, useState } from 'react';
import getAllToDos from '../serverActions/getAllToDos';
import { EuiPanel, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

export default function ToDoChart({ http }) {

    const [chartData, setchartData] = useState([]);
    useEffect(() => {
        (async () => {
            const query = await getAllToDos(http);
            setchartData(query);
        })();
    }, []);

    if (chartData.length != 0) {
        console.log("ChartData");
        console.log(chartData);
        let startValue = 0;
        let inProgressValue = 0;
        let completedValue = 0;
        chartData.aggregations.map((value) => {
            switch (value.key) {
                case ("toStart"):
                    startValue = value.doc_count;
                    break;
                case ("inProgress"):
                    inProgressValue = value.doc_count;
                    break;
                case ("completed"):
                    completedValue = value.doc_count;
                    break;
            }
        });
        const data = [
            { label: 'ToStart', value: startValue },
            { label: 'InProgress', value: inProgressValue },
            { label: 'Completed', value: completedValue },
        ];
        return (
            <EuiPanel>
                <EuiFlexGroup justifyContent="center">
                    <EuiFlexItem style={{ width: 400 }}>
                        <Chart size={{ height: 300 }}>
                            <Settings
                                showLegend={true}
                                legendPosition="right"
                            />
                            <Partition
                                id="pie"
                                data={data}
                                valueAccessor={(d) => d.value}
                                valueFormatter={(d) => `${d}`}
                                layers={[
                                    {
                                        groupByRollup: (d: { label: string, value: number }) => d.label,
                                    },
                                ]}
                            />
                        </Chart>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPanel>
        );
    } else {
        return null; // Otra opción: mostrar un mensaje de carga o error en lugar de null
    }

}
