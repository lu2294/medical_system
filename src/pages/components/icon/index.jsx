import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '/iconfont.js',
});


function Icon(props) {
    const { type, classname } = props;
    return <IconFont type={type} className={classname} />
}

export default Icon;