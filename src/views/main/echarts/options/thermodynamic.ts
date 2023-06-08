import getData from './dynamicData.json'
const options = {
    animation:true,
    animationDuration:2000,
    animationEasing:'liner',
    title: {
        text: getData.titles,
        left: 'center'
    },
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            start: 0,
            end: 100
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            start: 0,
            end: 100
        }
    ],
    tooltip: {
        position: 'top'
    },
    xAxis: {
        type: 'category',
        data: getData.hours,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: getData.days,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: '3%'
    },
    series: [
        {
            name: 'Punch Card',
            type: 'heatmap',
            data: getData.rawData,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
    toolbox: {
        feature: {
            magicType: {},
            restore: {},
            saveAsImage: {},
            dataZoom: { show:true},
            dataView: {
                show: true,
                readOnly: true
            }
        }
    }
}
export default options
