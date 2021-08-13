<template>
  <div>
    <div v-for="(note, index) in notes" :key="index" class="relative flex items-start justify-between my-6">
      <div class="flex items-start">
        <div :style="`background-color: ${note.profile.avatar_color}`" class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white rounded-full">{{ note.profile.initial }}</div>
        <div>
          <div class="flex items-center">
            <p class="mr-2 text-sm font-semibold text-gray-900">{{ note.profile.full_name }}</p>
            <span class="text-sm text-gray-400">{{ note.updated_at }}</span>
          </div>
          <p class="mt-2 text-sm text-gray-800">
            {{ note.note }}
          </p>
        </div>
      </div>
      <div>
        <button @click="displayActions(note.id)" class="hover:text-gray-900 flex justify-end w-full text-gray-800">
          <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
        <div v-show="clickedItemId == note.id" class="absolute right-0 z-20 w-24 mr-8 -mt-5">
          <div class="py-2 bg-white rounded-md shadow">
            <button @click="edit(note.id)" class="hover:bg-gray-200 block w-full px-4 py-2 text-sm text-left text-gray-800 appearance-none">Rediger</button>
            <button @click="deleteNote(note.id)" class="hover:bg-gray-200 block w-full px-4 py-2 text-sm text-left text-red-600 appearance-none">Slett</button>
          </div>
        </div>
      </div>
    </div>
    <!-- close actions menu, if a menu is open when clicking outside menu -->
    <div v-if="clickedItemId != null" @click="closeActions" class="absolute inset-0 z-10 bg-transparent"></div>
    <div v-if="currentUser && currentUser != undefined" class="flex items-center">
      <div :style="`background-color: ${currentUser.avatar_color}`" class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white rounded-full">{{ currentUser.initial }}</div>
      <BaseInput
        v-model="note"
        label="Add note"
        hiddenLabel
        block
        placeholder="Legg til et notat"
        class="mr-2"
      />
      <BaseButton v-if="!editing" @click="addNote" light>Legg til</BaseButton>
      <BaseButton v-else @click="editNote" light>Oppdater notat</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminNotes',
  props: {
    notes: {
      type: [Array],
      required: true
    },
  },
  setup(props, { emit }) {

    const store = useStore()

    let note: string = ''
    let clickedItemId: number | null = null
    let editItemId: number | null = null
    let editing: boolean = false

    const addNote = (): void => {
      emit('add-note', note)
      note = ''
    }

    const editNote = (): void => {
      if (editItemId !== null) {
        emit('edit-note', {
          id: editItemId,
          note: note
        })

        // reset variables
        editing = false
        note = ''
      }
    }

    const deleteNote = (id: number): void => {
      emit('delete-note', id)
    }

    interface NoteObj {
      id: number;
      note: string;
    }

    const edit = (id: number): void => {

      const foundNote = props.notes.find(note => (note as NoteObj).id === id)

      editItemId = (foundNote as NoteObj).id
      clickedItemId = null
      editing = true

      if (note != undefined) {
        note = (foundNote as NoteObj).note
      }
    }

    const displayActions = (id: number): void => {
      clickedItemId = id
    }

    const closeActions = (): void => {
      clickedItemId = null
    }

    const currentUser = computed(() => {
      return store.getters['auth/getCurrentUser']
    })

    return {
      note,
      clickedItemId,
      editItemId,
      editing,
      addNote,
      editNote,
      deleteNote,
      edit,
      displayActions,
      closeActions,
      currentUser
    }
  },
})
</script>
