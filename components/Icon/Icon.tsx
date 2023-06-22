import React from 'react'
import { Tomato } from './Icons/Tomato'
import { Stats } from './Icons/Stats'

export enum EIcons {
    tomato = 'Tomato',
    stats = 'Stats'

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
        

        default: 
            return <></>
    }
}
