import React, {Component} from 'react'
import io from 'socket.io-client/dist/socket.io'
import {View, Text} from 'react-native'

const SOCKET_URL = '';

class SocketWrapper extends Component {

  state = {
    connected: false,
    data: null
  };

  componentDidMount() {
    let socket = io.connect(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      agent: "-",
      path: "/",
      pfx: "-",
      cert: "-",
      ca: "-",
      ciphers: "-",
      rejectUnauthorized: "-",
      perMessageDeflate: "-"
    });

    if(socket){
      socket.on('connect', data => {
        this.setState({
          connected: true,
          data: data
        });
      });
    }
  }

  render() {
    return (
      <View {...this.props}>
        {this.props.children}
      </View>
    )
  }
}

export default SocketWrapper
