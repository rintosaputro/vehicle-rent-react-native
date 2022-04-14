import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
// import {Image} from 'native-base';
import React, {useEffect, useState} from 'react';
import VehicleList from '../components/VehicleList';
import {useSelector, useDispatch} from 'react-redux';
import Button from '../components/Button';
import {myOrder} from '../redux/actions/transaction';
import {getCategory} from '../redux/actions/vehicles';

const DetailCategory = ({navigation}) => {
  const [errImg, setErrImg] = useState(false);
  const {detailCategory} = useSelector(state => state);
  const dataState = useSelector(state => state);

  const type = detailCategory.nameCategory;

  const typeState = useSelector(state => state[`${type}`]);

  const dispatch = useDispatch();

  const handleOrder = id => {
    dispatch(myOrder(id));
    navigation.navigate('Order');
  };

  const nextPage = () => {
    dispatch(
      getCategory(
        type.toUpperCase(),
        dataState[`${type}`].pageInfo.currentPage + 1,
      ),
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {dataState[`${type}`].results.map((data, index) => {
        return (
          <>
            <TouchableOpacity
              key={index}
              onPress={() => handleOrder(data.idVehicle)}>
              <VehicleList
                name={data.brand}
                seet={data.capacity}
                stock={data.qty}
                price={data.price}
                Image={() => (
                  <Image
                    alt={data.brand}
                    source={
                      data.image
                        ? !errImg
                          ? {uri: data.image}
                          : require('../assets/img/defaultItem.jpg')
                        : require('../assets/img/no-image.jpg')
                    }
                    onError={setErrImg}
                    style={styles.img}
                  />
                )}
              />
            </TouchableOpacity>
          </>
        );
      })}
      {dataState[`${type}`].pageInfo && dataState[`${type}`].pageInfo.next ? (
        <Button color="primary" onPress={nextPage}>
          Next
        </Button>
      ) : (
        <></>
      )}
      <View style={styles.bottom} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  listVehicles: {
    flexDirection: 'row',
    marginVertical: 18,
  },
  left: {
    position: 'relative',
    width: '40%',
  },
  img: {
    width: 150,
    height: 120,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  rate: {
    flexDirection: 'row',
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 20,
    position: 'absolute',
    right: -18,
    top: -10,
  },
  iconRate: {
    marginLeft: 8,
  },
  right: {
    marginLeft: 35,
    justifyContent: 'space-between',
  },
  bottom: {
    paddingBottom: 40,
  },
});

export default DetailCategory;
