import * as echarts from 'echarts/core';
import gdTree from "@/views/main/menu/menu-1/options/treeData.json";
import getData from "@/views/main/echarts/options/dynamicData.json";


// 返回体系树结构图的options
export function generateTreeStructureOptions(data: any) {
    const options = {
        title: {
            text: '指标体系树结构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: function (params) {
                return '<div style="text-align: left;"><b>名称：</b>' + params.name + '<br>' +
                    '<b>权重：</b>' + params.data.value + '<br>' ;
            },
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                type: 'tree',
                data: [data],
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                symbolSize: 10,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 15
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,
                initialTreeDepth: 9999 // 设置一个较大的值，确保所有节点都展开
            }
        ]
    }
    return options;
}


export function generateSunOptions(data){
    const options ={
        title: {
            text: '指标体系树结构',
            left: 'center'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: {
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            type: 'sunburst',
            emphasis: {
                focus: 'ancestor'
            },
            data: data,
            radius: [0, '90%'],
            label: {
                rotate: 'radial',
                formatter: '{b}\n【{c}】' // Display both name and value
            },

        }
    }

    return options;
}


//返回单科子树的options
export function generateResultTreeOptions(data,dataIdName) {
    const options = {
        title: {
            text: '当前用户数据' + dataIdName + '的指标体系计算图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return '<div style="text-align: left;"><b>名称：</b>' + params.name + '<br>' +
                    '<b>权重：</b>' + params.data.weight + '<br>' +
                    '<b>数值：</b>' + params.value + '</div>';
            },

        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                type: 'tree',
                data: [data],
                left: '7%',
                right: '25%',
                symbolSize: 10,
                label: {
                    position: 'bottom',
                    verticalAlign: 'middle',
                    offset: [0, 10], // 调整垂直方向上的偏移量
                    fontSize: 15,
                    formatter: function (params) {
                        return params.name + '\n' + '【' + params.value + '】'
                    },
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left',
                        offset: [0,0],
                        formatter: function (params) {
                            return params.name + '【' + params.value + '】'
                        },
                    }
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,
                initialTreeDepth: 9999 // 设置一个较大的值，确保所有节点都展开
            }
        ]
    }
    return options;

}


// 返回碎石图的options
export function generateScreePlotOptions(xdata,data,name) {
    const options = {
        title: {
            text: name,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        yAxis:{
            type: 'value',
        },
        xAxis:{
            type: 'category',
            data: xdata,
        },
        series: [
            {
                type: 'line',
                data: data,
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                symbolSize: 10,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 15
                }
            }
        ]
    }
    return options;

}


// 返回手肘的options
export function generateElbowOptions(xdata,data,name) {
    const options = {
        title: {
            text: name,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        yAxis:{
            type: 'value',
        },
        xAxis:{
            type: 'category',
            data: xdata,
        },
        series: [
            {
                type: 'line',
                data: data,
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                symbolSize: 10,
                label: {
                    // show:true,
                    position: 'outside',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 15
                },
                animationDuration: 10000,  // 设置动画时长为 10000 毫秒
                animationEasing: 'cubicInOut',  // 设置缓动函数为匀速加减速
            }
        ]
    }
    return options;
}


// 返回聚类汇总图的options
export function generateFanOptions(tuli,data,name) {
    const options = {
        title: {
            text: name,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: tuli
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                // restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                animationDuration: 10000,  // 设置动画时长为 2000 毫秒
                animationEasing: 'cubicInOut',  // 设置缓动函数为匀速加减速
                name: '面积模式',
                type: 'pie',
                radius: [20, 140],
                // center: ['75%', '50%'],
                roseType: 'area',
                label: {  // 添加label选项
                    show: true,
                    formatter: '{b}: {c}',  // 显示数据值
                    position: 'outside'  // 数据值显示在扇形外部
                },
                itemStyle: {
                    borderRadius: 5
                },
                data: data
            }
        ]
    }

    return options;
}



// 返回热力图的options
export function generateHotMapOptions(x,y,data,name) {
    const options = {
        animation:true,
        animationDuration:2000,
        animationEasing:'liner',
        title: {
            text: name,
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
            trigger: 'item',
            position: 'top',
            formatter: function (params){
                // 获取x轴、y轴和数值
                var x = params.name;
                var yy = y[params.value[1]];
                var value = params.value[2];

                // 构建tooltip的内容
                var content = '<b>X:</b> ' + x + '<br>';
                content += '<b>Y:</b> ' + yy + '<br>';
                content += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params.color + '"></span><b>' + value + '</b>';

                return content;
            }
        },
        xAxis: {
            type: 'category',
            data: x,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: y,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            precision: 3,
            orient: 'horizontal',
            left: 'center',
            top: '3%',
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
        },
        series: [
            {
                type: 'heatmap',
                data: data,
                label: {
                    show: true,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

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

    return options;
}

