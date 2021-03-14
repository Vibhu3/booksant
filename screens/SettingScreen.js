import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert,  ScrollView, KeyboardAvoidingView, Modal} from 'react-native';
import MyHeader from '../components/MyHeader'; 
import db from '../config'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize';
export default class SettingScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            docId:''
        }
    }
    getUserDetails=()=>{
var email=firebase.auth().currentUser.email;
db.collection('users').where('email_id','==',email).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        var data=doc.data()
        this.setState({
            emailId:data.email_id,
            firstName:data.first_Name,
            firstName:data.last_Name,
            address:data.address,
            contact:data.contact,
            docId:doc.id
        })
    })
})
    }
    componentDidMount(){
        this.getUserDetails()
    }
    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            address:this.state.address,
            contact:this.state.contact,
        })
        Alert.alert("profile updated successfully")
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="settings"
                navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>
                        first name
                    </Text>
                    <TextInput style={styles.formTextInput}
                    placeholder={'firstName'}
                    maxLength={8}
                    onChangeText={(text)=>{
                        this.setState({
                            firstName:text
                        })
                    }}
                    value={this.state.firstName}/>
                                        <Text style={styles.label}>
                        last name

                    </Text>
                      <TextInput style={styles.formTextInput}

                    placeholder={'lastName'}
                    onChangeText={(text)=>{
                        this.setState({
                            lastName:text
                        })
                    }}
                    value={this.state.lastName}/>
                                        <Text style={styles.label}>
contact
                    </Text>
                      <TextInput style={styles.formTextInput}
                    placeholder={'contact'}
                    maxLength={10}
                    keyboardType={'numeric'}
                    onChangeText={(text)=>{
                        this.setState({
                           contact:text
                        })
                    }}
                    value={this.state.contact}/>
                                        <Text style={styles.label}>
address
                    </Text>
                      <TextInput style={styles.formTextInput}
                    placeholder={'address'}
                 multiline={true}
                    onChangeText={(text)=>{
                        this.setState({
                            address:text
                        })
                    }}
                    value={this.state.address}/>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{this.updateUserDetails()}}>
                        <Text style={styles.buttonText}>
                            save
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
} const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"#6fc0b8"
    },
    formContainer:{
      flex: 0.88,
      justifyContent:'center'
    },
    label:{
      fontSize:RFValue(18),
      color:"#717D7E",
      fontWeight:'bold',
      padding:RFValue(10),
      marginLeft:RFValue(20)
    },
    formTextInput: {
      width: "90%",
      height: RFValue(50),
      padding: RFValue(10),
      borderWidth:1,
      borderRadius:2,
      borderColor:"grey",
      marginBottom:RFValue(20),
      marginLeft:RFValue(20)
    },
    button: {
      width: "75%",
      height: RFValue(60),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(50),
      backgroundColor: "#32867d",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: RFValue(20),
    },
    buttonView:{
      flex: 0.22,
      alignItems: "center",
      marginTop:RFValue(100)
  },
    buttonText: {
      fontSize: RFValue(23),
      fontWeight: "bold",
      color: "#fff",
    },
  });
  