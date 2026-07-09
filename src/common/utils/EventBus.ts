import {
    EventCallback,
    EventSubscription,
    HydraEvent
} from "../../types/events";

class EventBus {

    private listeners = new Map<string, Set<EventCallback>>();

    subscribe(
        type:string,
        callback:EventCallback
    ):EventSubscription{

        if(!this.listeners.has(type)){
            this.listeners.set(type,new Set());
        }

        this.listeners.get(type)!.add(callback);

        return{

            unsubscribe:()=>{

                this.unsubscribe(type,callback);

            }

        };

    }

    once(type:string,callback:EventCallback){

        const wrapper:EventCallback=(event)=>{

            callback(event);

            this.unsubscribe(type,wrapper);

        };

        this.subscribe(type,wrapper);

    }

    unsubscribe(type:string,callback:EventCallback){

        this.listeners.get(type)?.delete(callback);

    }

    emit<T>(type:string,payload?:T){

        const event:HydraEvent<T>={

            type,

            payload,

            timestamp:Date.now()

        };

        this.listeners
            .get(type)
            ?.forEach(cb=>cb(event));

    }

    removeAll(type?:string){

        if(type){

            this.listeners.delete(type);

            return;

        }

        this.listeners.clear();

    }

    listenerCount(type:string){

        return this.listeners.get(type)?.size ?? 0;

    }

}

export const eventBus=new EventBus();