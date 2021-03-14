import React,{Component} from 'react';
import {View,Text, TextInput, TouchableOpacity, Alert,StyleSheet,Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import {Icon, ListItem,Card,Header} from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase'
export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')["request_id"],  
             bookName:this.props.navigation.getParam('details')["book_name"], 
              reason_for_requesting:this.props.navigation.getParam('details')["reason_to_request"],
              recieverName:'',
              recieverContact:'',
              recieverAddress:'',
              recieverRequestDocId:'',
              userName:''
        }
    }
    getUserDetails=(userId)=>{
      db.collection("users").where("email_id","==",userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
          this.setState({
            userName:doc.data().first_name+""+doc.data().last_name
          })
        })
      })
    }
    addNotification=()=>{
      var message=this.state.userName+"has shown interest in donating the book"
      db.collection("all_notification").add({
        "targeted_user_Id":this.state.recieverId,
        "request_id":this.state.requestId,
        "donor_id":this.state.userId,
        "book_name":this.state.bookName,
        
        "notification_status":"unread",
        "message":message
        
      })
    }
    getRecieverDetails=()=>{
        db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverName:doc.data().firstName,
                   recieverContact:doc.data().contact,
                    recieverAddress:doc.data().address,
                
                })
            })
        }
        )
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverRequestDocId:doc.Id
                })
            })})
    } 
    updateBookStatus=()=>{
        db.collection('all_donations').add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.recieverName,
            donor_id:this.state.userId,
            request_status:"donor interested"
        })
    }
componentDidMount(){
    this.getRecieverDetails();
    this.getUserDetails(this.state.userId)
}
render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Book Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"receiver Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.receiverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.receiverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.receiverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.receiverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBookStatus();
                    this.addNotification()
                    this.props.navigation.navigate('MyDonations')
                  }}>
                <Text>I want to Donate</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})