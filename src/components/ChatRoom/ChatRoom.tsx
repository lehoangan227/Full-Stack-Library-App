import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Định nghĩa kiểu dữ liệu tin nhắn
interface ChatMessage {
  sender: string;
  content: string;
  type: "CHAT" | "JOIN" | "LEAVE";
}

const ChatRoom = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(
    "User_" + Math.floor(Math.random() * 1000)
  ); // Giả lập tên user
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Khởi tạo kết nối
    const socket = new SockJS("http://localhost:8080/api/v1/library/ws"); // URL Backend
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Đã kết nối!");
        setIsConnected(true);

        // 2. Đăng ký nhận tin nhắn từ topic "/topic/public"
        client.subscribe("/topic/public", (message) => {
          const receivedMsg: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMsg]);
        });

        // 3. Gửi thông báo user đã tham gia
        client.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({ sender: username, type: "JOIN" }),
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
    });

    client.activate(); // Kích hoạt kết nối
    setStompClient(client);

    // Cleanup khi component unmount
    return () => {
      if (client) client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && input.trim()) {
      const chatMessage = {
        sender: username,
        content: input,
        type: "CHAT",
      };

      // 4. Gửi tin nhắn lên Server
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
      setInput("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Phòng Chat Thư Viện</h2>
      <div style={{ color: isConnected ? "green" : "red" }}>
        Trạng thái: {isConnected ? "Online" : "Offline"}
      </div>

      {/* Khung hiển thị tin nhắn */}
      <div
        style={{
          border: "1px solid #ccc",
          height: 300,
          overflowY: "scroll",
          marginBottom: 10,
          padding: 10,
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Khung nhập liệu */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tin nhắn..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  );
};

export default ChatRoom;
