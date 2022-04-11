import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: number;
  sender: string;
  topic: string;
  text: string;
  date: string;
  destination: string;
  createdAt: string;
}

interface MessageState {
  incomed: Message[];
  sended: Message[];
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
      action: PayloadAction<{ incomed: Message[]; sended: Message[] }>
    ) {
      state.incomed = action.payload.incomed;
      state.sended = action.payload.sended;
    },
    addMessage(
      state,
      action: PayloadAction<{ message: Message; type: "incomed" | "sended" }>
    ) {
      const message = action.payload.message;
      switch (action.payload.type) {
        case "incomed": {
          state.incomed = [...state.incomed, message];
          break;
        }
        case "sended": {
          state.sended = [...state.sended, message];
          break;
        }
      }
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
