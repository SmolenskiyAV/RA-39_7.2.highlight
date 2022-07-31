/* eslint-disable array-callback-return */
/* eslint-disable default-case */

import Video from '../Video/Video';
import Article from '../Article/Article';
import { New } from '../New/New';
import Popular from '../Popular/Popular';

export default function List(props) {   // компонент отрисовки всего списка элементов
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <Attraction wrappedComponent={Video} {...item} />
                );

            case 'article':
                return (
                    <Attraction wrappedComponent={Article} {...item} />
                );
        }
    });
};

function Attraction(props) { // компонент-"обёртка" (преобразует внешний вид "вкладышей" Video и Article)

    const { wrappedComponent, views } = props;
    const WrappedComponent = wrappedComponent;

    if ((views > 100) && (views <= 1000)) {
        return <New>
            <WrappedComponent {...props} />    
        </New>
    };

    if (views > 1000) {
        return <Popular>
            <WrappedComponent {...props} />  
        </Popular>
    }

    return <WrappedComponent {...props} />
};