import { Axis, BarSeries, Chart, Settings } from '@elastic/charts';
import React, { useEffect, useState } from 'react';
import getDateAndStateToDos from '../serverActions/getDateAndStateToDos';
import { EuiPanel, EuiFlexGroup, EuiFlexItem, euiPalettePositive } from '@elastic/eui';

export default function ToDoTableChart({ http }) {
    const [chartData, setchartData] = useState<any[]>([]);


    useEffect(() => {
        (async () => {
            const query = await getDateAndStateToDos(http);
            setchartData(query);
        })();
    }, []);

    if (chartData.length !== 0) {
        console.log("ChartData");
        console.log(chartData);


        const dataMap = new Map();
        var charState;
        chartData.aggregations.forEach((value: any) => {
            value.date.forEach((date: number) => {
                const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                charState = value.state;

                if (dataMap.has(formattedDate)) {
                    const count = dataMap.get(formattedDate);
                    dataMap.set(formattedDate, count + 1);
                } else {
                    dataMap.set(formattedDate, 1);
                }
            });
        });

        const stateColors: { [key: string]: string } = {
            toStart: 'red',
            inProgress: 'blue',
            completed: 'green',
        };

        const data = Array.from(dataMap.entries()).map(([x, y]) => ({
            x: x,
            y: y,
            state: charState,
            color: stateColors[charState],
        }));




        console.log(data);

        return (
            <EuiFlexGroup justifyContent="center">
                <EuiFlexItem style={{ width: '600px' }}>
                    <EuiPanel paddingSize="l">
                        <Chart size={{ height: 300 }}>
                            <Settings/>
                            <Axis id="bottom" position="bottom" />
                            <Axis id="left" position="left" />
                            <BarSeries id="bars" data={data} xAccessor="x" yAccessors={['y']} />
                        </Chart>
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
        );
    } else {
        return null;
    }
}
