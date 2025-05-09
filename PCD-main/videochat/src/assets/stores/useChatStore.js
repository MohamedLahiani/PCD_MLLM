import { create } from 'zustand';

const useChatStore = create((set) => ({
  conversations: [],
  currentConversation: null,

  createNewConversation: () => {
    const newConversation = {
      id: Date.now().toString(),
      messages: [],
    };

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      currentConversation: newConversation,
    }));
  },

  selectConversation: (id) => {
    set((state) => ({
      currentConversation: state.conversations.find(c => c.id === id) || null,
    }));
  },

  addMessage: (conversationId, message) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      ),
      currentConversation: state.currentConversation?.id === conversationId
        ? { ...state.currentConversation, messages: [...state.currentConversation.messages, message] }
        : state.currentConversation
    }));
  },

  deleteConversation: (id) => {
    set((state) => {
      // Filter out the conversation to delete
      const updatedConversations = state.conversations.filter(conv => conv.id !== id);
      
      // If the deleted conversation was the current one, clear currentConversation
      const newCurrent = state.currentConversation?.id === id ? null : state.currentConversation;
      
      return {
        conversations: updatedConversations,
        currentConversation: newCurrent
      };
    });
  },

}));

export default useChatStore;
