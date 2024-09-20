"use client"
import { ReactNode, useEffect, useRef} from "react"

import { createRealTimeRaceStore, RaceRealTimeContext, RaceRealTimeStore } from "./store"

interface RaceProviderProp {
    children: ReactNode
};

export const RaceManagerContextProvider : React.FC<RaceProviderProp> = ({children}) => {
    const raceRealStore = useRef<RaceRealTimeStore>(createRealTimeRaceStore());

    useEffect(() => {
        const newStore = createRealTimeRaceStore();
        if(!raceRealStore.current){
            raceRealStore.current = newStore;
        }


        return () => {

        };
    },[]);
    return <RaceRealTimeContext.Provider value={raceRealStore.current}>
        {children}
    </RaceRealTimeContext.Provider>
}
