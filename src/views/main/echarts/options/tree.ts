import * as echarts from 'echarts/core';
import gdTree from "@/views/main/menu/menu-1/options/treeData.json";


// 返回体系树结构图的options
export function generateTreeOptions(data: any) {
    const options = {
        title: {
            text: '中国老年人健康指标体系结构图'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        toolbox: {
            feature: {
                saveAsImage: {},
                dataView: {},
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
            }
        ]
    }
    return options;
}


//返回单科子树的options
export function generateResultTreeOptions(data,dataIdName) {
    const options = {
        title: {
            text: '当前用户数据' + dataIdName + '的指标体系计算图'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        toolbox: {
            feature: {
                saveAsImage: {},
                dataView: {},
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
            }
        ]
    }
    return options;

}
