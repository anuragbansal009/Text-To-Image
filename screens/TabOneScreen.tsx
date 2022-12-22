import * as React from 'react';
import { StyleSheet, Image, Dimensions, Keyboard } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button, TextInput, Snackbar, ActivityIndicator, Modal, Portal } from 'react-native-paper';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  // const baseUrl = 'http://192.168.94.134';
  const [baseUrl, setBaseUrl] = React.useState('');
  var count = 0

  const [finalUrl, setFinalUrl] = React.useState('');
  const [data, setData] = React.useState('')
  const [text, setText] = React.useState('');
  const windowWidth = Dimensions.get('window').width;
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [imageLoading, setImageLoading] = React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);
  const colorScheme = useColorScheme();
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = { backgroundColor: Colors[colorScheme].background, padding: 20 };

  const settingData = (json: any) => {
    console.log(json)
    if (json.length == 0) {
    }
    else {
      setFinalUrl('http://' + baseUrl + '.ngrok.io/api/' + json.filename + '.jpg')
      console.log(json)
      setData(json.filename)
      setImageLoading(true)
    }
  }

  const visualize = async (text: any) => {
    Keyboard.dismiss()
    // console.warn('http://' + baseUrl + ':8080/prediction')
    // setFinalUrl('http://' + baseUrl + ':8080/api/Wolf.jpg')
    if (text == '') {
      onToggleSnackBar()
    }
    else if (count == 0) {
      count++
      console.log(JSON.stringify({
        "text": text
      }))
      fetch('http://' + baseUrl + '.ngrok.io/prediction', {
        "method": "POST",
        "headers": {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
        mode: 'no-cors',
        "keepalive": true,
        body: JSON.stringify({
          "text": text
        })
      })
        .then((response) => response.json())
        .then((json) => settingData(json))
        .catch((error) => console.error(error))
        .finally(() => setImageLoading(true));
      setImageLoading(true);
      // setText('')
    }
  }

  function VisualisedImage() {
    // console.warn(finalUrl)
    if (finalUrl == '') {
      return (
        <></>
      )
    }
    else {
      return (
        <>
          <Image source={{ uri: finalUrl }} style={{ height: windowWidth - 50, width: windowWidth - 50, borderRadius: 10 }} resizeMode='contain' />
          {/* <Text>
            {text}
          </Text> */}
        </>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <TextInput
            mode="outlined"
            label="URL"
            value={baseUrl}
            onChangeText={text => setBaseUrl(text)}
            theme={{ colors: { primary: '#7C4DFF' } }}
          />
        </Modal>
      </Portal>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <TextInput
          style={{ width: 300, margin: 20 }}
          mode="outlined"
          label="Input Text"
          value={text}
          onChangeText={text => setText(text)}
          theme={{ colors: { primary: '#7C4DFF' } }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
          <Button icon="eye" mode="contained" onPress={() => visualize(text)} style={{ padding: 5, width: 150 }} buttonColor='#7C4DFF' textColor='white'>
            Visualize
          </Button>
          <Button style={{ marginLeft: 10, padding: 5 }} onPress={showModal} buttonColor='#7C4DFF' textColor='white' mode="contained">
            URL
          </Button>
        </View>
      </View>
      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        {
          imageLoading ? (<VisualisedImage />) : (<ActivityIndicator animating={true} color='#7C4DFF' />)
        }
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          textColor: '#7C4DFF',
          onPress: () => {
            // Do something
          },
        }}>
        Please Enter Some Text
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
