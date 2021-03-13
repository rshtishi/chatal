package com.github.rshtishi.backend.events;

import com.github.rshtishi.backend.enums.MessageType;
import com.github.rshtishi.backend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class ChatEventListener {

    @Autowired
    public SimpMessageSendingOperations sendingOperations;

    @EventListener
    public void handleWebSocketEventListener(final  SessionConnectedEvent event){
        System.out.println("Hello Connected User");
        System.out.println(event.getMessage());
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        System.out.println(sessionId);
        final String username = (String) headerAccessor.getMessageHeaders().get("username");
        System.out.println(username);
        //send the event to the broker
        // store session id = username
    }

    @EventListener
    public void handleWebSocketDisconnectListener(final SessionDisconnectEvent event){
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        final String username = (String) headerAccessor.getSessionAttributes().get("username");
        final Message message = Message.builder().type(MessageType.DISCONNECT).sender(username).build();
        sendingOperations.convertAndSend("/topic/public",message);
    }
}
