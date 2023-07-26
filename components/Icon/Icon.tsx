import React from 'react'
import { Tomato } from './Icons/Tomato'
import { Stats } from './Icons/Stats'
import { EditTask } from './Icons/EditTask';
import { ActionsTask } from './Icons/ActionsTask'
import { IncrementTask } from './Icons/IncrementTask';
import { DecrementTask } from './Icons/DecrementTask';
import { DeleteTask } from './Icons/DeleteTask';
import { SettingTimer } from './Icons/SettingTimer';
import { Plus } from './Icons/Plus';
import { Minus } from './Icons/Minus';
import { Focus } from './Icons/Focus';
import { TimePause } from './Icons/TimePause';
import { Stops } from './Icons/Stops';
import { SelectArrow } from './Icons/SelectArrow';
import { TomatoStats } from './Icons/TomatoStats';

export enum EIcons {
    tomato = 'Tomato',
    stats = 'Stats',
    editTask = 'EditTask',
    actionsTask = 'ActionsTask',
    incrementTask = 'IncrementTask',
    decrementTask = 'DecrementTask',
    deleteTask = 'DeleteTask',
    settingTimer = 'SettingTimer',
    plus = 'Plus',
    minus = 'Minus',
    focus = 'Focus',
    timePause = 'TimePause',
    stops = 'Stops',
    selectArrow = 'SelectArrow',
    tomatoStats = 'TomatoStats'

}

interface IIconProps {
    name: EIcons,
    width?: string,
    height?: string,
    className?: string,
    style?: React.CSSProperties,
}



export function Icon(props: IIconProps) {
    const {width, height, name} = props;
   

    switch (name) {
        case EIcons.tomato:
        return(
            <Tomato {...props} width={width} height={height}/>
        );
        case EIcons.stats:
        return(
            <Stats {...props} width={width} height={height}/>
        );
        case EIcons.editTask:
            return(
                <EditTask {...props} width={width} height={height}/>
        );
        case EIcons.actionsTask:
            return(
                <ActionsTask {...props} width={width} height={height}/>
        );
        case EIcons.incrementTask:
            return(
                <IncrementTask {...props} width={width} height={height}/>
        );

        case EIcons.deleteTask:
            return(
                <DeleteTask {...props} width={width} height={height}/>
        );

        case EIcons.decrementTask:
            return(
                <DecrementTask {...props} width={width} height={height}/>
        );
        case EIcons.settingTimer:
            return(
                <SettingTimer {...props} width={width} height={height}/>
        );

        case EIcons.plus:
            return(
                <Plus {...props} width={width} height={height}/>
        );

        case EIcons.minus:
            return(
                <Minus {...props} width={width} height={height}/>
        );

        case EIcons.focus:
            return(
                <Focus {...props} width={width} height={height}/>
        );

        case EIcons.timePause:
            return(
                <TimePause {...props} width={width} height={height}/>
        );

        case EIcons.stops:
            return(
                <Stops {...props} width={width} height={height}/>
        );
        
        case EIcons.selectArrow:
            return(
                <SelectArrow {...props} width={width} height={height}/>
        );
        case EIcons.tomatoStats:
            return(
                <TomatoStats {...props} width={width} height={height}/>
        );
           

        default: 
            return <></>
    }
}
