import EventBus from "../../core/EventBus";

import Events from "../../core/Events";

class LotusEvents {

  connected() {

    EventBus.emit(

      Events.LOTUS.CONNECTED

    );

  }

  disconnected() {

    EventBus.emit(

      Events.LOTUS.DISCONNECTED

    );

  }

  battery(

    value:number

  ) {

    EventBus.emit(

      Events.LOTUS.BATTERY,

      value

    );

  }

  mode(

    mode:number

  ) {

    EventBus.emit(

      Events.LOTUS.MODE_CHANGED,

      mode

    );

  }

}

const lotusEvents =
  new LotusEvents();

export default lotusEvents;