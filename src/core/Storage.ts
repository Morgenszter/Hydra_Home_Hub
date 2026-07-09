import AsyncStorage from "@react-native-async-storage/async-storage";


class Storage {


  async save(
    key:string,
    value:any
  ){

    try {

      await AsyncStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;

    }

    catch(error){

      console.error(
        "HYDRA STORAGE ERROR",
        error
      );

      return false;

    }

  }



  async load(
    key:string
  ){

    try {

      const data =
        await AsyncStorage.getItem(key);


      if(!data)
        return null;


      return JSON.parse(data);

    }

    catch(error){

      console.error(
        "HYDRA LOAD ERROR",
        error
      );

      return null;

    }

  }



  async remove(
    key:string
  ){

    await AsyncStorage.removeItem(key);

  }



  async clear(){

    await AsyncStorage.clear();

  }


}


export default new Storage();