package com.group4.auctionsite.springSocket.socket;



import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.group4.auctionsite.entities.Notification;
import org.springframework.stereotype.Component;

@Component
public class SocketModule {

    private SocketIOServer server;

    private SocketModule(){


        if (server != null)return;

        Configuration config = new Configuration();
        config.setHostname("0.0.0.0");
        config.setPort(9092);
        server=new SocketIOServer(config);

        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());


       // server.addEventListener("bidUpdate  ", Bid , onBidReceived());
        server.start();

    }
            //emit send to all including  sender. different form socket io standard
    public void emit(String event, Object data){
      //  System.out.printf( event, data);
        server.getBroadcastOperations().sendEvent(event,data);
    }

    public void emit2(String event, Notification notification, String title , long correctUserId){
        //  System.out.printf( event, data);
        server.getBroadcastOperations().sendEvent(event,notification, title, correctUserId);
    }


    public void emit3(String event, Notification notification, String title, long correctUserId) {
        server.getBroadcastOperations().sendEvent(event,notification, title,correctUserId);
    }

 //  private DataListener<Bid> onBidReceived() {
 //      return (client, data, ackSender) -> {
 //          System.out.printf("Client[%s] - Received bid Update '%s'\n", client.getSessionId().toString(), data);
 //          emit("bidUpdate", data);
 //      };
 //  }


    private ConnectListener onConnected(){
        return  client-> System.out.printf("Client[%s] - connected.\n",client.getSessionId().toString());
    }
    private DisconnectListener onDisconnected(){
        return  client-> System.out.printf("Client[%s] - disconnected.\n",client.getSessionId().toString());
    }


}
