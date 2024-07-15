// src/store/modules/messagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MessagesType, MessagesQueryType } from "@/type";
import {
  getMessagesList,
  messagesSent,
  messagesDetails,
  messagesUpdate,
} from "@/api";
import { RootState } from ".";

interface MessagesState {
  messages: MessagesType[];
  selectedMessage: MessagesType | null;
}

const initialState: MessagesState = {
  messages: [],
  selectedMessage: null,
};

// Async thunks
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (params?: MessagesQueryType) => {
    const response = await getMessagesList(params);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (message: MessagesType) => {
    const response = await messagesSent(message);
    return response.data;
  }
);

export const fetchMessageDetails = createAsyncThunk(
  "messages/fetchMessageDetails",
  async (id: string) => {
    const response = await messagesDetails(id);
    return response.data;
  }
);

export const updateMessage = createAsyncThunk(
  "messages/updateMessage",
  async (message: MessagesType) => {
    const response = await messagesUpdate(message);
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<MessagesType[]>) => {
          state.messages = action.payload;
        }
      )
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<MessagesType>) => {
          state.messages.push(action.payload);
        }
      )
      .addCase(
        fetchMessageDetails.fulfilled,
        (state, action: PayloadAction<MessagesType>) => {
          state.selectedMessage = action.payload;
        }
      )
      .addCase(
        updateMessage.fulfilled,
        (state, action: PayloadAction<MessagesType>) => {
          const index = state.messages.findIndex(
            (msg) => msg.id === action.payload.id
          );
          if (index !== -1) {
            state.messages[index] = action.payload;
          }
        }
      );
  },
});

export const selectedMessage = (state: RootState) => state.messages;
export default messagesSlice.reducer;
