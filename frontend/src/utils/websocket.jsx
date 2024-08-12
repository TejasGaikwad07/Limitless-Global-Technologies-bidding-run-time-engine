export const connectToWebSocket = () => {
  const token = localStorage.getItem("token");
  const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

  ws.onopen = () => {
    console.log("WebSocket connection opened");
  };

  ws.onmessage = (message) => {
    console.log("Received message:", message.data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = (event) => {
    console.log("WebSocket closed:", event.reason);
  };

  return ws;
};
