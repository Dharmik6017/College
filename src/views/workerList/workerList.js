import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  View,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
import Worker from '../../common/Worker';
import Modal from '../../common/Modal';
import ModalView from '../../common/Modal';
import Moment from 'moment';
// import ModalView from '../../common/Modal';
// import ModalView from '../../common/Modal';
const styles = StyleSheet.create({
  modalContainer: {flexDirection: 'row'},
  image: {width: 70, height: 70, borderRadius: 35},
  nameContainer: {justifyContent: 'center', paddingLeft: 10},
  name: {fontSize: 24},
  position: {fontSize: 16},
  timePicker: {justifyContent: 'center', alignItems: 'center'},
});

const Data = [
  {
    id: 'id-1',
    title: 'First Item',
    employeeType: 'Temporary Employee',
    position: 'HK Agent',
    image:
      'https://www.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-landscape-407021107',
  },
  {
    id: 'id-2',
    employeeType: 'Temporary Employee',
    position: 'HK Agent',
    title: 'Second Item',
    image:
      'https://www.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-foliage-721703848',
  },
  {
    id: 'id-3',
    employeeType: 'Temporary Employee',
    position: 'HK Agent',
    title: 'Third Item',
    image:
      'https://www.shutterstock.com/image-photo/macro-leaves-background-texture-blue-turquoise-728448754',
  },
  {
    id: 'id-4',
    employeeType: 'Temporary Employee',
    position: 'HK Agent',
    title: 'Fourth Item',
    image:
      'https://www.bigstockphoto.com/image-321033145/stock-vector-blue-abstract-hexagon-net-technology-background%2Cfuturistic-hexagon-tech-background%2Ccyberspace-techno',
  },
  {
    id: 'id-5',
    employeeType: 'Temporary Employee',
    position: 'HK Agent',
    title: 'Fourth Item',
    image:
      'https://www.bigstockphoto.com/image-321033145/stock-vector-blue-abstract-hexagon-net-technology-background%2Cfuturistic-hexagon-tech-background%2Ccyberspace-techno',
  },
  {
    id: 'id-6',
    employeeType: 'Temporary Employee',
    position: 'HK Agent',
    title: 'Fourth Item',
    image:
      'https://www.bigstockphoto.com/image-321033145/stock-vector-blue-abstract-hexagon-net-technology-background%2Cfuturistic-hexagon-tech-background%2Ccyberspace-techno',
  },
  {
    id: 'id-7',
    employeeType: 'Temporary Employee',
    position: 'HK Agent',
    title: 'Fourth Item',
    image:
      'https://www.bigstockphoto.com/image-321033145/stock-vector-blue-abstract-hexagon-net-technology-background%2Cfuturistic-hexagon-tech-background%2Ccyberspace-techno',
  },
];

const renderWorker = () => {
  Data.map((u, i) => {
    return <Worker data={u} />;
  });
};

const ModelView1 = () => {
  return <Modal />;
};

const WorkerList = props => {
  const [detail, setDetail] = useState({});
  const [dialog, setDialog] = useState(false);
  console.log(dialog, 'Dialog in worker list');
  console.log(detail, 'Details');

  useEffect(() => {
    console.log(dialog, 'dialog changed');
  }, [dialog]);
  const showDialog = item => {
    console.log('showingit', item);
    setDialog(true);
    setDetail(item);
  };
  console.log(dialog, 'dialog');
  return (
    <ScrollView>
      {/* <Text>WorkerList</Text> */}
      <FlatList
        data={Data}
        renderItem={({item}, index) => {
          // console.log(item, 'Hello');

          return (
            <Worker
              eleKey={item.id}
              data={item}
              onPress={showDialog}
              dialog={dialog}
            />
          );
        }}
        numColumns={2}
      />
      <Modal dialog={dialog} setDialog={setDialog}>
        <View>
          <View style={styles.modalContainer}>
            <Image
              source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
              style={styles.image}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{detail.title}</Text>
              <Text style={styles.position}>{detail.position}</Text>
              <Text>{detail.employeeType}</Text>
            </View>
          </View>
          <View style={styles.timePicker}>
            <Text>Intime</Text>
          </View>
        </View>
        {/* <Text>There</Text> */}
      </Modal>
    </ScrollView>
  );
};
export default WorkerList;
