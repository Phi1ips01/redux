import { instance as Login, } from './login';
import { instance as getBus,postInstance as postBus, deleteInstance as deleteBus,updateInstance as updateBus } from './busAPI';
import {instance as getBusOperator,postInstance as postBusOperator, deleteInstance as deleteBusOperator,updateInstance as updateBusOperator,showOneInstance as showOneBusOperator} from './busOperatorAPI'
import {instance as getUser,postInstance as postUser,deleteInstance as deleteUser,updateInstance as updateUser} from './userAPI'
import {instance as getOperatorUpdate,postInstance as postOperatorUpdate} from './operatorUpdateAPI'
import {instance as getTrip,postInstance as postTrip,deleteInstance as deleteTrip,updateInstance as updateTrip} from './tripAPI' 


export const Instances = [
     Login,
     getBus,
     postBus,
     deleteBus,
     updateBus,
     getBusOperator,
     postBusOperator,
     deleteBusOperator,
     updateBusOperator,
     showOneBusOperator,
     getUser,
     postUser,
     deleteUser,
     updateUser,
     getOperatorUpdate,
     postOperatorUpdate,
     getTrip,postTrip,deleteTrip,updateTrip,
    ];

