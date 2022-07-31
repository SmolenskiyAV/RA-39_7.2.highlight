/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const mjs= moment; // библиотека MomentJS

export default function DateTime(props) { //компонет-"вкладыш" (отображает дату, принятую в качестве параметра)

    const { date } = props;
    
    return (
        <p className="date">{date}</p>
    )
};

export function DateTimePretty(props) { // компонент-"обёртка" (преобразует дату во время, прошедшее от этой даты)

    const { wrappedComponent, date, id } = props;

    let intervalTemporalValue = {}; // каждому экземпляру компонента - свой уникальный интервал обновления!

    const [modifiedDate, setModifiedDate] = useState(mjs(date).fromNow());

    useEffect(() => {
        intervalTemporalValue[id] = window.setInterval(     //запускаем ежеминутный интервал
            function(){
                
                const deltaDate = mjs(date).fromNow();
                setModifiedDate(() => deltaDate)
            }, 
        60 * 1000);

        return () => {
            window.clearInterval(intervalTemporalValue[id]); // останавливаем автообновление если компонент удалён
        }
        
    }, []); // срабатывает однократно при первоначальном рендеринге компонента!
    
        const WrappedComponent = wrappedComponent;

    return <WrappedComponent date={modifiedDate} />
};