<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3 mb-0">Add Book</h1>
      <router-link class="btn btn-outline-secondary" :to="{ name: 'Home' }">Back</router-link>
    </div>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <form @submit.prevent="addBook" novalidate>
          <div class="row g-3 align-items-end">
            <div class="col-md-3">
              <label for="isbn" class="form-label">ISBN</label>
              <input id="isbn" type="number" class="form-control"
                     v-model.trim="isbn" min="0" placeholder="e.g. 1234" />
              <div v-if="isbn && !/^\d+$/.test(isbn)" class="form-text text-danger">
                ISBN must be a number
              </div>
            </div>
            <div class="col-md-5">
              <label for="name" class="form-label">Name</label>
              <input id="name" type="text" class="form-control"
                     v-model.trim="name" placeholder="Book title" />
            </div>
            <div class="col-md-4 d-grid d-md-flex gap-2">
              <button class="btn btn-primary px-4" type="submit" :disabled="!isValid || saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
                Add Book
              </button>
              <button class="btn btn-outline-secondary" type="button" @click="clear">Clear</button>
            </div>
          </div>
        </form>

        <div v-if="message"
             :class="['alert','mt-3', message.type==='success' ? 'alert-success' : 'alert-danger']">
          {{ message.text }}
        </div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header fw-semibold">Books with ISBN &gt; 1000</div>
      <div class="card-body">
        <BookList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { db } from '../firebase/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const saving = ref(false)
const message = ref(null)

const isValid = computed(() => /^\d+$/.test(isbn.value) && name.value.trim().length > 0)

const clear = () => {
  isbn.value = ''
  name.value = ''
  message.value = null
}

const addBook = async () => {
  if (!isValid.value) return
  saving.value = true
  message.value = null
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value.trim(),
      createdAt: serverTimestamp(),
    })
    clear()
    message.value = { type: 'success', text: 'Book added successfully!' }
  } catch (err) {
    message.value = { type: 'danger', text: `Failed to add: ${err.message}` }
  } finally {
    saving.value = false
  }
}
</script>