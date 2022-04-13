import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageType {
  id: number;
  sender: number;
  topic: string;
  text: string;
  date: string;
  destination: number;
  createdAt: string;
  destinationName: string;
  senderName: string;
}

interface MessageState {
  incomed: MessageType[];
  sended: MessageType[];
}

const initialState = {
  incomed: [],
  sended: [],
} as MessageState;

const messageSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setMessages(
      state,
      action: PayloadAction<{ incomed: MessageType[]; sended: MessageType[] }>
    ) {
      state.incomed = action.payload.incomed;
      state.sended = action.payload.sended;
    },
    addMessage(
      state,
      action: PayloadAction<{
        message: MessageType;
        type: "incomed" | "sended";
      }>
    ) {
      const message = action.payload.message;
      switch (action.payload.type) {
        case "incomed": {
          state.incomed.unshift(message);
          break;
        }
        case "sended": {
          state.sended.unshift(message);
          break;
        }
      }
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
